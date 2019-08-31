import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/css/global.css'
import axios from 'axios'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import * as Quill from 'quill'
// import imageResize from 'quill-image-resize-module'
// Quill.register('modules/imageResize', imageResize)
Vue.use(VueQuillEditor, { 
  placeholder: '请输入内容'
})
Vue.use(Antd)
Vue.config.productionTip = false
Vue.prototype.axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
