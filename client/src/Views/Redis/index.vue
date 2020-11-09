// Redis
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
                     <el-form-item label="架构类型：" prop="">
                        <el-select value="" style="width:100%;">
                           <el-option v-for="option in [1,2,3]" :key="option" :label="option" :value="option">
                           </el-option>
                        </el-select>
                     </el-form-item>
                     <el-form-item label="节点类型：" prop="">
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
                     <el-form-item label="备机-1 IP：" prop="">
                        <el-select value="" style="width:100%;">
                           <el-option v-for="option in [1,2,3]" :key="option" :label="option" :value="option">
                           </el-option>
                        </el-select>
                     </el-form-item>
                     <el-form-item label="备机-2 IP：" prop="">
                        <el-select value="" style="width:100%;">
                           <el-option v-for="option in [1,2,3]" :key="option" :label="option" :value="option">
                           </el-option>
                        </el-select>
                     </el-form-item>
                     <el-form-item label="最大内存：" prop="">
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
               key: 'name',
               title: '名称'
            },
            {
               key: 'version',
               title: '版本'
            },
            {
               key: 'framework',
               title: '架构'
            },
            {
               key: 'maxMemory',
               title: '最大内存'
            },
            {
               key: 'nodeType',
               title: '几点类型'
            },
            {
               key: 'hostIP',
               title: '主机IP'
            },
            {
               key: 'userName',
               title: '用户名'
            },
            {
               key: 'password',
               title: '密码'
            },
            {
               key: 'createdTime',
               title: '创建时间'
            },
            {
               title: '操作',
               render: (h) => {
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
               name: 'Redis',
               version: '5.0',
               framework: '标准版',
               maxMemory: '512G',
               nodeType: '双副本',
               hostIP: '127.0.0.1',
               userName: 'root',
               password: '123456',
               createdTime: '2020年11月9日 10点43分'
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
