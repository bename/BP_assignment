<template>
  <div class="activity_div">
    <div class="line_spacer"></div>
    <div class="tile_container">
      <div style="display: flex">
      <div
        v-bind:class="{'camouflage_color': tile_data.topic_data.name == 'camouflage'}"
        class="img_div">
        <img class="img_avatar" :src="getImgUrl(tile_data.topic_data.name)" />
      </div>
        <div class="title_div">
          <span><b>{{tile_data.topic_data.name}} {{tile_data.resource_type}}</b></span><br>
          <span class="date_text">{{get_time_by_epoch(tile_data.d_created)}}</span>
        </div>
      </div>
      <div class="score_div">
        <span v-if="activities_settings[tile_data.resource_type].score">
          Score <b>{{tile_data.score}}/{{tile_data.possible_score}} </b>
        </span><br>
        <span
          v-if="activities_settings[tile_data.resource_type].zoom"
          @click="open_popup"
          style="cursor: pointer; text-indent: 5px; margin-left: 5px;">  <b>View work</b>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// import { commonMixin } from '../mixins/commonMixin.js';

export default {
  name: 'ActivityTile',
  props: {
    tile_data: Object,
  },
  data: () => ({
    table_data: {},
    test: '../assets/topics/dogs.png',
    activities_settings: {
      movie: { score: false, zoom: false },
      quiz: { score: true, zoom: true },
      easy_quiz: { score: true, zoom: true },
      challenge: { score: true, zoom: true },
      make_a_map: { score: false, zoom: true },
      make_a_movie: { score: false, zoom: true },
      word_play: { score: false, zoom: true },
      related_reading: { score: false, zoom: false },
      draw_about_it: { score: false, zoom: true },
    },
  }),
  beforeMount() {
  },
  methods: {
    open_popup() {
      this.$emit('open_popup');
    },

    get_time_by_epoch(epoch) {
      /* eslint-disable prefer-template */
      const a = new Date(parseInt(epoch, 10) * 1000);
      const months = ['Jun', 'Feb', 'Mer', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const year = a.getFullYear();
      const month = months[a.getMonth()];
      const date = a.getDate();
      const hour = a.getHours();
      const min = a.getMinutes();
      const amPm = parseInt(hour, 10) < 12 ? 'AM' : 'PM';
      const hourFormated = parseInt(hour, 10) % 12;
      const time = month + ' ' + date + ', ' + year + '·' + hourFormated + ':' + min + ' ' + amPm;
      /* eslint-enable prefer-template */
      return time;
    },

    // should be generic i had problems with ESLint
    getImgUrl(path) {
      /* eslint-disable global-require */
      /* eslint-disable prefer-template */
      /* eslint-disable import/no-dynamic-require */
      /* eslint-disable no-useless-concat */
      switch (path) {
        case 'dogs':
          return require('../assets/topics/dogs.png');
        case 'cells':
          return require('../assets/topics/cells.png');
        case 'camouflage':
          return require('../assets/topics/camouflage.png');
        case 'ada lovelace':
          return require('../assets/topics/adalovelace.png');
        case 'dna':
          return require('../assets/topics/dna.png');
        default:
          return require('../assets/topics/dogs.png');
      }
      /* eslint-enable no-useless-concat */
      /* eslint-enable import/no-dynamic-require */
      /* eslint-enable prefer-template */
      /* eslint-enable global-require */
    },
    parse_path() {
      return '../assets/topics/dogs.png';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .camouflage_color{
    background: rgb(255,165,0, 0.8) !important;
  }

  .img_avatar{
    margin-top: 5px;
    width: 30px;
    height: 30px;
  }

  .score_div{
    color: teal;
    font-size: 12px;
    right: 0;
    padding: 17px 0 0 0;
    display: inline-flex;
  }

  .date_text{
    opacity: 0.9;
    font-size: 11px;
  }

  .img_div{
    text-align: center;
    background: darkturquoise;
    border-radius: 40px;
    width: 40px;
    height: 40px;
  }

  .title_div{
    font-size: 14px;
    margin-left: 10px;
    height: 40px;
  }

  .line_spacer{
    background: lightgray;
    width: 1px;
    height: 12px;
    margin-left: 5%;
  }

  .tile_container{
    justify-content: space-between;
    padding: 13px 12px 20px 12px;
    display: flex;
    width: 100%;
    border: rgba(0, 0, 0, .2) 1px solid;
    border-radius: 3px;
  }
</style>
