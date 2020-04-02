<template>
  <!--<div class="product-container">-->
    <!--<el-form ref="productForm" :model="productForm" :rules="productRules" class="product-form" auto-complete="on" label-position="left" >-->

      <!--<div class="title-container">-->
        <!--<h3 class="title">产品信息录入</h3>-->
      <!--</div>-->

      <!--<el-form-item prop="ownerName">-->
        <!--<span class="svg-container">-->
          <!--<svg-icon icon-class="user" />-->
        <!--</span>-->
        <!--<el-input-->
          <!--ref="ownerName"-->
          <!--v-model="merchantForm.ownerName"-->
          <!--placeholder="企业经营者"-->
          <!--name="ownerName"-->
          <!--type="text"-->
          <!--tabindex="1"-->
          <!--auto-complete="on"-->
        <!--/>-->
      <!--</el-form-item>-->

      <!--<el-form-item prop="businessCode">-->
        <!--<span class="svg-container">-->
          <!--<svg-icon icon-class="code" />-->
        <!--</span>-->
        <!--<el-input-->
          <!--ref="businessCode"-->
          <!--v-model="merchantForm.businessCode"-->
          <!--type="text"-->
          <!--placeholder="企业代码"-->
          <!--name="businessCode"-->
          <!--tabindex="2"-->
          <!--auto-complete="on"-->
        <!--/>-->
      <!--</el-form-item>-->

      <!--<el-form-item prop="uniqueCode">-->
        <!--<span class="svg-container">-->
          <!--<svg-icon icon-class="code" />-->
        <!--</span>-->
        <!--<el-input-->
          <!--ref="uniqueCode"-->
          <!--v-model="merchantForm.uniqueCode"-->
          <!--type="text"-->
          <!--placeholder="唯一编码"-->
          <!--name="uniqueCode"-->
          <!--tabindex="2"-->
          <!--auto-complete="on"-->
          <!--@keyup.enter.native="handleMerchant"-->
        <!--/>-->
      <!--</el-form-item>-->

      <!--<el-button :loading="loading" type="primary" style="width:25%;margin-bottom:30px;margin-left:15px;margin-top: 10px;" @click.native.prevent="handleMerchant">提交</el-button>-->

      <!--<div class="tips">-->
        <!--<span style="margin-right:20px;">请注意：企业代码与唯一编码不可与他人一致。每个用户只能提交一次商户信息。</span>-->
      <!--</div>-->

    <!--</el-form>-->
  <!--</div>-->
</template>

<script>
  export default {
    name: 'ProductAdd'
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $dark_gray:#3c4950;
  $light_gray:#778992;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .register-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .merchant-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        border: 0px;
        -webkit-appearance: none;
        border-radius: 4px;
        padding: 12px 5px 12px 15px;
        color: $dark_gray;
        height: 47px;
        caret-color: $dark_gray;
        border: 1px solid #DCDFE6;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      /*background: rgba(0, 0, 0, 0.1);*/
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#3c4950;
  $light_gray:#778992;

  .merchant-container {
    min-height: 100%;
    width: 100%;
    /*background-color: $bg;*/
    overflow: hidden;

    .merchant-form {
      position: relative;
      width: 570px;
      max-width: 100%;
      padding: 40px 20px 0;
      margin-left: 0px;
      margin-top: 0px;
      overflow: hidden;
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 22px;
        color: $dark_gray;
        margin: 0px 0px 40px 15px;
        text-align: left;
        font-weight: bold;
      }
    }

    .tips {
      font-size: 14px;
      color: $dark_gray;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
  }
</style>

