<template>
   <div>
      <el-table :row-class-name="rowClassName" :border="border" :data="tableData"
         @sort-change="orderMethod" :show-header="showHeader" :height="height">
         <template v-for="(item) in columns">
            <template v-if="item.render">
               <el-table-column v-if="item.renderHeader"
                  :prop="item.key"
                  :sortable="item.sortable?item.sortable:false"
                  :key="item.key" :align="item.align"
                  :width="item.width"
                  :render-header="item.renderHeader"
                  :class-name="item.className">
                  <template slot-scope="params">
                     <v-slot :render="item.render" :column="item" :row="params.row" :index="params.$index"></v-slot>
                  </template>
               </el-table-column>

               <el-table-column v-else
                  :prop="item.key"
                  :label="item.title"
                  :sortable="item.sortable?item.sortable:false"
                  :key="item.key"
                  :align="item.align"
                  :width="item.width"
                  :class-name="item.className">
                  <template slot-scope="params">
                     <v-slot :render="item.render" :column="item" :row="params.row" :index="params.$index"></v-slot>
                  </template>
               </el-table-column>
            </template>

            <el-table-column v-else
               :prop="item.key"
               :label="item.title"
               :key="item.key"
               :sortable="item.sortable?item.sortable:false"
               :align="item.align"
               :width="item.width"
               :render-header="item.renderHeader"
               :class-name="item.className"
               show-overflow-tooltip>
            </el-table-column>
         </template>
      </el-table>
      <div v-if="showPagination" style="margin-top: 20px;text-align: right;">
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
         </el-pagination>
      </div>
   </div>

</template>
<script>
import vSlot from './SlotRender';

export default {
   props: {
      border: {
         type: Boolean,
         default: false
      },
      columns: {
         type: Array
      },
      tableData: {
         type: Array
      },
      rowClassName: {
         type: Function
      },
      showHeader: {
         type: Boolean,
         default: true
      },
      height: String,
      pageIndex: {
         type: Number,
         default: 1
      },
      pageSizes: {
         type: Array,
         default: () => [10, 20, 30, 40, 50]
      },
      pageSize: {
         type: Number,
         default: 10
      },
      total: {
         type: Number,
         default: 1
      },
      showPagination: {
         type: Boolean,
         default: true
      }
   },
   data() {
      return {}
   },
   components: { vSlot },
   methods: {
      orderMethod: function (params) {
         let order = params.column.order || ''
         let column = {
            order: order.replace('ending', ''),
            key: params.column.property
         }
         this.$emit('orderMethod', column)
      },
      handleSizeChange(val) {
        this.$emit('update:pageSize', val) // 用于支持.sync修饰符
        this.$emit('pageSizeChange', val)
      },
      handleCurrentChange(val) {
        this.$emit('update:pageIndex', val)
        this.$emit('pageChange', val)
      }
   }
}
</script>
