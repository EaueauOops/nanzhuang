<template>
  <div>
    <el-card class="select">
      商户经营者:<el-select clearable v-model="query.merchantName" class="selectItem" placeholder="请选择商户经营者" style="width: 15%" @change="filter1">
        <el-option
          v-for="item in merchantList"
          :key="item.merchantId"
          :label="item.ownerName"
          :value="item.ownerName"
        />
      </el-select>
      商企代码:<el-select clearable v-model="query.businessCode" class="selectItem" placeholder="请选择商企代码" style="width: 15%" @change="filter2">
        <el-option
          v-for="item in merchantList"
          :key="item.merchantId"
          :label="item.businessCode"
          :value="item.businessCode"
        />
      </el-select>
      唯一编码:<el-select clearable v-model="query.uniqueCode" class="selectItem" placeholder="请选择唯一编码" style="width: 15%" @change="filter3">
      <el-option
        v-for="item in merchantList"
        :key="item.merchantId"
        :label="item.uniqueCode"
        :value="item.uniqueCode"
      />
    </el-select>
      录入用户:<el-input v-model="query.recodeUsername" class="selectItem" placeholder="请输入录入用户" />
      <br>
      产品大类:<el-select clearable v-model="query.productDaleiName" class="selectItem" placeholder="请选择产品大类" @change="findMiddleList">
        <el-option
          v-for="item in bigList"
          :key="item.productId"
          :label="item.productName"
          :value="item.productName"
        />
      </el-select>
      产品中类:<el-select clearable v-model="query.productZhongleiName" class="selectItem" placeholder="请选择产品中类">
        <el-option
          v-for="item in middleList"
          :key="item.productId"
          :label="item.productName"
          :value="item.productName"
        />
      </el-select>
      期数:<el-input v-model="query.startTime" class="selectItem" style="width: 15%" placeholder="请输开始期数" />
      至<el-input v-model="query.endTime" class="selectItem" style="width: 15%" placeholder="请输入结束期数" />
      <br>
      <el-button type="primary" icon="el-icon-search" style="float: right;margin-bottom: 10px" @click="handleFilter">搜索</el-button>
      <el-button v-if="role !== 'user'" type="primary" icon="el-icon-edit" style="float: right;margin-right: 10px" @click="dialogVisible = true">上传</el-button>
    </el-card>

    <el-dialog
      title="内销数据采集"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="106px" style="width: 500px;">
        <el-form-item label="商户信息" required>
          <el-row style="width: 350px;">
            <el-col :span="8">
              <el-form-item prop="merchantName"><el-select v-model="temp.merchantName" :disabled="isDisabled" placeholder="商户经营者" style="width: 95%" @change="changeEvent1">
                <el-option
                  v-for="item in merchantList"
                  :key="item.merchantId"
                  :label="item.ownerName"
                  :value="item.ownerName"
                />
              </el-select></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="businessCode"><el-select v-model="temp.businessCode" :disabled="isDisabled" placeholder="商企代码" style="width: 95%" @change="changeEvent2">
                <el-option
                  v-for="item in merchantList"
                  :key="item.merchantId"
                  :label="item.businessCode"
                  :value="item.businessCode"
                />
              </el-select></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="uniqueCode"><el-select v-model="temp.uniqueCode" :disabled="isDisabled" placeholder="唯一编码" style="width: 95%" @change="changeEvent3">
                <el-option
                  v-for="item in merchantList"
                  :key="item.merchantId"
                  :label="item.uniqueCode"
                  :value="item.uniqueCode"
                />
              </el-select></el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="期数" required>
          <el-row style="width: 350px;">
            <el-col :span="8"><el-form-item prop="periodYear"><el-input v-model="temp.periodYear" placeholder="年" style="width: 95%" /></el-form-item></el-col>
            <el-col :span="8"><el-form-item prop="periodMonth"><el-input v-model="temp.periodMonth" placeholder="月" style="width: 95%" /></el-form-item></el-col>
            <el-col :span="8"><el-form-item prop="periodDays"><el-input v-model="temp.periodDays" placeholder="旬" style="width: 95%" /></el-form-item></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="品牌知名度" prop="brand">
          <el-radio v-model="temp.brand" label="知名" style="margin-left: 30px; margin-right: 40px">知名</el-radio>
          <el-radio v-model="temp.brand" label="普通">普通</el-radio>
        </el-form-item>
        <el-form-item label="区域" prop="region">
          <el-radio v-model="temp.region" label="本地" style="margin-left: 30px; margin-right: 40px">本地</el-radio>
          <el-radio v-model="temp.region" label="外来">外来</el-radio>
        </el-form-item>
        <el-form-item label="产品大类" required>
          <el-row style="width: 350px;">
            <el-col :span="12">
              <el-form-item prop="productDaleiCode"><el-select v-model="temp.productDaleiCode" placeholder="大类代码" style="width: 95%" @change="changeParentCode">
                <el-option
                  v-for="item in bigList"
                  :key="item.productId"
                  :label="item.productCode"
                  :value="item.productCode"
                />
              </el-select></el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="productDaleiName"><el-select v-model="temp.productDaleiName" placeholder="大类名" style="width: 95%" @change="changeParentName">
                <el-option
                  v-for="item in bigList"
                  :key="item.productId"
                  :label="item.productName"
                  :value="item.productName"
                />
              </el-select></el-form-item></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="大类销售数据" prop="productDaleiSales">
          <el-input v-model="temp.productDaleiSales" placeholder="大类本旬销售额(万元)" style="width: 80%" />
        </el-form-item>
        <el-form-item label="产品中类" required>
          <el-row style="width: 350px;">
            <el-col :span="12">
              <el-form-item prop="productZhongleiCode"><el-select v-model="temp.productZhongleiCode" placeholder="中类代码" style="width: 95%" @change="changeChildCode">
                <el-option
                  v-for="item in middleList"
                  :key="item.productId"
                  :label="item.productCode"
                  :value="item.productCode"
                />
              </el-select></el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="productZhongleiName"><el-select v-model="temp.productZhongleiName" placeholder="中类名" style="width: 95%" @change="changeChildName">
                <el-option
                  v-for="item in middleList"
                  :key="item.productId"
                  :label="item.productName"
                  :value="item.productName"
                />
              </el-select></el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="中类销售数据" required>
          <el-row style="width: 350px;">
            <el-col :span="12">
              <el-form-item prop="productZhongleiSalePrice">
                <el-input v-model="temp.productZhongleiSalePrice" placeholder="中类本旬销售额(万元)" style="width: 95%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="productZhongleiSaleNumber">
                <el-input v-model="temp.productZhongleiSaleNumber" placeholder="中类本旬销售量" style="width: 95%" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="规格代表品" required>
          <el-row style="width: 350px;">
            <el-col :span="8">
              <el-form-item prop="representationNumber">
                <el-input v-model="temp.representationNumber" placeholder="代表品货号" style="width: 95%" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="currentPrice">
                <el-input v-model="temp.currentPrice" placeholder="本旬价格" style="width: 95%" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="currentSales">
                <el-input v-model="temp.currentSales" placeholder="本旬销量" style="width: 95%" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="详细信息" prop="detail">
          <el-input v-model="temp.A" placeholder="A主材质面料" style="width: 26.7%" />
          <el-input v-model="temp.B" placeholder="B面料类型" style="width: 26.7%" />
          <el-input v-model="temp.C" placeholder="C领型" style="width: 26.7%" />
          <br>
          <el-input v-model="temp.D" placeholder="D下摆" style="width: 26.7%" />
          <el-input v-model="temp.E" placeholder="E门襟" style="width: 26.7%" />
          <el-input v-model="temp.F" placeholder="F款式细节" style="width: 26.7%" />
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="temp.note" placeholder="备注" style="width: 80%" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-checkbox v-model="isKeep" style="margin-right: 10px">记住选项</el-checkbox>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreate">确 定</el-button>
      </span>
    </el-dialog>

    <el-table
      :data="list"
      stripe
      v-loading="listLoading"
      style="width: 98%;margin:0 auto"
      max-height="800"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        label="序号"
        type="index"
        width="55"
        align="center">
      </el-table-column>
      <el-table-column
        fixed
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        prop="name"
        label="录入用户"
        width="120"
        align="center">
        <template slot-scope="{row}">
          <span>{{ row.recodeUsername }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="province"
        label="期数(年月旬)"
        width="120"
        align="center">
        <template slot-scope="{row}">
          <span>{{ row.period }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="city"
        label="商户经营者"
        width="120"
        align="center">
        <template slot-scope="{row}">
          <span>{{ row.merchantName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="商企代码"
        width="120"
        align="center">
        <template slot-scope="{row}">
          <span>{{ row.businessCode }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="zip"
        label="唯一编码"
        width="120"
        align="center">
        <template slot-scope="{row}">
          <span>{{ row.uniqueCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品大类" align="center">
        <el-table-column
          prop=""
          label="代码"
          width="120">
          <template slot-scope="{row}">
            <span>{{ row.productDaleiCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="名称"
          width="120">
          <template slot-scope="{row}">
            <span>{{ row.productDaleiName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="本旬销售额(万元)"
          width="120">
          <template slot-scope="{row}">
            <span>{{ row.productDaleiSales }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="产品中类" align="center">
        <el-table-column
          prop=""
          label="代码"
          width="120">
          <template slot-scope="{row}">
            <span>{{ row.productZhongleiCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="名称"
          width="120">
          <template slot-scope="{row}">
            <span>{{ row.productZhongleiName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="本旬销售额(万元)"
          width="120">
          <template slot-scope="{row}">
            <span>{{ row.productZhongleiSalePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="本旬销量"
          width="120">
          <template slot-scope="{row}">
            <span>{{ row.productZhongleiSaleNumber }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="规格代表品" align="center">
        <el-table-column
          prop=""
          label="代码"
          width="120">
        </el-table-column>
        <el-table-column
          prop=""
          label="货号"
          width="120">
          <template slot-scope="{row}">
            <span>{{ row.representationNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="本旬价格"
          width="120">
          <template slot-scope="{row}">
            <span>{{ row.currentPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="本旬销量"
          width="120">
          <template slot-scope="{row}">
            <span>{{ row.currentSales }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop=""
        label="A主材质面料"
        width="120"
        align="center">
        <template slot-scope="{row}">
          <span>{{ row.a }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="B面料类型"
        width="120"
        align="center">
        <template slot-scope="{row}">
          <span>{{ row.b }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="C领型"
        width="120"
        align="center">
        <template slot-scope="{row}">
          <span>{{ row.c }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="D下摆"
        width="120"
        align="center">
        <template slot-scope="{row}">
          <span>{{ row.d }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="E门襟"
        width="120"
        align="center">
        <template slot-scope="{row}">
          <span>{{ row.e }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="F款式细节"
        width="120"
        align="center">
        <template slot-scope="{row}">
          <span>{{ row.f }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="备注"
        width="120"
        align="center">
        <template slot-scope="{row}">
          <span>{{ row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="录入日期"
        width="120"
        align="center">
        <template slot-scope="{row}">
          <span>{{ row.recordTimeStamp | formatTimeStamp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="100" v-if="role !== 'user'">
        <template slot-scope="{row,$index}">
          <el-button  size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="danger" style="float: right;margin-top: 20px;margin-right: 20px" @click="handlePlentyDelete" v-if="role !== 'user'">批量删除</el-button>
    <pagination v-if="totalAll>0" :total="totalAll" :page.sync="queryAll.pageNum" :limit.sync="queryAll.pageSize" @pagination="getList" />
    <pagination v-else-if="total>0" :total="total" :page.sync="query.pageNum" :limit.sync="query.pageSize" @pagination="handleFilter" />

  </div>
</template>

<script>
import store from '@/store'
import { merchantList } from '@/api/merchant'
import { addSaleRecord, getAllSaleRecord, filterSaleRecord, deleteSaleRecord } from '@/api/saleRecord'
import { fetchLevel, fetchList } from '@/api/product'
import Pagination from '@/components/Pagination'

export default {
  name: 'SaleRecord',
  components: { Pagination },
  data() {
    const validateYear = (rule, value, callback) => {
      if (value.length !== 4) {
        callback(new Error('请输入四位数字'))
      } else {
        callback()
      }
    }
    const validateMY = (rule, value, callback) => {
      if (value.length !== 2) {
        callback(new Error('请输入两位数字'))
      } else {
        callback()
      }
    }
    return {
      role: store.getters.roles,
      dialogVisible: false,
      multipleSelection: [],
      merchantList: [],
      merchantNum: null,
      totalAll: 0,
      listLoading: true,
      total: 0,
      list: [],
      isKeep: true,
      bigList: [],
      middleList: [],
      queryAll: {
        pageNum: 1,
        pageSize: 20
      },
      query: {
        merchantName: '',
        businessCode: '',
        recodeUsername: '',
        uniqueCode: '',
        productDaleiName: '',
        productZhongleiName: '',
        startTime: null,
        endTime: null,
        // pagination绑定
        pageNum: 1,
        pageSize: 20
      },
      temp2: {},
      temp: {
        merchantName: store.getters.ownerName,
        businessCode: store.getters.businessCode,
        uniqueCode: store.getters.uniqueCode,
        periodYear: '',
        periodMonth: '',
        periodDays: '',
        brand: '',
        region: '',
        productDaleiCode: '',
        productDaleiName: '',
        productDaleiSales: null,
        productZhongleiCode: '',
        productZhongleiName: '',
        productZhongleiSalePrice: null,
        productZhongleiSaleNumber: null,
        representationNumber: '',
        currentPrice: null,
        currentSales: null,
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        note: ''
      },
      rules: {
        merchantName: [{ required: true, message: 'merchantName is required', trigger: 'change' }],
        businessCode: [{ required: true, message: 'businessCode is required', trigger: 'change' }],
        uniqueCode: [{ required: true, message: 'uniqueCode is required', trigger: 'change' }],
        brand: [{ required: true, message: 'brand is required', trigger: 'change' }],
        productDaleiName: [{ required: true, message: 'productDaleiName is required', trigger: 'change' }],
        productDaleiCode: [{ required: true, message: 'productDaleiCode is required', trigger: 'change' }],
        productZhongleiCode: [{ required: true, message: 'ZhongleiCode is required', trigger: 'change' }],
        productZhongleiName: [{ required: true, message: 'ZhongleiName is required', trigger: 'change' }],
        periodYear: [{ validator: validateYear, trigger: 'blur' }],
        periodMonth: [{ validator: validateMY, trigger: 'blur' }],
        periodDays: [{ validator: validateMY, trigger: 'blur' }],
        productDaleiSales: [{ required: true, message: 'productDaleiSales is required', trigger: 'blur' }],
        representationNumber: [{ required: true, message: 'representationNumber is required', trigger: 'blur' }],
        currentPrice: [{ required: true, message: 'currentPrice is required', trigger: 'blur' }],
        currentSales: [{ required: true, message: 'currentSales is required', trigger: 'blur' }],
        productZhongleiSalePrice: [{ required: true, message: 'ZhongleiSalePrice is required', trigger: 'blur' }, { required: true, message: 'ZhongleiSale is required', trigger: 'blur' }],
        productZhongleiSaleNumber: [{ required: true, message: 'ZhongleiSaleNumber is required', trigger: 'blur' }, { required: true, message: 'ZhongleiSale is required', trigger: 'blur' }],
        region: [{ required: true, message: 'region is required', trigger: 'blur' }]
      }
    }
  },
  filters: {
    formatTimeStamp: function(value) {
      if (!value) return ''
      let time_var = value
      if (String(time_var).length === 10) { time_var = time_var * 1000 }
      const date = new Date(Number(time_var))
      const Y = date.getFullYear() + '-'
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
      const v_time = Y + M + D
      return v_time
    }
  },
  computed: {
    // 当为merchant时不允许修改
    isDisabled() {
      if (store.getters.roles === 'merchant') { return true } else { return false }
    }
  },
  created() {
    this.getMerchant()
    this.getBigProduct()
    this.getList()
  },
  methods: {
    getBigProduct() {
      fetchLevel('Big').then(response => {
        this.bigList = response.data.productList
      })
    },
    getMerchant() {
      merchantList(store.getters.token).then(response => {
        this.merchantList = response.data.list
        this.merchantNum = response.data.length
      })
    },
    changeEvent1() {
      for (const i of this.merchantList) {
        if (i.ownerName === this.temp.merchantName) {
          this.temp.businessCode = i.businessCode
          this.temp.uniqueCode = i.uniqueCode
        }
      }
    },
    changeEvent2() {
      for (const i of this.merchantList) {
        if (i.businessCode === this.temp.businessCode) {
          this.temp.merchantName = i.ownerName
          this.temp.uniqueCode = i.uniqueCode
        }
      }
    },
    changeEvent3() {
      for (const i of this.merchantList) {
        if (i.uniqueCode === this.temp.uniqueCode) {
          this.temp.merchantName = i.ownerName
          this.temp.businessCode = i.businessCode
        }
      }
    },
    changeParentCode() {
      for (const i of this.bigList) {
        if (i.productCode === this.temp.productDaleiCode) {
          this.temp.productDaleiName = i.productName
          fetchList(i.productId).then(response => {
            this.middleList = response.data.productList
          })
        }
      }
    },
    changeParentName() {
      for (const i of this.bigList) {
        if (i.productName === this.temp.productDaleiName) {
          this.temp.productDaleiCode = i.productCode
          fetchList(i.productId).then(response => {
            this.middleList = response.data.productList
          })
        }
      }
    },
    changeChildCode() {
      for (const i of this.middleList) {
        if (i.productCode === this.temp.productZhongleiCode) {
          this.temp.productZhongleiName = i.productName
        }
      }
    },
    changeChildName() {
      for (const i of this.middleList) {
        if (i.productName === this.temp.productZhongleiName) {
          this.temp.productZhongleiCode = i.productCode
        }
      }
    },
    filter1() {
      for (const i of this.merchantList) {
        if (i.ownerName === this.query.merchantName) {
          this.query.businessCode = i.businessCode
          this.query.uniqueCode = i.uniqueCode
        }
      }
    },
    filter2() {
      for (const i of this.merchantList) {
        if (i.businessCode === this.query.businessCode) {
          this.query.merchantName = i.ownerName
          this.query.uniqueCode = i.uniqueCode
        }
      }
    },
    filter3() {
      for (const i of this.merchantList) {
        if (i.uniqueCode === this.query.uniqueCode) {
          this.query.merchantName = i.ownerName
          this.query.businessCode = i.businessCode
        }
      }
    },
    findMiddleList() {
      for (const i of this.bigList) {
        if (i.productName === this.query.productDaleiName) {
          fetchList(i.productId).then(response => {
            this.middleList = response.data.productList
          })
        }
      }
    },
    // 没做
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    handlePlentyDelete() {
      let data = []
      for (const i of this.multipleSelection) {
        data.push(i.saleRecordId)
      }
      console.log(data)
      deleteSaleRecord(data).then(response => {
        this.$message({
          showClose: true,
          message: '批量删除成功',
          type: 'success',
          duration: 1500
        })
        this.getList()
      })
    },
    clearTemp() {
      this.temp = {
        merchantName: store.getters.ownerName,
        businessCode: store.getters.businessCode,
        uniqueCode: store.getters.uniqueCode,
        periodYear: '',
        periodMonth: '',
        periodDays: '',
        brand: '',
        region: '',
        productDaleiCode: '',
        productDaleiName: '',
        productDaleiSales: null,
        productZhongleiCode: '',
        productZhongleiName: '',
        productZhongleiSalePrice: null,
        productZhongleiSaleNumber: null,
        representationNumber: '',
        currentPrice: null,
        currentSales: null,
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        note: ''
      }
    },
    handleCreate() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          // console.log(this.temp)
          addSaleRecord(this.temp).then(() => {
            this.getList()
            this.dialogVisible = false
            if (this.isKeep === false) { this.clearTemp() }
            this.$message({
              showClose: true,
              message: '内销数据提交成功',
              type: 'success',
              duration: 1500
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getList() {
      this.listLoading = true
      getAllSaleRecord(this.queryAll).then(response => {
        this.list = response.data.list
        this.totalAll = response.data.length
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listLoading = true
      filterSaleRecord(this.query).then(response => {
        this.total = response.data.list.length
        this.list = response.data.list
        this.totalAll = 0
        this.listLoading = false
      })
    },
    handleDelete(row, index) {
      const data = [].concat(row.saleRecordId)
      deleteSaleRecord(data).then(response => {
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success',
          duration: 1500
        })
        this.list.splice(index, 1)
      })
    }
  }

}
</script>

<style lang="scss">
  .el-table thead.is-group th {
    background: #adc3cee3;
  }

  .el-table thead {
    color: #ffffff;
  }

</style>

<style lang="scss" scoped>
  .select {
    width: 100%;
    margin: 0 auto;
    font-size: 14px;
  }

  .selectItem {
    margin: 5px 10px;
    width: 15%
  }
</style>
