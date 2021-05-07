// MySQL
<template>
   <el-card>
      <div slot="header">
         <span>集群列表</span>
         <el-button style="float: right;" type="primary" size="mini" @click="visible = true">创建集群</el-button>
      </div>
      <Table :columns="columns" :tableData="tableData" :pageIndex.sync="currentPage" :pageSize.sync="pageSize"
         :total="total" @pageSizeChange="pageSizeChange" @pageChange="pageChange"></Table>

      <Dialog title="创建集群" :visible.sync="visible">
         <div class="cluster-dialog">
            <el-form label-width="100px">
               <div class="info basic-info">
                  <div class="info--header">
                     <span></span><span>基础信息</span>
                  </div>
                  <div>
                     <el-form-item label="集群名称：" prop="">
                        <el-input placeholder="请输入"></el-input>
                     </el-form-item>
                     <el-form-item label="描述：" prop="">
                        <el-input type="textarea" placeholder="请输入"></el-input>
                     </el-form-item>
                     <el-form-item label="集群类型：" prop="">
                        <el-select value="" style="width:100%;">
                           <el-option v-for="option in [1,2,3]" :key="option" :label="option" :value="option">
                           </el-option>
                        </el-select>
                     </el-form-item>
                     <el-form-item label="主机IP：" prop="">
                        <el-select value="" style="width:100%;">
                           <el-option v-for="option in [1,2,3]" :key="option" :label="option" :value="option">
                           </el-option>
                        </el-select>
                     </el-form-item>
                     <el-form-item label="备机IP：" prop="">
                        <el-select value="" style="width:100%;">
                           <el-option v-for="option in [1,2,3]" :key="option" :label="option" :value="option">
                           </el-option>
                        </el-select>
                     </el-form-item>
                  </div>
               </div>
               <ConfigParams :versions="[1,2,3]"></ConfigParams>
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
               render: (h) => {
                  return (
                     <div>
                        <el-button type="text" onClick={
                           () => {
                              this.$router.push({
                                 path: '/mysql/detail'
                              })
                           }
                        }>详情</el-button>
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
         visible: false
      }
   },

   components: {
      ConfigParams: () => import('../Components/ConfigParams')
   },

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
.cluster-dialog {
   box-sizing: border-box;
   padding: 0 20px 0 10px;
}
</style>
