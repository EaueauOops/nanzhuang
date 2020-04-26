<template>
  <div>
    <el-tabs v-model="tabIndex" style="width: 96%; margin: 30px auto" type="border-card" @tab-click="handleClick">
      <el-tab-pane v-for="(tab,tabI) in tabbars" :key="tabI" :label="tab.name">
        <div>
          <el-cascader v-model="product" :options="bigList" clearable class="select" placeholder="请选择产品" :props="{ value: 'productCode', label: 'productName', expandTrigger: 'hover' }" @change="selectProduct" />
        </div>
        <div class="title">
          <b>| </b>价格指数图表
        </div>
        <div style="margin-top: 10px">
          <el-button type="primary" icon="el-icon-search" style="float: right" @click="filterChartPeriod">搜索</el-button>
          <el-input v-model="chartPeriodEnd" style="width: 15%;float: right;margin-right: 5px" placeholder="请输入结束期数" />
          <el-input v-model="chartPeriodStart" style="width: 15%;float: right;margin-right: 5px" placeholder="请输入开始期数" /></div>
        <div id="main" ref="main" style="width: 100%;height:300px;margin: 60px auto 0px auto" />
        <div class="title">
          <b>| </b>价格指数数据表
        </div>
        <div style="width: 100%; margin-top: 10px">
          <el-button type="primary" icon="el-icon-search" style="float: right" @click="getTable">搜索</el-button>
          <el-select v-model="query.periodDays" clearable placeholder="选择旬" style="width: 10%;float:right;margin-right: 5px">
            <el-option v-for="item in daysOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="query.periodMonth" clearable placeholder="选择月" style="width: 10%;float:right;margin-right: 5px">
            <el-option v-for="item in monthOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-date-picker v-model="query.periodYear" type="year" placeholder="选择年" format="yyyy" value-format="yyyy" style="width: 10%;float:right;margin-right: 5px" />
        </div>
        <div>
          <el-table v-loading="listLoading" :data="list" stripe border style="width: 100%; margin: 80px auto 0;" max-height="800" highlight-current-row>
          <el-table-column fixed label="序号" type="index" width="55" align="center" />
          <el-table-column prop="province" width="120" label="期数(年月旬)" align="center">
            <template slot-scope="{row}">
              <span>{{ row.period }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="编码" align="center" width="120">
            <template slot-scope="{row}">
              <span>{{ row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="品牌" align="center" width="120">
            <template slot-scope="{row}">
              <span>{{ row.brand }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="区域" align="center" width="120">
            <template slot-scope="{row}">
              <span>{{ row.region }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="定基" align="center" width="120">
            <template slot-scope="{row}">
              <span>{{ row.fixedBaseIndex }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="本期调整指数" align="center" width="120">
            <template slot-scope="{row}">
              <span>{{ row.fixedBaseAdjustIndex }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="环比" align="center" width="120">
            <template slot-scope="{row}">
              <span>{{ row.chainIndex }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="环比调整指数" align="center" width="120">
            <template slot-scope="{row}">
              <span>{{ row.chainAdjustIndex }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="同比" align="center" width="120">
            <template slot-scope="{row}">
              <span>{{ row.yearOnYearIndex }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="同比调整指数" align="center" width="120">
            <template slot-scope="{row}">
              <span>{{ row.yearOnYearAdjustIndex }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="100" v-if="role !== 'user'">
            <template slot-scope="{row}">
              <el-button  size="mini" type="warning" @click="handleAdjust(row)">
                调整
              </el-button>
            </template>
          </el-table-column>
        </el-table>
          <pagination :total="total" :page.sync="query.pageNum" :limit.sync="query.pageSize" @pagination="getTable" />
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="请输入调整指数"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :label-position="labelPosition" label-width="100px" :model="adjustList">
        <el-form-item label="定基调整指数">
          <el-input v-model="adjustList.fixedBaseAdjustIndex"></el-input>
        </el-form-item>
        <el-form-item label="同比调整指数">
          <el-input v-model="adjustList.yearOnYearAdjustIndex"></el-input>
        </el-form-item>
        <el-form-item label="环比调整指数">
          <el-input v-model="adjustList.chainAdjustIndex"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="startAdujst">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import store from '@/store'
import { fetchLevel, fetchList } from '@/api/product'
import { filterPrice, adjustIndex } from '@/api/price'
import { mapMutations } from 'vuex'

export default {
  name: 'Price',
  components: { Pagination },
  data() {
    return {
      role: store.getters.roles,
      index: '0',
      chartPeriodStart: '',
      chartPeriodEnd: '',
      listLoading: true,
      list: [],
      chart: [],
      total: 0,
      product: [],
      monthOptions: [{
        'value': '01',
        'label': 1
      }, {
        'value': '02',
        'label': 2
      }, {
        'value': '03',
        'label': 3
      }, {
        'value': '04',
        'label': 4
      }, {
        'value': '05',
        'label': 5
      }, {
        'value': '06',
        'label': 6
      }, {
        'value': '07',
        'label': 7
      }, {
        'value': '08',
        'label': 8
      }, {
        'value': '09',
        'label': 9
      }, {
        'value': 10,
        'label': 10
      }, {
        'value': 11,
        'label': 11
      }, {
        'value': 12,
        'label': 12
      }],
      daysOptions: [{
        'value': '01',
        'label': '01'
      }, {
        'value': '02',
        'label': '02'
      }, {
        'value': '03',
        'label': '03'
      }],
      query: {
        code: '11',
        brand: '',
        region: '',
        periodYear: '',
        periodMonth: '',
        periodDays: '',
        daleiName: '',
        zhongleiName: '',
        pageNum: 1,
        pageSize: 20
      },
      queryChart: {
        code: '11',
        brand: 'all',
        region: 'all',
        periodYear: '',
        periodMonth: '',
        periodDays: '',
        daleiName: '',
        zhongleiName: '',
        pageNum: 1,
        pageSize: 20
      },
      totalChart: 0,
      totalChartData: [],
      periodList: [],
      fixedBaseList: [],
      yearOnYearList: [],
      chainList: [],
      tabbars: [
        { name: '所有' },
        { name: '本地知名' },
        { name: '本地普通' },
        { name: '外来' }
      ],
      tabIndex: 0,
      bigList: [],
      selectList: [],
      adjustList: {
        fixedBaseAdjustIndex: '',
        yearOnYearAdjustIndex: '',
        chainAdjustIndex: '',
        indexId: null
      },
      dialogVisible: false
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'SaleRecord') {
      next(vm => {
        vm.$router.push({ path: '/price' })
        vm.toggleIsAlive(false)
        location.reload()
        vm.$nextTick(() => {
          vm.toggleIsAlive(true)
        })
      })
    } else {
      next()
    }
  },
  async created() {
    const { data } = await fetchLevel('Big')
    var arr = await this.getList(data)
    for (var i in arr) {
      data.productList[i].children = arr[i]
    }
    this.bigList = data.productList
  },
  mounted() {
    this.getTable()
    this.getChart()
  },
  methods: {
    ...mapMutations(['toggleIsAlive']),
    // handleClick(tab, event) {
    //   this.index = tab.index
    //   if (tab.index === '0') {
    //     this.resetData()
    //   } else if (tab.index === '1') {
    //     this.resetData('知名', '知名', '本地', '本地')
    //   } else if (tab.index === '2') {
    //     this.resetData('普通', '普通', '本地', '本地')
    //   } else if (tab.index === '3') {
    //     this.resetData('', '知名', '外来', '外来')
    //   }
    //   this.getTable()
    //   this.getChart()
    // },
    // resetData(queryBrand = '', queryChartBrand = 'all', queryRegion = '', queryChartRegion = 'all') {
    //   this.query.brand = queryBrand
    //   this.queryChart.brand = queryChartBrand
    //   this.query.region = queryRegion
    //   this.queryChart.region = queryChartRegion
    // },
    handleClick(tab, event) {
      this.chartPeriodStart = this.chartPeriodEnd = ''
      this.index = tab.index
      if (tab.index === '0') {
        this.resetData({ queryBrand: '', queryChartBrand: 'all', queryRegion: '', queryChartRegion: 'all' })
      } else if (tab.index === '1') {
        this.resetData({ queryBrand: '知名', queryChartBrand: '知名', queryRegion: '本地', queryChartRegion: '本地' })
      } else if (tab.index === '2') {
        this.resetData({ queryBrand: '普通', queryChartBrand: '普通', queryRegion: '本地', queryChartRegion: '本地' })
      } else if (tab.index === '3') {
        this.resetData({ queryBrand: '', queryChartBrand: '知名', queryRegion: '外来', queryChartRegion: '外来' })
      }
      this.getTable()
      this.getChart()
    },
    resetData(params) {
      this.query.brand = params.queryBrand
      this.queryChart.brand = params.queryChartBrand
      this.query.region = params.queryRegion
      this.queryChart.region = params.queryChartRegion
    },
    async getList(data) {
      const arr = []
      for (var i in data.productList) {
        var res = await fetchList(data.productList[i].productId)
        arr.push(res.data.productList)
        if (i == data.productList.length - 1) return arr
      }
    },
    selectProduct() {
      if (this.product.length === 0) {
        this.query.code = '11'
        this.queryChart.code = '11'
      } else {
        this.query.code = this.product[1]
        this.queryChart.code = this.product[1]
      }
      this.getTable()
      this.getChart()
    },
    getTable() {
      if (this.query.periodYear === null) {
        this.query.periodYear = ''
      }
      this.listLoading = true
      filterPrice(this.query).then(response => {
        this.list = response.data.list
        this.total = response.data.length
        this.listLoading = false
      })
    },
    handleAdjust(row) {
      this.adjustList.indexId = row.indexId
      this.dialogVisible = true
    },
    startAdujst() {
      adjustIndex(this.adjustList).then(res => {
        this.dialogVisible = false
        this.clearAdjustList()
        this.getTable()
        this.getChart()
      })
    },
    clearAdjustList() {
      this.adjustList =  {
        fixedBaseAdjustIndex: '',
        yearOnYearAdjustIndex: '',
        chainAdjustIndex: '',
        indexId: null
      }
    },
    getChart() {
      filterPrice(this.queryChart).then(response => {
        this.chart = response.data.list
        this.totalChart = response.data.length
        this.initChartData()
        for (const i of this.chart) {
          this.periodList.push(i.period)
          if (i.yearOnYearAdjustIndex !== '') { this.yearOnYearList.push(i.yearOnYearAdjustIndex) } else {
            this.yearOnYearList.push(i.yearOnYearIndex)
          }
          if (i.chainAdjustIndex !== '') { this.chainList.push(i.chainAdjustIndex) } else {
            this.chainList.push(i.chainIndex)
          }
          if (i.fixedBaseAdjustIndex !== '') { this.fixedBaseList.push(i.fixedBaseAdjustIndex) } else {
            this.fixedBaseList.push(i.fixedBaseIndex)
          }
        }
        this.drawChart()
        this.getTotalChartData()
      })
    },
    initChartData() {
      this.periodList = []
      this.yearOnYearList = []
      this.chainList = []
      this.fixedBaseList = []
    },
    getTotalChartData() {
      this.queryChart.pageSize = this.totalChart
      filterPrice(this.queryChart).then(response => {
        this.queryChart.pageSize = 20
        this.totalChartData = response.data.list
      })
    },
    filterChartPeriod() {
      this.initChartData()
      // console.log(this.totalChartData)
      for (const i of this.totalChartData) {
        this.periodList.push(i.period)
        if (i.yearOnYearAdjustIndex !== '') { this.yearOnYearList.push(i.yearOnYearAdjustIndex) } else {
          this.yearOnYearList.push(i.yearOnYearIndex)
        }
        if (i.chainAdjustIndex !== '') { this.chainList.push(i.chainAdjustIndex) } else {
          this.chainList.push(i.chainIndex)
        }
        if (i.fixedBaseAdjustIndex !== '') { this.fixedBaseList.push(i.fixedBaseAdjustIndex) } else {
          this.fixedBaseList.push(i.fixedBaseIndex)
        }
      }
      this.filterPeriod()
      this.drawChart()
    },
    filterPeriod() {
      let a = 0
      let b = this.periodList.length
      for (const i in this.periodList) {
        if (this.periodList[i - 1] + '' === this.chartPeriodStart) { b = i }
        if (this.periodList[i] + '' === this.chartPeriodEnd) { a = i }
      }
      this.periodList = this.periodList.slice(a, b)
      this.yearOnYearList = this.yearOnYearList.slice(a, b)
      this.chainList = this.chainList.slice(a, b)
      this.fixedBaseList = this.fixedBaseList.slice(a, b)
    },
    drawChart() {
      this.$refs.main[0].id = 'main'
      this.$refs.main[1].id = 'well-known'
      this.$refs.main[2].id = 'ordinary'
      this.$refs.main[3].id = 'foreign'
      var myChart = ''
      console.log('initchart')
      if (this.index === '0') {
        myChart = this.$echarts.init(document.getElementById('main'))
      } else if (this.index === '1') {
        myChart = this.$echarts.init(document.getElementById('well-known'))
      } else if (this.index === '2') {
        myChart = this.$echarts.init(document.getElementById('ordinary'))
      } else if (this.index === '3') {
        myChart = this.$echarts.init(document.getElementById('foreign'))
      }
      var periodList = JSON.parse(JSON.stringify(this.periodList))
      var fixedBaseList = this.fixedBaseList
      var yearOnYearList = this.yearOnYearList
      var chainList = this.chainList
      periodList = periodList.reverse()
      fixedBaseList = fixedBaseList.reverse()
      yearOnYearList = yearOnYearList.reverse()
      chainList = chainList.reverse()
      var option = {
        title: {
          text: '男装内销价格指数',
          subtext: this.tabbars[this.tabIndex].name
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['定基', '同比', '环比']
        },
        xAxis: {
          data: periodList
        },
        yAxis: {},
        toolbox: { // 工具箱
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['bar', 'line'] },
            restore: {},
            saveAsImage: {} // 导出图片
          }
        },
        series: [
          {
            name: '定基',
            type: 'bar',
            barWidth: '60%',
            data: fixedBaseList,
            markLine: {
              data: [
                {
                  type: 'average',
                  name: '平均值'
                }
              ]
            }
          },
          {
            name: '同比',
            type: 'bar',
            barWidth: '60%',
            data: yearOnYearList,
            markLine: {
              data: [
                {
                  type: 'average',
                  name: '平均值'
                }
              ]
            }
          },
          {
            name: '环比',
            type: 'bar',
            barWidth: '60%',
            data: chainList,
            markLine: {
              data: [
                {
                  type: 'average',
                  name: '平均值'
                }
              ]
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss">
  .el-table--border th, .el-table__fixed-right-patch {
    background: rgb(215, 227, 247);
  }
</style>

<style lang="scss" scoped>
  .select {
    margin-bottom: 10px;
    width: 20%
  }
  .title {
    background-color: #d3dce6;
    width: 100%;
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
    text-indent: 1em;
  }
</style>
