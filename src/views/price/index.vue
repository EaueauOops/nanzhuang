<template>
  <div>
    <el-tabs v-model="tabIndex" style="width: 96%;margin:0 auto" type="border-card" @tab-click="handleClick">
      <el-tab-pane v-for="(tab,tabI) in tabbars" :key="tabI" :label="tab.name">
        <div>
          <el-cascader :options="bigList" clearabl class="select" :props="{ value: 'productId', label: 'productName', children:'children' }" />
          <!--<el-date-picker-->
            <!--v-model="year"-->
            <!--type="year"-->
            <!--placeholder="选择年">-->
          <!--</el-date-picker>-->
          <!--<el-select v-model="month" placeholder="选择月">-->
            <!--<el-option-->
              <!--v-for="item in monthOptions"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
          <!--<el-select v-model="days" placeholder="选择旬">-->
            <!--<el-option-->
              <!--v-for="item in daysOptions"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        </div>
        <div class="title">
          <b>| </b>价格指数图表
        </div>
        <div class="title">
          <b>| </b>价格指数数据表
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
              <span>{{ row.a }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="品牌"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.a }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="区域"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.a }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="定基"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.a }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="本期调整指数"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.a }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="环比"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.a }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="环比调整指数"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.a }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="同比"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.a }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="同比调整指数"
            width="120"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.a }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { fetchLevel, fetchList } from '@/api/product'
export default {
  name: 'Price',
  components: { Pagination },
  data() {
    return {
      listLoading: false,
      list: [],
      year: '',
      month: '',
      days: '',
      options: [
        {
          'productId': 25,
          'productCode': '300',
          'productName': '上衣',
          'typeLevel': 'Big',
          'daleiId': null,
          'children': [
            {
              'productId': 26,
              'productCode': '301',
              'productName': '衬衫',
              'typeLevel': 'Middle',
              'daleiId': 25
            },
            {
              'productId': 27,
              'productCode': '302',
              'productName': '短袖',
              'typeLevel': 'Middle',
              'daleiId': 25
            }
          ]
        },
        {
          'productId': 28,
          'productCode': '500',
          'productName': '下衣',
          'typeLevel': 'Big',
          'daleiId': null
        },
        {
          'productId': 30,
          'productCode': '200',
          'productName': '外套',
          'typeLevel': 'Big',
          'daleiId': null
        }
      ],
      // monthOptions: [{'value':1, 'label':1 }, {'value':1, 'label':1 }, {'value':1, 'label':1 }, {'value':1, 'label':1 }, {'value':1, 'label':1 }, {'value':1, 'label':1 }, {'value':1, 'label':1 }, {'value':1, 'label':1 },{'value':1, 'label':1 }, {'value':1, 'label':1 }],
      queryAll: {
        pageNum: 1,
        pageSize: 20
      },
      query: {
        code: '',
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
  mounted() {
    this.getSelect()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.index)
    },
    getSelect() {
      fetchLevel('Big').then(response => {
        this.bigList = response.data.productList
        for (const i of this.bigList) {
          // console.log('i '+i.productId)
          fetchList(i.productId).then(response => {
            i.children = response.data.productList
          })
        }
        console.log(this.bigList)
      })
    }
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
