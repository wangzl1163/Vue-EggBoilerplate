// 主机
<template>
   <el-card>
      <div slot="header">
         <span>主机列表</span>
         <el-button style="float: right;" type="primary" size="mini" @click="visible = true">新建主机</el-button>
      </div>
      <Table :columns="columns" :tableData="tableData" :pageIndex.sync="currentPage" :pageSize.sync="pageSize"
         :total="total" @pageSizeChange="pageSizeChange" @pageChange="pageChange"></Table>

      <Dialog title="新建主机" width="700px" :visible.sync="visible">
         <div class="host-dialog">
            <el-form label-width="100px">
               <div class="info basic-info">
                  <div class="info--header">
                     <span></span><span>基础信息</span>
                  </div>
                  <div>
                     <el-form-item label="主机：" prop="">
                        <el-input placeholder="请输入"></el-input>
                     </el-form-item>
                     <el-form-item label="登录名：" prop="">
                        <el-input placeholder="请输入"></el-input>
                     </el-form-item>
                     <el-form-item label="密码：" prop="">
                        <el-input placeholder="请输入"></el-input>
                     </el-form-item>
                     <el-form-item label="可部署应用：" prop="">
                        <el-select value="" style="width:100%;">
                           <el-option v-for="option in [1,2,3]" :key="option" :label="option" :value="option">
                           </el-option>
                        </el-select>
                     </el-form-item>
                  </div>
               </div>
               <div class="info config-info">
                  <div class="info--header">
                     <span></span><span>配置信息</span>
                  </div>
                  <div>
                     <el-row>
                        <el-col :span="8">
                           <el-form-item label="cpu：" prop="">
                              <el-select value="" style="width:100%;">
                                 <el-option v-for="option in [1,2,3]" :key="option" :label="option" :value="option">
                                 </el-option>
                              </el-select>
                           </el-form-item>
                        </el-col>

                        <el-col :span="8">
                           <el-form-item label="内存：" prop="">
                              <el-select value="" style="width:100%;">
                                 <el-option v-for="option in [1,2,3]" :key="option" :label="option" :value="option">
                                 </el-option>
                              </el-select>
                           </el-form-item>
                        </el-col>
                        <el-col :span="8">
                           <el-form-item label="磁盘：" prop="">
                              <el-select value="" style="width:100%;">
                                 <el-option v-for="option in [1,2,3]" :key="option" :label="option" :value="option">
                                 </el-option>
                              </el-select>
                           </el-form-item>
                        </el-col>
                     </el-row>
                  </div>
               </div>
            </el-form>
         </div>
      </Dialog>
   </el-card>
</template>

<script>
export default {
   data() {
      return {
         columns: [
            {
               key: 'host',
               title: '主机'
            },
            {
               key: 'account',
               title: '账户名'
            },
            {
               key: 'password',
               title: '密码'
            },
            {
               key: 'cpu',
               title: 'cpu'
            },
            {
               key: 'core',
               title: '核数'
            },
            {
               key: 'memory',
               title: '内存'
            },
            {
               key: 'card',
               title: '磁盘'
            },
            {
               key: 'app',
               title: '可部署应用'
            },
            {
               key: 'deployedApp',
               title: '已部署应用'
            },
            {
               title: '操作',
               // render中的this是绑定的当前行组件的this，使用箭头函数来绑定页面组件的this
               render: (h, scope) => {
                  return (
                     <div>
                        <el-button type="text" onClick={
                           () => {
                              this.visible = true
                           }
                        }>编辑</el-button>
                        <el-button type="text">删除</el-button>
                     </div>
                  )
               },
            }
         ],
         tableData: [
            {
               host: '172.0.0.1',
               account: 'root',
               password: '123456',
               cpu: 'i7-7777HQ',
               core: '4核',
               memory: '8GB',
               card: '512GB',
               app: 'mysql',
               deployedApp: 'mysql'
            }
         ],
         currentPage: 1,
         total: 100,
         pageSize: 10,
         visible: false,
         currentRow: null
      }
   },

   components: {},

   computed: {},

   methods: {
      pageSizeChange(val) {
         console.log('----- page size val: ', val);
      },
      pageChange(val) {
         console.log('----- page : ', val);
      }
   }

}

</script>
<style lang='less' scoped>
.host-dialog {
}
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
}
</style>
