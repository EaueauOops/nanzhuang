<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store/index'
export default {
  name: 'Dashboard',
  mounted: function() {
    if (store.getters.roles === 'merchant' && store.getters.ownerName === null) {
      this.$alert('您尚未完善商户信息，请前往完善', '提示', {
        confirmButtonText: '前往',
        callback: action => {
          this.$router.push('/merchant/index')
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
