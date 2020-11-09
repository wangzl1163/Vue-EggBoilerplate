<template>
   <div class="info config-info">
      <div class="info--header">
         <span></span><span>配置信息</span>
      </div>
      <div class="info--body">
         <el-form-item label="应用版本：" prop="">
            <el-select value="" style="width:100%;">
               <el-option v-for="option in versions" :key="option" :label="option" :value="option">
               </el-option>
            </el-select>
         </el-form-item>
         <div class="config-param">
            <div style="width:88px;text-align: right;margin-right: 12px;float: left;">配置参数：</div>
            <el-row style="width:calc(100% - 100px);margin-left: auto;">
               <el-col :span="12">
                  <el-form-item label-width="0" label="" prop="">
                     <el-select value="" style="width:100%;">
                        <el-option v-for="option in [1,2,3]" :key="option" :label="option" :value="option">
                        </el-option>
                     </el-select>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item label-width="10px" label="" prop="">
                     <el-select value="" style="width:100%;">
                        <el-option v-for="option in [1,2,3]" :key="option" :label="option" :value="option">
                        </el-option>
                     </el-select>
                  </el-form-item>
               </el-col>
            </el-row>
            <CirclePlus v-if="2" @click="addParams"></CirclePlus>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   props: ['versions'],
   data() {
      return {
      }
   },

   components: {},

   computed: {},

   methods: {
      addParams(){

      }
   },

}

</script>
<style lang='less'>
.info {
   .info--header {
      display: flex;
      align-items: center;
      height: 20px;
      & > span:first-of-type {
         display: inline-flex;
         margin-right: 6px;
         width: 4px;
         height: 12px;
         background-color: green;
      }

      & > span:last-of-type {
         display: inline-flex;
         color: green;
      }
   }

   .info--body {
      .config-param {
         position: relative;
      }
   }
}
</style>