<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="isAlive"/>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['isAlive'])
  }
}
</script>
