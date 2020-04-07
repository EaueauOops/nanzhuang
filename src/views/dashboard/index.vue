<template>
  <div class="dashboard-container">
    <!--<div class="dashboard-text">name: {{ name }}</div>-->
    <!--<div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div>-->
    <aside class="test">用户：<b>{{ name }}</b> 你好！
      <br>
      欢迎使用中国•常熟男装指数管理平台</aside>
    <el-card>
      <div slot="header" >
        <span>系统简介</span>
      </div>
      中国•常熟男装指数的建设目标是立足常熟，服务全国，将其打造成中国男装发展走势的“风向标”和中国服装行业的“晴雨表”。中国˙常熟男装指数力争客观、准确地反映常熟男装市场价格、景气的变动情况和趋势，使市场买卖双方及时地了解市场供需变化特征，为企业经营决策提供参考；同时，相关主管部门也可以通过中国˙常熟男装指数的波动情况掌握服装市场的动态，了解必要的市场信息，制定相应的政策，科学地进行宏观管理和调控。
      <el-divider></el-divider>
      本系统主要功能及操作介绍
      <br>
      1.权限管理：本系统按照人员角色进行划分权限，根据部门对人员进行管理，实现多级授权，权限划分简单明确。
      <br>
      2.系统日志管理：每个人的操作行为记录于此，方便查询违规或其他操作。
      <br>
      3.分类管理：对整个系统产品分类，指数分类进行管理。主要分为男装景气度指数分类，男装出口指数分类秋冬装价格指数分类和内销产品分类。
      <br>
      4.元数据管理：主要针对景气度调查问卷而设计，可对生产景气调查问卷，市场景气度数据(实体店)，市场景气度数据(电商)调查选项进行管理。
      <br>
      5.环境变量设置：对系统变量做统一管理，例如：系统名称等。
      <br>
      6.数据采集：针对基础数据进行采集，主要包括内销基础数据，生产景气度数据，市场景气度数据(实体店),市场景气度数据(电商)环境景气数据进行采集。
      <br>
      7.出口数据采集：对企业出口基础数据进行采集。
      <br>
      8.指数曲线：根据基础数据计算得出，定基指数、环比指数、同比指数，在这里以曲约线图的形式进行展示，如指数需要调整，直接上下拖动保存即可。需要注意的是，只能调整当期指数。
    </el-card>
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
  .test {
      background: #eef1f6;
      padding: 8px 24px;
      margin-bottom: 20px;
      border-radius: 2px;
      display: block;
      line-height: 32px;
      font-size: 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      color: #2c3e50;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
  }
</style>
