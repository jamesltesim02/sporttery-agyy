<template>
  <sign-page
    class="login-page"
    :title="$t('page.memberLoginTitle')"
  >
    <section>
      <username-field
        v-model="account"
        :placeholder="$t(`${isLite?'pagelite' : 'page'}.accountHolder`)"
        @keypress="enter"
      />
      <password-field
        v-model="password"
        :placeholder="$t(`${isLite?'pagelite' : 'page'}.passwordHolder`)"
        @keypress="enter"
      />
      <captcha-field
        ref="captchaField"
        v-if="this.loginErrorCount >= 3"
        v-model="captcha"
        @keydown="enter"
        @keypress="enter"
      />
      <submit
        :label="$t('page.loginSubmitLabel')"
        @submit="doLogin"
      />
    </section>
    <login-register-toggle
      to="/register"
      :label="$t('page.toggleRegister')"
    />
  </sign-page>
</template>
<script>
import md5 from 'md5';
import { mapState, mapMutations, mapActions } from 'vuex';
import { AppModes, StorageKey, PortalAgyyConfig } from '@/config/constants';
import { loadFromStorage, saveToStorage } from '@/utils/StorageUtil';
import { login } from '@/api/casino';
import { agLogin, transferToGame } from '@/api/portalAgyy';
import SignPage from '@/components/Sign/SignPage';
import UsernameField from '@/components/Sign/UsernameField';
import PasswordField from '@/components/Sign/PasswordField';
import CaptchaField from '@/components/Sign/CaptchaField';
import Submit from '@/components/Sign/Submit';
import LoginRegisterToggle from '@/components/Sign/LoginRegisterToggle';

const { APP_MODE } = window.NBConfig;

export default {
  data() {
    const account = localStorage.getItem(StorageKey.LAST_LOGIN_USERNAME_KEY) || '';
    return {
      // account: 'agip188123',
      // password: '123123aa',
      account,
      password: '',
      captcha: '',
      isLite: APP_MODE === AppModes.STANDALONE_LITE,
      loginErrorCount: loadFromStorage(StorageKey.LOGIN_ERROR_TIMES_KEY, 0),
    };
  },
  computed: {
    ...mapState('app', ['lastLocation']),
  },
  watch: {
    loginErrorCount(n) {
      saveToStorage(StorageKey.LOGIN_ERROR_TIMES_KEY, n);
    },
    account(n) {
      if (n) {
        this.account = n.replace(/(^\s+)|(\s+$)/gi, '');
      }
    },
  },
  components: {
    SignPage,
    UsernameField,
    PasswordField,
    CaptchaField,
    Submit,
    LoginRegisterToggle,
  },
  methods: {
    ...mapMutations('app', ['setUserinfo']),
    ...mapActions('app', ['reloadBalance']),
    enter(e) {
      const { keyCode } = e;
      if (keyCode === 13) {
        this.doLogin();
      }
    },
    doLogin() {
      if (this.isLite) {
        return this.doLoginLite();
      }

      return this.doLoginStand();
    },
    async doLoginStand() {
      if (!this.account) {
        this.$toast.center(this.$t('message.accountRequire'));
        return;
      }
      if (!this.password) {
        this.$toast.center(this.$t('message.passwordRequire'));
        return;
      }
      try {
        this.$loading(this.$t('message.logining'));
        const usreinfo = await login({
          account: this.account,
          password: md5(this.password),
          terminal: 1,
        });
        this.setUserinfo(usreinfo);
        if (
          this.lastLocation
          && this.lastLocation.path
          && !['/login', '/register'].includes(this.lastLocation.path)
        ) {
          this.$router.replace(this.lastLocation.path);
          return;
        }
        this.$router.replace('/');
      } catch ({ msg }) {
        this.$toast.center(msg || this.$t('message.defaultErrorMsg'));
      } finally {
        this.$loading.close();
      }
    },
    async doLoginLite() {
      const {
        internetPhone,
        username,
        loginPassword,
        captcha,
      } = PortalAgyyConfig.REGEXIES;

      // 账号不能为空
      if (!this.account) {
        this.$toast.center(this.$t('message.accountRequire'));
        return;
      }
      // 网络运营商手机号码
      if (internetPhone.test(this.account)) {
        this.$toast.center(this.$t('message.internetPhone'));
        return;
      }
      // 账号不符合规范
      if (!username.test(this.account)) {
        this.$toast.center(this.$t('message.accountFail'));
        return;
      }

      // 密码不能为空
      if (!this.password) {
        this.$toast.center(this.$t('message.passwordRequire'));
        return;
      }

      // 密码长度
      const [
        PASS_MIN,
        PASS_MAX,
        passLen,
      ] = [
        8,
        10,
        this.password.length,
      ];
      if (passLen < PASS_MIN || passLen > 10) {
        this.$toast.center(this.$t(
          'message.passwordLength',
          {
            min: PASS_MIN,
            max: PASS_MAX,
          },
        ));
        return;
      }

      // 密码格式错误
      if (!loginPassword.test(this.password)) {
        this.$toast.center(this.$t('message.passwordFail'));
        return;
      }

      if (this.loginErrorCount >= 3) {
        // 验证码不能为空
        if (!this.captcha) {
          this.$toast.center(this.$t('message.captchaRequire'));
          return;
        }
        // 验证码格式不正确
        if (!captcha.test(this.captcha)) {
          this.$toast.center(this.$t('message.captchaStyle'));
          return;
        }
      }

      try {
        this.$loading(this.$t('message.logining'));

        // 登录
        const result = await agLogin({
          loginName: this.account,
          password: this.password,
          verification: this.captcha,
        });

        // 余额转至游戏中
        const transferResult = await transferToGame();

        // 刷新余额
        this.reloadBalance();

        this.$toast.center(this.$t('message.loginSuccess'));
        this.setUserinfo({
          ...result,
          balance: 0,
          token: transferResult.token,
          memberAccount: result.loginName,
          memberLevel: result.userLevel,
        });
        this.loginErrorCount = 0;

        // 保存最后一次登录账号名
        localStorage.setItem(StorageKey.LAST_LOGIN_USERNAME_KEY, this.account);

        this.$nextTick(() => {
          if (
            this.lastLocation
            && this.lastLocation.path
            && !['/login', '/register'].includes(this.lastLocation.path)
          ) {
            this.$router.replace(this.lastLocation.path);
            return;
          }
          this.$router.replace('/');
        });
      } catch ({ msg, code }) {
        if (code === 9611) {
          this.loginErrorCount = 4;
        }
        if (code === 9612) {
          this.loginErrorCount += 1;
        }
        if (![9611].includes(code) && this.loginErrorCount >= 3) {
          this.$nextTick(() => {
            this.$refs.captchaField.refresh();
          });
        }
      } finally {
        this.$loading.close();
      }
    },
  },
};
</script>
