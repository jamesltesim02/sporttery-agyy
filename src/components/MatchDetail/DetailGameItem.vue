<template>
  <div
    v-if="optionLength > 0"
    class="detail-game-item"
  >
    <v-touch
      class="game-item-title"
      @tap="$emit('update:expanded', !expanded)"
    >
      <game-name
        :sport-id="game.sportID"
        :group-type="game.groupType"
        :bet-stage="game.betStage"
        :game-type="game.gameType"
      />
      <icon-arrow
        class="expand-arrow"
        width=".08rem"
        height=".14rem"
        :direction="expanded ? 'up' : 'down'"
      />
    </v-touch>
    <expand-transition :expanded="expanded">
      <detail-options
        :game="game"
        :match="match"
      />
    </expand-transition>
  </div>
</template>
<script>
import IconArrow from '@/components/common/icons/IconArrow';
import GameName from '@/components/common/GameName';
import ExpandTransition from '@/components/common/ExpandTransition';

import DetailOptions from './DetailOptions';

export default {
  props: {
    expanded: {
      default: false,
    },
    game: {},
    match: {},
  },
  components: {
    IconArrow,
    GameName,
    ExpandTransition,
    DetailOptions,
  },
  computed: {
    optionLength() {
      const g = this.game;
      if (!Array.isArray(g.options[0])) {
        return g.options.length;
      }

      return g.options.reduce((acc, curr) => acc || curr.length, 0);
    },
  },
};
</script>
<style lang="less">
.detail-game-item {
  box-shadow: 0 10px 20px 0 rgba(236, 236, 236, 0.5);
  background-image: linear-gradient(to top, #f9f9f9, #ffffff);
  color: #909090;
  border-radius: 10px;
  margin-bottom: .1rem;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }
  .game-item-title {
    position: relative;
    line-height: .38rem;
    font-size: .14rem;
    padding-left: .1rem;
    .expand-arrow {
      position: absolute;
      right: .2rem;
      top: .13rem;
      path {
        fill: #909090;
      }
    }
  }
}
.black .detail-game-item {
  box-shadow: 0 10px 20px 0 rgba(37, 37, 37, 0.5);
  background-image: linear-gradient(to bottom, #3a393f, #333238);
  color: #bababa;
}
</style>
