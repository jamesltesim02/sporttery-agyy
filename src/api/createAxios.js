import axios from 'axios';
import store from '@/store';
import appConfig from '@/config/business.config';
import { BusinessCodes } from '@/config/constants';
import { getLangValue } from '@/utils/I18nUtil';
import { getToken, logout } from '@/utils/UserinfoUtil';

export default (conf) => {
  const instance = axios.create(conf);

  instance.defaults.timeout = appConfig.apiTimeout;
  instance.defaults.headers.post['Content-Type'] = 'application/json;charse=UTF-8';

  // 请求拦截器,设置baseurl以及默认的语言参数
  instance.interceptors.request.use(
    (reqConf) => {
      if (!reqConf) {
        return null;
      }

      const config = { ...reqConf };
      const dataKey = {
        post: 'data',
        get: 'params',
      }[config.method];

      if (dataKey) {
        config[dataKey] = {
          lang: getLangValue(),
          frontId: store.state.app.frontId,
          token: getToken(),
          ...config[dataKey],
        };
      }

      return config;
    },
    (e) => {
      console.warn('request error');
      store.commit('app/toast', 'message.netError');
      return Promise.reject(e);
    },
  );

  // 添加响应拦截器
  instance.interceptors.response.use(
    ({ data }) => {
      // 系统维护
      if (BusinessCodes.SERVICE_ERROR_503 === data.code) {
        window.location = '/#/error/503';

      // 地域限制
      } else if (BusinessCodes.SERVICE_ERROR_403 === data.code) {
        window.location = '/#/error/403';
      } else if (/^(300|405)$/.test(data.code)) {
        // 重新登录
        store.commit('app/toast', { msg: 'message.logOuttime' });
        logout();
        return null;
      }
      return /^20[01]$/.test(data.code) ? data.data : Promise.reject(data);
    },
    (e) => {
      console.warn('network error.');
      store.commit('app/toast', 'message.netError');
      return Promise.reject(e);
    },
  );

  return instance;
};
