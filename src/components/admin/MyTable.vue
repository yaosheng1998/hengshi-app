<template>
  <div class="my-table">
    <el-table
      :data="tableData"
      border
      stripe
      @expand-change="expandHandle"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item v-for="item in detailInfo"
                          :key="item.prop"
                          :label="item.label">
              <span v-if="item.expand">{{ expandData[props.row.id][item.prop] }}</span>
              <span v-else>{{ props.row[item.prop] }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column v-for="item in Info"
                       :key="item.label"
                       :label="item.label"
                       :prop="item.prop"
                       :width="item.width">
      </el-table-column>
      <el-table-column label="管理员状态"
                       width="180"
                       v-if="optionType === 'admin'">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope)"
                     :type="scope.row.is_admin?'danger':'success'"
                     class="admin-option">
            {{ scope.row.is_admin ? '取消管理员' : '设为管理员' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-wrapper">
      <el-pagination
        background
        class="page"
        layout="prev, pager, next"
        @current-change="pageChangeHandle"
        :total="pages">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      tableData: {
        type: Array
      },
      pages: {
        type: Number,
        default() {
          return 1;
        }
      },
      optionType: {
        type: String,
        default() {
          return ''
        }
      },
      expandHandle: {
        type: Function,
        default() {
          return function () {
          }
        }
      },
      pageChangeHandle: {
        type: Function,
        default() {
          return function () {
          }
        }
      },
      expandData: {
        type: Array,
        default() {
          return [];
        }
      },
      Info: {
        type: Array,
        default() {
          return [];
        }
      },
      detailInfo: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    mounted() {

    },
    data() {
      return {
        number: 0,
        page: 1
      }
    },
    methods: {
      handleClick(scope) {
        this.$axios.get('/admin/change_admin_status', {
          params: {
            id: scope.row.id
          }
        }).then(res => {
          if(res.code === 1){
            this.$set(scope.row, 'is_admin', true)
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 130px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .page-wrapper {
    margin-top: 1.5%;
    display: flex;
    justify-content: flex-end;
    .page {
      display: inline-block;
    }
  }

  .admin-option{
    margin: auto;
    display: block;
    width: 80%;
  }
</style>
