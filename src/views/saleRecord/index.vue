<template>
  <div>
    <el-card class="selectItem">
      商户经营者:<el-input style="width: 5%" v-model="input.mo"></el-input>
    </el-card>

    <el-table
      :data="tableData"
      stripe
      @selection-change="handleSelectionChange"
      style="width: 100%;margin:0 auto"
      max-height="800">
      <el-table-column
        fixed
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="录入用户"
        width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="期数(年月旬)"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="商户经营者"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="商企代码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="唯一编码"
        width="120">
      </el-table-column>
      <el-table-column label="产品大类">
        <el-table-column
          prop=""
          label="代码"
          width="120">
        </el-table-column>
        <el-table-column
          prop=""
          label="名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop=""
          label="本旬销售额(万元)"
          width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column label="产品中类">
      <el-table-column
        prop=""
        label="代码"
        width="120">
      </el-table-column>
      <el-table-column
        prop=""
        label="名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop=""
        label="本旬销售额(万元)"
        width="120">
      </el-table-column>
      <el-table-column
        prop=""
        label="本旬销量"
        width="120">
      </el-table-column>
    </el-table-column>
      <el-table-column label="规格代表品">
        <el-table-column
          prop=""
          label="代码"
          width="120">
        </el-table-column>
        <el-table-column
          prop=""
          label="货号"
          width="120">
        </el-table-column>
        <el-table-column
          prop=""
          label="本旬价格"
          width="120">
        </el-table-column>
        <el-table-column
          prop=""
          label="本旬销量"
          width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop=""
        label="A主材质面料"
        width="120">
      </el-table-column>
      <el-table-column
        prop=""
        label="B面料类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop=""
        label="C领型"
        width="120">
      </el-table-column>
      <el-table-column
        prop=""
        label="D下摆"
        width="120">
      </el-table-column>
      <el-table-column
        prop=""
        label="E门襟"
        width="120">
      </el-table-column>
      <el-table-column
        prop=""
        label="F款式细节"
        width="120">
      </el-table-column>
      <el-table-column
        prop=""
        label="备注"
        width="120">
      </el-table-column>
      <el-table-column
        prop=""
        label="录入日期"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'SaleRecord',
  data() {
    return {
      multipleSelection: [],
      input: {
        mo: ''
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
  .selectItem {
    width: 100%;
    margin: 0 auto;
    font-size: 14px;
  }
</style>
