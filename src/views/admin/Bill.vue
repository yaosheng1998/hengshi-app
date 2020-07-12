<template>
  <div id="bill">
    <div class="user-bill">
      <h1><i class="iconfont">&#xe757;</i>所有学生账单</h1>
      <my-table
        :Info="info"
        :detail-info="detailInfo"
        :table-data="billTable.billData"
        :pages="billTable.pages"
        :expand-handle="getUserInfo"
        :page-change-handle="pageChange"
        :expand-data="billTable.expandData"
      ></my-table>
    </div>
    <div class="search-bill">
      <h1><i class="iconfont">&#xe757;</i>查询学生账单</h1>
      <div class="search">
        <el-input
          class="userid-input"
          placeholder="请输入内容"
          v-model="searchTable.input"
          clearable>
        </el-input>
        <el-button
          type="primary"
          @click="getBillByUserid"
          class="search-btn">
          搜索
        </el-button>
      </div>
      <my-table
        :Info="info"
        :detail-info="detailInfo"
        :table-data="searchTable.billData"
        :pages="searchTable.pages"
        :expand-handle="getUserInfoByUserid"
        :page-change-handle="pageChangeByUserid"
        :expand-data="searchTable.expandData"
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
      this.$store.commit('setMenuIndex', '4')
      this.getBill(1)
    },
    data() {
      return {
        number: 10,
        info: [
          {
            label: '交易号',
            prop: 'transaction_id',
            width: '300'
          }, {
            label: '商户交易号',
            prop: 'out_trade_no',
            width: '150'
          }, {
            label: '日期',
            prop: 'create_time',
            width: '240'
          }, {
            label: '金额',
            prop: 'total_fee',
            width: '100'
          }, {
            label: '状态码',
            prop: 'result_code',
            width: '150'
          }, {
            label: 'openid',
            prop: 'openid',
            width: ''
          }
        ],
        detailInfo: [
          {
            label: '交易号',
            prop: 'transaction_id',
          }, {
            label: '商户交易号',
            prop: 'out_trade_no',
          }, {
            label: '日期',
            prop: 'create_time',
          }, {
            label: '金额',
            prop: 'total_fee',
          }, {
            label: '学号',
            expand: true,
            prop: 'userid',
          }, {
            label: '班级名称',
            expand: true,
            prop: 'class_name',
          }, {
            label: '名字',
            expand: true,
            prop: 'name',
          }, {
            label: '电话号码',
            expand: true,
            prop: 'phone_number',
          }
        ],
        billTable: {
          pages: 1,
          billData: [],
          expandData: [],
        },
        searchTable: {
          pages: 1,
          billAllData: [],
          billData: [],
          expandData: [],
          input: ''
        }
      }
    },
    methods: {
      /**
       * 查询所有用户交易账单
       * @param pages 第几页
       */
      getBill(pages) {
        this.$axios.get('/admin/query_bill', {
          params: {
            pages,
            num: this.number
          }
        }).then(res => {
          this.billTable.expandData = new Array(10)
          this.billTable.expandData.fill({})
          res.data.map((item, index) => {
            item.total_fee /= 100
            item.id = index
          })
          this.billTable.billData = res.data
          this.billTable.pages = res.total_number * 10
        })
      },
      /**
       * 通过userid查询用户账单
       */
      getBillByUserid() {
        if ( !this.searchTable.input) return
        this.$axios.get('/admin/query_bill_by_userid', {
          params: {
            userid: this.searchTable.input
          }
        }).then(res => {
          if (res.code === -1) {
            alert(res.msg)
          } else {
            let index = 0;
            this.searchTable.expandData = new Array(10)
            this.searchTable.expandData.fill({})
            this.searchTable.pages = res.data.length
            res.data.map((item) => {
              item.total_fee /= 100
              item.id = (index++ % 10)
            })
            this.searchTable.billAllData = res.data
            this.searchTable.billData = res.data.slice(0, this.number)
          }
        })
      },
      /**
       * 所有账单翻页
       * @param page 当前页码
       */
      pageChange(page) {
        this.getBill(page)
      },
      /**
       * 搜索账单翻页
       * @param page 当前页码
       */
      pageChangeByUserid(page) {
        let startIndex = (page - 1) * 10
        let endIndex = Math.min(startIndex + this.number, this.searchTable.pages)
        this.searchTable.expandData = new Array(10)
        this.searchTable.expandData.fill({})
        this.searchTable.billData = this.searchTable.billAllData.slice(startIndex, endIndex)
      },
      /**
       * 展示一条账单的详细信息
       * @param row 账单信息
       */
      getUserInfo(row) {
        if ( !this.billTable.expandData[row.id].userid) {
          this.$axios.get(`/admin/openid2user/${row.openid}`).then(res => {
            if (res.code === 1) {
              this.billTable.expandData.splice(row.id, 1, res)
            } else {
              this.billTable.expandData.splice(row.id, 1, {name: res.msg})
            }
          })
        }
      },
      /**
       * 展示通过userid查询到的一条账单的详细信息
       * @param row 账单信息
       */
      getUserInfoByUserid(row) {
        if ( !this.searchTable.expandData[row.id].userid) {
          this.$axios.get(`/admin/openid2user/${row.openid}`).then(res => {
            if (res.code === 1) {
              this.searchTable.expandData.splice(row.id, 1, res)
            }
          })
        }
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/style/PC/admin/bill";
</style>
