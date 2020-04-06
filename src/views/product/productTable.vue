<template>
  <div>
    <el-card  class="addItem">
      <el-input v-model="name" placeholder="请输入产品名称" style="width: 30%" @keyup.enter.native="handleFilter"/>
      <el-button type="primary" icon="el-icon-search" @click="handleFilter" >搜索产品</el-button>
      <el-button type="primary" v-if="role === 'admin'" icon="el-icon-edit" @click="dialogVisible = true">添加产品</el-button>
    </el-card>

    <el-dialog
      title="输入产品信息"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="82px" style="width: 400px;">
        <el-form-item label="产品代码" prop="productCode">
          <el-input v-model="temp.productCode" placeholder="请输入产品代码" style="width: 80%" />
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="temp.productName" placeholder="请输入产品名称" style="width: 80%" />
        </el-form-item>
        <el-form-item label="类别等级" prop="typeLevel">
          <el-radio v-model="temp.typeLevel" label="Big" style="margin-left: 30px; margin-right: 40px">Big</el-radio>
          <el-radio v-model="temp.typeLevel" label="Middle">Middle</el-radio>
        </el-form-item>
        <el-form-item label="所属大类" prop="parentId">
          <el-select v-model="temp.parentId" placeholder="请选择所属产品大类" style="width: 80%">
            <el-option
              v-for="item in bigList"
              :key="item.productId"
              :label="item.productName"
              :value="item.productId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreate">确 定</el-button>
      </span>
    </el-dialog>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      max-height="800px"
      border
      fit
      highlight-current-row
      style="width: 70%;margin-left: 20px;"
      :header-cell-style="{background:'rgb(215, 227, 247)',color:'#606266'}"
    >
      <el-table-column label="产品代码" style="width: 80%;" align="center">
        <template slot-scope="{row}">
          <span>{{ row.productCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品所属大类" style="width: 25%;" align="center">
        <template slot-scope="{row}">
          <span>{{ row.parentName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品类别等级" style="width: 20%;" align="center">
        <template slot-scope="{row}">
          <span>{{ row.typeLevel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" style="width: 25%;" align="center">
        <template slot-scope="{row}">
          <span>{{ row.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" style="width: 15%;" align="center" v-if="role === 'admin'">
        <template slot-scope="{row}">
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import store from '@/store'
import { addProduct, fetchLevel, fetchList, fetchDetail, deleteProduct } from '@/api/product'
export default {
  name: 'ProductTable',
  data() {
    return {
      role: store.getters.roles,
      name: '',
      find: 0,
      tableKey: 0,
      listLoading: true,
      dialogVisible: false,
      bigList: [],
      list: [],
      temp: {
        productCode: '',
        productName: '',
        typeLevel: '',
        parentId: null
      },
      rules: {
        productCode: [{ required: true, message: 'productCode is required', trigger: 'blur' }],
        productName: [{ required: true, message: 'productName is required', trigger: 'blur' }],
        typeLevel: [{ required: true, message: 'typeLevel is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleCreate() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          // console.log(this.temp)
          addProduct(this.temp).then(() => {
            this.getList()
            this.dialogVisible = false
            this.resetTemp()
            this.$message({
              showClose: true,
              message: '产品信息提交成功',
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
      this.list = []
      fetchLevel('Big').then(response => {
        this.bigList = response.data.productList
        // 取biglist
        for (const i of this.bigList) {
          // i为big类型的数组对象
          fetchList(i.productId).then(response => {
            const t = response.data.productList
            // t为i门下的所有中类
            fetchDetail(i.productId).then(response => {
              for (const m of t) {
                // m为所有中类中的一员，添加i的名字
                m['parentName'] = response.data.productName
              }
              this.list = this.list.concat(i, t)
            })
          })
        }
        this.listLoading = false
      })
    },
    handleDelete(row) {
      deleteProduct(row).then(response => {
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success',
          duration: 1500
        })
        this.getList()
      })
    },
    resetTemp() {
      this.temp = {
        productCode: '',
        productName: '',
        typeLevel: '',
        parentId: null
      }
    },
    handleFilter() {
      for (const i of this.list) {
        if (i.productName === this.name) {
          this.find = 1
          const id = i['productId']
          fetchDetail(id).then(response => {
            const res = response.data
            if (res.daleiId != null) {
              fetchDetail(res.daleiId).then(response => {
                res['parentName'] = response.data.productName
                // this.list = this.list.concat(res)
                this.list = [].concat(res)
              })
            } else {
              this.list = [].concat(res)
            }
          })
        }
      }
      if (this.find === 0) {
        this.$message({
          showClose: true,
          message: '请输入正确产品名称',
          type: 'error',
          duration: 1500
        })
      }
      if (this.find === 1 && this.name === '') {
        this.getList()
        this.find = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .addItem {
    width: 100%;
    margin: 0 auto;
    display:inline-block;
  }
</style>

