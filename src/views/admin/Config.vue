<template>
  <div id="config">
    <div class="fwh-config-wrapper">
      <h1>公众号设置项</h1>
      <div class="submsg-config">
        <span>当前订阅上课通知金额为:</span>
        <el-input
          placeholder="请输入内容"
          class="submsg-input"
          v-model="fwh.totalFee"
          clearable>
        </el-input>
      </div>
      <el-button type="primary"
                 class="fwh-save-btn"
                 @click="fwhSaveHandle"
      >保存</el-button>
    </div>
    <div class="other-config-wrapper">
      <h1>其他设置</h1>
      <div class="time-config">
        <div>
          <p>当前学年：</p>
          {{ other.xn }}
        </div>
        <div>
          <p>当前周数：</p>
          {{ other.week }}
        </div>
        <div>
          <p>当前开学时间：</p>
          <div class="block">
            <el-date-picker
              v-model="other.beginTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
      </div>
      <el-button type="primary"
                 class="other-save-btn"
                 @click="otherSaveHandle"
      >保存</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.init()
    },
    data() {
      return {
        fwh: {
          totalFee: '',
          customizeMenu: ''
        },
        other: {
          week: '',
          xn: '',
          beginTime: ''
        }
      }
    },
    methods: {
      init() {
        this.$store.commit('setMenuIndex', '5')
        this.getTotalFee()
        this.getCustomizeMenu()
        this.getTime()
        this.getBeginTime()
      },
      /**
       * 获取订阅费用
       */
      getTotalFee() {
        this.$axios.get('/admin/get_total_fee').then(res => {
          // console.log(res)
          if (res.code === 1) {
            this.fwh.totalFee = res.total_fee / 100
          }
        })
      },
      /**
       * 获取公众号菜单
       */
      getCustomizeMenu() {
        this.$axios.post('/admin/set_customize_menu').then(res => {
          // console.log('menu', res)
        })
      },
      /**
       * 获取当前学年和周数
       */
      getTime() {
        this.$axios.get('/admin/get_time').then(res => {
          // console.log(res)
          this.other.week = res.week
          this.other.xn = res.xn
        })
      },
      /**
       * 获取开学时间
       */
      getBeginTime() {
        this.$axios.get('/admin/get_begin_time').then(res => {
          // console.log('开学时间', res)
          this.other.beginTime = new Date(res.year, res.month-1, res.day)
        })
      },
      /**
       * 设置开学时间
       */
      setTime(date) {
        if(!date) return false
        this.$axios.get('/admin/set_time', {
          params: {
            year: date.getFullYear(),
            month: date.getMonth()+1,
            day: date.getDate()
          }
        }).then(res => {
          if(res.code === 1){
            return true
          }
        })
      },
      /**
       * 公众号设置保存
       */
      fwhSaveHandle() {
        this.$axios.get('/admin/set_total_fee', {
          params: {
            total_fee: this.fwh.totalFee * 100
          }
        }).then(res => {
          console.log(res)
          this.$message.success('保存成功')
        })
      },
      otherSaveHandle() {
        this.setTime(this.other.beginTime)
        this.$message.success('保存成功')
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/style/PC/admin/config";
</style>
