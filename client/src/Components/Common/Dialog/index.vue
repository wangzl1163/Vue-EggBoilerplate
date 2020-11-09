<template>
   <div>
      <el-dialog
         :id="id"
         :title="title"
         :append-to-body="true"
         :width="width"
         :visible="visible"
         :close-on-click-modal="maskCloseable"
         :show-close="showClose"
         @close="cancel"
         @open="open">
         <template slot="title">
            <slot name="title"></slot>
         </template>

         <slot></slot>

         <template slot="footer" v-if="footerOn">
            <slot name="footer"></slot>
         </template>
         <template slot="footer" v-else>
            <el-button v-if="showCancel" @click="cancel">{{cancelText}}</el-button>
            <el-button type="primary" @click="confirm">{{confirmText}}</el-button>
         </template>
      </el-dialog>
   </div>
</template>
<script>
export default {
   props: {
      id: {
         type: String,
         default: Date.now().toString()
      },
      visible: {
         type: Boolean
      },
      title: {
         type: String
      },
      confirmText: {
         type: String,
         default: '确定'
      },
      cancelText: {
         type: String,
         default: '取消'
      },
      footerOn: {
         type: Boolean,
         default: false
      },
      width: {
         type: String,
         default: '550px'
      },
      maskCloseable: {
         type: Boolean,
         default: false
      },
      showClose: {
         type: Boolean,
         default: true
      },
      showCancel: {
         type: Boolean,
         default: true
      }
   },
   data() {
      return {}
   },
   methods: {
      confirm() {
         this.$emit('update:visible', false)
         this.$emit('confirm')
      },
      cancel() {
         this.$emit('update:visible', false)
         this.$emit('cancel')
      },
      open() {
         this.$emit('open')
      }
   }
}
</script>

<style lang="less">
.el-dialog {
   border-radius: 6px;
}
.el-dialog__body {
   padding-top: 16px;
   padding-bottom: 16px;
}

@border: 1px solid #e8eaec;
.el-dialog__header {
   border-bottom: @border;
   background-color: #f7f7f7;
}

.el-dialog__footer {
   padding-bottom: 10px;
   border-top: @border;
}

.el-dialog__headerbtn .el-dialog__close {
   font-size: 16px;
}
</style>
