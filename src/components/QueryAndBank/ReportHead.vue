<template>
  <div class="nb-report-head">
    <nav-bar :title="pageTitle"></nav-bar>
    <div class="report-head-list flex-between">
      <div class="head-time flex-center">{{listHead[0]}}</div>
      <div class="head-order flex-center">{{listHead[1]}}</div>
      <div class="head-money flex-center">{{listHead[2]}}</div>
      <div class="head-result flex-center">{{listHead[3]}}</div>
    </div>
  </div>
</template>

<script>
import { queryDefault } from '@/utils/queryUtils';
import NavBar from '@/components/common/NavBar';

export default {
  inheritAttrs: false,
  name: 'ReportHead',
  data() {
    return {
      pageTitle: '',
      listHead: [],
    };
  },
  components: {
    NavBar,
  },
  methods: {
    getPageTitle(type) {
      const list = {
        1: this.$t('pageQuery.deposit'),
        2: this.$t('pageQuery.deposit'),
        3: this.$t('pageQuery.deposit'),
        4: this.$t('pageQuery.withdraw'),
        5: this.$t('pageQuery.washCode'),
        6: this.$t('pageQuery.betting'),
      };
      this.pageTitle = list[type];
    },
    getListHead(type) {
      const headObj = {
        1: [this.$t('pageQuery.time'), this.$t('pageQuery.depSlip'), this.$t('pageQuery.money'), this.$t('pageQuery.status')],
        2: [this.$t('pageQuery.time'), this.$t('pageQuery.depSlip'), this.$t('pageQuery.money'), this.$t('pageQuery.status')],
        3: [this.$t('pageQuery.time'), this.$t('pageQuery.depSlip'), this.$t('pageQuery.money'), this.$t('pageQuery.status')],
        4: [this.$t('pageQuery.time'), this.$t('pageQuery.withSlip'), this.$t('pageQuery.money'), this.$t('pageQuery.status')],
        5: [this.$t('pageQuery.time'), this.$t('pageQuery.washSlip'), this.$t('pageQuery.money'), this.$t('pageQuery.status')],
        6: [this.$t('pageQuery.time'), this.$t('pageQuery.nameSlip'), this.$t('pageQuery.betMoney'), this.$t('pageQuery.rtnMoney')],
      };
      this.listHead = headObj[type];
    },
  },
  mounted() {
    const dt = queryDefault();
    this.getPageTitle(dt.type);
    this.getListHead(dt.type);
  },
};
</script>

<style lang="less">
.white .nb-report-head {
  background: #FFF;
  .history-head-title {
    color: #2E2F34;
  }
  .report-head-list {
    border-top: .01rem solid #EBE9E9;
    background: linear-gradient(to bottom, #F9F9F9, #FFFFFF);
    .head-time, .head-order, .head-money, .head-result {
      color: #6b6b6b;
    }
  }
}
.black .nb-report-head {
  background: #28272d;
  .history-head-title {
    color: #FFF;
  }
  .report-head-list {
    background: linear-gradient(to bottom, #2a292f, #29292e);
    .head-time, .head-order, .head-money, .head-result {
      color: #6b6b6b;
    }
  }
}
.nb-report-head {
  width: 3.75rem;
  .history-head-box {
    width: 3.75rem;
    height: .45rem;
    position: relative;
    .history-head-back {
      width: .45rem;
      height: .45rem;
    }
    .history-head-title {
      width: 100%;
      height: .45rem;
      font-size: .18rem;
    }
  }
  .report-head-list {
    width: 100%;
    height: .44rem;
    .head-time, .head-order, .head-money, .head-result {
      height: 100%;
      font-size: .14rem;
    }
    .head-time {
      width: .69rem;
    }
    .head-order {
      width: 1.41rem;
    }
    .head-money {
      width: .83rem;
    }
    .head-result {
      width: .82rem;
    }
  }
}
</style>
