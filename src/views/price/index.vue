<template>
  <div>
    <el-tabs v-model="tabIndex" style="width: 96%;margin:0 auto" type="border-card" @tab-click="handleClick">
      <el-tab-pane v-for="(tab,tabI) in tabbars" :key="tabI" :label="tab.name">
        <div>
          <el-cascader :options="bigList" clearable class="select" placeholder="请选择产品" :props="{ value: 'productCode', label: 'productName' }" v-model="product" @change="selectProduct"/>
        </div>
        <div class="title">
          <b>| </b>价格指数图表
        </div>
        <div id="main" v-if="tabIndex==='0'||tabIndex==='1'||tabIndex==='2'||tabIndex==='3'" style="width: 700px;height:300px;margin: 0 auto;"></div>
        <div class="title">
          <b>| </b>价格指数数据表
        </div>
        <div style="margin-top: 10px">
          <el-button type="primary" icon="el-icon-search" style="float: right" @click="getTable">搜索</el-button>
          <el-select clearable v-model="query.periodDays" placeholder="选择旬" style="width: 10%;float:right;margin-right: 5px">
            <el-option
              v-for="item in daysOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select clearable v-model="query.periodMonth" placeholder="选择月" style="width: 10%;float:right;margin-right: 5px">
            <el-option
              v-for="item in monthOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-date-picker
            v-model="query.periodYear"
            type="year"
            placeholder="选择年"
            format="yyyy"
            value-format="yyyy"
            style="width: 10%;float:right;margin-right: 5px"
          />
        </div>
        <el-table
          v-loading="listLoading"
          :data="list"
          stripe
          style="width: 98%;margin:0 auto"
          max-height="800"
          highlight-current-row
        >
          <el-table-column
            fixed
            label="序号"
            type="index"
            width="55"
            align="center"
          />
          <el-table-column
            prop="province"
            label="期数(年月旬)"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.period }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="编码"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="品牌"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.brand }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="区域"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.region }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="定基"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.fixedBaseIndex }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="本期调整指数"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.fixedBaseAdjustIndex }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="环比"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.chainIndex }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="环比调整指数"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.chainAdjustIndex }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="同比"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.yearOnYearIndex }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="同比调整指数"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.yearOnYearAdjustIndex }}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination  :total="total" :page.sync="query.pageNum" :limit.sync="query.pageSize" @pagination="getTable" />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { fetchLevel, fetchList } from '@/api/product'
import { filterPrice } from '@/api/price'

export default {
  name: 'Price',
  components: { Pagination },
  data() {
    return {
      listLoading: true,
      list: [],
      chart: [],
      total: 0,
      product: [],
      monthOptions: [{ 'value': '01', 'label': 1 }, { 'value': '02', 'label': 2 }, { 'value': '03', 'label': 3 }, { 'value': '04', 'label': 4 }, { 'value': '05', 'label': 5 }, { 'value': '06', 'label': 6 }, { 'value': '07', 'label': 7 }, { 'value': '08', 'label': 8 }, { 'value': '09', 'label': 9 }, { 'value': 10, 'label': 10 }, { 'value': 11, 'label': 11 }, { 'value': 12, 'label': 12 }],
      daysOptions: [{ 'value': '01', 'label': '01' }, { 'value': '02', 'label': '02' }, { 'value': '03', 'label': '03' }],
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
      selectList: []
    }
  },
  async created() {
    // console.log("created==>", document.getElementById("main"))
    const { data } = await fetchLevel('Big')
    var arr = await this.getList(data)
    for (var i in arr) {
      data.productList[i].children = arr[i]
    }
    this.bigList = data.productList
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab.index)
      if (tab.index === '0') {
        this.query.brand = ''
        this.queryChart.brand = 'all'
        this.query.region = ''
        this.queryChart.region = 'all'
      } else if (tab.index === '1') {
        this.query.brand = '知名'
        this.queryChart.brand = '知名'
        this.query.region = '本地'
        this.queryChart.region = '本地'
      } else if (tab.index === '2') {
        this.queryChart.brand = '普通'
        this.query.brand = '普通'
        this.queryChart.region = '本地'
        this.query.region = '本地'
      } else if (tab.index === '3') {
        this.queryChart.region = '外来'
        this.query.region = '外来'
        this.queryChart.brand = ''
        this.query.brand = ''
      }
      this.getTable()
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
      // console.log(this.product)
      if (this.product.length === 0) {
        this.query.code = '11'
        this.queryChart.code = '11'
        this.getTable()
        this.getChart()
      } else {
        this.query.code = this.product[1]
        this.queryChart.code = this.product[1]
        this.getTable()
        this.getChart()
      }
    },
    getTable() {
      // console.log(this.query.periodYear)
      if (this.query.periodYear === null) { this.query.periodYear = '' }
      this.listLoading = true
      filterPrice(this.query).then(response => {
        this.list = response.data.list
        this.total = response.data.list.length
        this.listLoading = false
      })
    },
    getChart() {
      this.periodList = []
      this.yearOnYearList = []
      this.chainList = []
      this.fixedBaseList = []
      filterPrice(this.queryChart).then(response => {
        this.chart = response.data.list
        for (const i of this.chart) {
          this.periodList.push(i.period)
          this.yearOnYearList.push(i.yearOnYearIndex)
          this.chainList.push(i.chainIndex)
          this.fixedBaseList.push(i.fixedBaseIndex)
        }
        this.drawChart()
      })
    },
    drawChart() {
      const myChart = this.$echarts.init(document.getElementById('main'))
      const periodList = this.periodList
      const fixedBaseList = this.fixedBaseList
      const yearOnYearList = this.yearOnYearList
      const chainList = this.chainList
      const option = {
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
            restore: {}
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
                { type: 'average', name: '平均值' }
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
                { type: 'average', name: '平均值' }
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
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  },
  updated() {
    this.getChart()
  },
  mounted() {
    this.getTable()
    this.getChart()
  }
}
</script>

<style lang="scss" scoped>
  .select {
    margin-bottom: 10px;
    /*margin-top: 3px;*/
    width: 20%
  }

  .title {
    background-color: #d3dce6;
    width: 100%;
    margin:0 auto;
    height: 40px;
    line-height: 40px;
    text-indent:1em;
  }
</style>
