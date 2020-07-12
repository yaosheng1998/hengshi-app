<template>
  <div id="curriculum">
    <div class="search-curr">
      <h1><i class="iconfont">&#xe757;</i>查询学生课表</h1>
      <div class="search">
        <el-input
          class="userid-input"
          placeholder="请输入内容"
          v-model="searchTable.input"
          clearable>
        </el-input>
        <el-button
          type="primary"
          @click="getCurriculumByUserid"
          class="search-btn">
          搜索
        </el-button>
      </div>
      <my-table
        :Info="info"
        :detail-info="detailInfo"
        :table-data="searchTable.currData"
        :page-change-handle="pageChange"
        :pages="searchTable.pages"
      ></my-table>
    </div>
    <div class="curr-config">
      <h1>课表设置</h1>
      <div class="curr-update">
        <span>更新所有人课表信息</span>
        <el-button type="primary"
                   class="update-btn"
                   :disabled="updateCurrProgress !== 100"
                   @click="updateAllCurriculum"
        >更新</el-button>
        <el-progress :text-inside="true"
                     :stroke-width="22"
                     :percentage="updateCurrProgress"
                     class="update-progress"
                     status="success">
        </el-progress>
      </div>
    </div>
  </div>
</template>

<script>
  import MyTable from '../../components/admin/MyTable'
  import { mapState } from 'vuex'
  export default {
    mounted() {
      this.$store.commit('setMenuIndex', '3')
      // this.updateAllCurriculum()
    },
    components: {
      MyTable
    },
    data() {
      return {
        timer: 0,
        number: 10,
        info: [
          {
            label: '学年',
            prop: 'school_year',
            width: ''
          }, {
            label: '课程名',
            prop: 'class_name',
            width: '250'
          }, {
            label: '老师',
            prop: 'teacher',
            width: ''
          }, {
            label: '地址',
            prop: 'location',
            width: ''
          }, {
            label: '第几周',
            prop: 'week',
            width: ''
          }, {
            label: '上课时间段',
            prop: 'class_time',
            width: ''
          }, {
            label: '周期',
            prop: 'cycle',
            width: ''
          }
        ],
        detailInfo: [
          {
            label: '学号',
            prop: 'userid'
          },
          {
            label: '学年',
            prop: 'school_year'
          }, {
            label: '第几周',
            prop: 'week'
          }, {
            label: '上课时间段',
            prop: 'class_time'
          }, {
            label: '课程名',
            prop: 'class_name'
          }, {
            label: '老师',
            prop: 'teacher'
          }, {
            label: '地址',
            prop: 'location'
          }, {
            label: '开始时间',
            prop: 'begin_time'
          }, {
            label: '结束时间',
            prop: 'end_time'
          }, {
            label: '周期',
            prop: 'cycle'
          }
        ],
        searchTable: {
          pages: 0,
          currData: [],
          currAllData: [],
          input: ''
        }
      }
    },
    computed: {
      ...mapState(['updateCurrProgress'])
    },
    methods: {
      /**
       * 通过userid查询课表
       */
      getCurriculumByUserid() {
        if ( !this.searchTable.input) return
        this.$axios.get('/admin/query_curriculum_by_userid', {
          params: {
            userid: this.searchTable.input
          }
        }).then(res => {
          if (res.length === 0) {
            this.$message.error('该用户不存在')
          } else {
            this.searchTable.pages = res.length
            res.map((item) => {
              let str = item.class_time
              item.class_time = `周${str.charAt(0)} (${str.charAt(2)}、${str.charAt(4)} 节课)`
            })
            this.searchTable.currAllData = res
            this.searchTable.currData = res.slice(0, this.number)
          }
          // console.log(this.searchTable.currData)
        })
      },
      updateAllCurriculum() {
        this.$axios.get('/admin/update_class').then(res => {
          // console.log(res)
          this.getUpdateSchedule()
        })
      },
      getUpdateSchedule() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$axios.get('/admin/get_schedule').then(res => {
            console.log(res)
            if(res.code === 1){
              this.$store.commit('setUpdateCurrProgress', res.schedule)
              this.getUpdateSchedule()
            } else if(res.code === -1 && this.updateCurrProgress === 80) {
              this.$store.commit('setUpdateCurrProgress', 100)
              this.$message.success('课表更新完成')
            } else {
              this.$message.error(res.msg)
            }
          })
        }, 1000)
      },
      /**
       * 查询课表翻页
       * @param page
       */
      pageChange(page) {
        let startIndex = (page - 1) * 10
        let endIndex = Math.min(startIndex + this.number, this.searchTable.pages)
        this.searchTable.currData =
          this.searchTable.currAllData.slice(startIndex, endIndex)
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/style/PC/admin/curriculum";
</style>
