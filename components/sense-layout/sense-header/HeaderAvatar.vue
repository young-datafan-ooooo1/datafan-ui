<!--
 * @Description: 用户图像显示组件
 * @Date: 2022-03-14 14:22:26
-->
<template>
  <!-- <a-dropdown> -->
  <div class="header-avatar" style="cursor: pointer">
    <img class="avatar" :src="ASSETS_URL+ '/common/img/header-user.png'" alt="">
    <span class="name">{{ user }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { logout } from '@sense70/common-component-vue'
import { ASSETS_URL } from '@/services/api'

export default {
  name: 'HeaderAvatar',
  data() {
    return {
      ASSETS_URL
    }
  },
  computed: {
    ...mapGetters('account', ['user'])
  },
  methods: {
    logout() {
      logout()
    }
  }
}
</script>

<style lang="less">
.header-avatar {
  display: inline-flex;
  .avatar,
  .name {
    align-self: center;
  }
  .avatar {
    margin-right: 10px;
    width: 1rem;
    height: 1rem;
    border-radius: 0.5rem;
  }
  .name {
    font-weight: 500;
  }
}
.avatar-menu {
  width: 150px;
}
</style>
