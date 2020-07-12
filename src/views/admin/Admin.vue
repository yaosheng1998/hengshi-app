<template>
  <div id="admin">
    <admin-qr-login v-if="!$store.state.isAdminLogin"/>
    <div v-else class="container">
      <el-row class="tac">
        <el-col :span="24" class="menu-wrapper">
          <el-menu
            :default-active="$store.state.menuIndex"
            class="el-menu-vertical-demo menu"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <div class="title"><i>logo</i>衡师小助手</div>
            <router-link :to="{name: 'edu_user'}" tag="div">
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">
                教务网用户
              </span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name: 'wx_user'}" tag="div">
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">微信用户</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name: 'curriculum'}" tag="div">
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">课表</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name: 'bill'}" tag="div">
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">账单</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name: 'config'}" tag="div">
              <el-menu-item index="5">
                <i class="el-icon-setting"></i>
                <span slot="title">设置</span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-col>
      </el-row>
      <div class="main">
        <div class="nav">
          <span class="admin-name">管理员: xxx</span>
        </div>
        <div class="content">
          <router-view class="current"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AdminQrLogin from '../../components/admin/AdminQrLogin'

  export default {
    components: {
      AdminQrLogin
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="less">
  @import "../../assets/style/PC/admin/index";
</style>
