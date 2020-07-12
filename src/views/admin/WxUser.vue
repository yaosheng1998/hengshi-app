<template>
  <div id="wx-user">
    <div class="wx-user">
      <h1><i class="iconfont">&#xe757;</i>所有微信用户</h1>
      <my-table
        :Info="info"
        :detail-info="detailInfo"
        :table-data="userTable.userData"
        :pages="userTable.pages"
        :page-change-handle="pageChange"
        option-type="admin"
      ></my-table>
    </div>
    <div class="search-wx-user">
      <h1><i class="iconfont">&#xe757;</i>查询微信用户</h1>
      <div class="search">
        <el-input
          class="userid-input"
          placeholder="请输入内容"
          v-model="searchTable.input"
          clearable>
        </el-input>
        <el-button
          type="primary"
          @click="getWxUserByUserid"
          class="search-btn">
          搜索
        </el-button>
      </div>
      <my-table
        :Info="info"
        :detail-info="detailInfo"
        :table-data="searchTable.userData"
        :pages="searchTable.pages"
        :page-change-handle="pageChange"
        option-type="admin"
      ></my-table>
    </div>
  </div>
</template>

<script>
  import MyTable from '../../components/admin/MyTable'

  export default {
    components: {
      MyTable
    },
    mounted() {
      this.$store.commit('setMenuIndex', '2')
      this.getWxUser(1)
    },
    data() {
      return {
        number: 10,
        info: [
          {
            label: '微信名',
            prop: 'nickname',
            width: ''
          }, {
            label: '用户名',
            prop: 'userid',
            width: ''
          }, {
            label: '性别',
            prop: 'sex',
            width: '110'
          }, {
            label: '订阅上课通知',
            prop: 'is_subnotice',
            width: '110'
          }, {
            label: '通知状态',
            prop: 'notification_status',
            width: '110'
          }, {
            label: 'openid',
            prop: 'openid',
            width: '280'
          }
        ],
        detailInfo: [
          {
            label: 'id',
            prop: 'id',
            width: ''
          }, {
            label: '微信名',
            prop: 'nickname',
            width: ''
          }, {
            label: '性别',
            prop: 'sex',
            width: ''
          }, {
            label: '国家',
            prop: 'country',
            width: ''
          }, {
            label: '省',
            prop: 'province',
            width: ''
          }, {
            label: '城市',
            prop: 'city',
            width: ''
          }, {
            label: '用户名',
            prop: 'userid',
            width: ''
          }, {
            label: 'openid',
            prop: 'openid',
            width: ''
          }, {
            label: '密码',
            prop: 'password',
            width: ''
          }, {
            label: '订阅上课通知',
            prop: 'is_subnotice',
            width: ''
          }, {
            label: '订阅时间',
            prop: 'server_expire',
            width: ''
          }, {
            label: '通知开启状态',
            prop: 'notification_status',
            width: ''
          }
        ],
        userTable: {
          pages: 1,
          userData: [],
        },
        searchTable: {
          pages: 1,
          userData: [],
          input: ''
        }
      }
    },
    methods: {
      /**
       * 获取所有微信用户
       * @param pages 页码
       */
      getWxUser(pages) {
        this.$axios.get('/admin/query_wxuser', {
          params: {
            pages,
            num: this.number
          }
        }).then(res => {
          console.log(res)
          // res.data.map(item => {
          //
          // })
          this.userTable.userData = this.decUserData(res.data)
          this.userTable.pages = res.total_number * this.number
        })
      },
      getWxUserByUserid() {
        this.$axios.get('/admin/query_wxuser_by_userid', {
          params: {
            userid: this.searchTable.input
          }
        }).then(res => {
          if(res.code === -1){
            this.searchTable.userData = []
            this.$message.error(res.msg)
          } else {
            this.searchTable.userData = this.decUserData([res])
          }
          console.log(res)
        })
      },
      /**
       * 所有微信用户表翻页
       * @param page
       */
      pageChange(page) {
        this.getWxUser(page)
      },
      decUserData(data) {
        if(data instanceof Array){
          data.map(item => {
            item.sex = item.sex === 1 ? '男' : '女'
            if (item.is_subnotice === true) {
              item.notification_status = item.notification_status === true ? '开启' : '关闭'
            }
            item.is_subnotice = item.is_subnotice === true ? '订阅' : '未订阅'
          })
        }
        return data
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/style/PC/admin/wxUser";
</style>
