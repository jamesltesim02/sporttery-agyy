import Vue from 'vue';
import VueTouch from 'vue-touch';
import Vue2Toast from 'vue2-toast';

import 'vue2-toast/lib/toast.css';
import 'swiper/dist/css/swiper.css';

import CommonRegistion from './plugins/CommonRegistion';
import AppInitial from './plugins/AppInitial';
import { initI18n } from './utils/I18nUtil';

import App from './App.vue';
import router from './router';
import store from './store';
import Wave from './plugins/Wave';

import './assets/styles/reset.css';
import './assets/styles/common.less';

import './registerServiceWorker';

Vue.config.productionTip = false;

// vue-touch 触摸事件
Vue.use(VueTouch, { name: 'v-touch' });
// 项目中的公共组件及过滤器注册
Vue.use(CommonRegistion);
// vue-toast 弹窗
Vue.use(Vue2Toast, {
  type: 'center',
  duration: 2500,
  wordWrap: true,
});
// App 初始化动作
Vue.use(AppInitial);
// 点击效果指令
Vue.directive('wave', Wave);

const start = async () => {
  new Vue({ // eslint-disable-line no-new
    el: '#app',
    i18n: await initI18n(),
    router,
    store,
    render: h => h(App),
  });
};

// 开始渲染页面
start();
