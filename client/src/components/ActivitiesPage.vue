<template>
  <div class="activities_container">
    <p style="font-size: 25px;"><b>Timeline</b></p>
    <FilterComponent
    @set_filter_btn="set_filter_btn"
    :types="activity_types">
    </FilterComponent>
    <div :key="index" v-for="(month_groups, index) in table_data">
      <div :key="month" v-for="(month_records, month) in month_groups">
        <div v-if="index != 0" class="line_spacer_top"></div>
        <div class="month_chip">{{month}}</div>
        <div :key="key" v-for="(tile, key) in month_records">
          <ActivityTile
            @open_popup="open_popup(tile)"
            v-if="filter_btn_state == 'All Work' || (tile.resource_type == filter_btn_state)"
            :tile_data="tile">
          </ActivityTile>
        </div>
      </div>
    </div>
    <div v-if="popup_state" class="popup">
      <div
        @click="popup_state = false"
        class="close_btn"
        >
        <span style="display: block; margin-top: 2px;">X</span>
      </div>
      <div class="title_block">
        <div
          v-bind:class="{'camouflage_color': selected_tile_data.topic_data.name == 'camouflage'}"
          class="img_div">
          <img class="img_avatar" :src="getImgUrl(selected_tile_data.topic_data.name)"/>
        </div>
        <span style="font-size: 29px; margin-top:10px;">
          <b>{{capital_letter(selected_tile_data.topic_data.name)}}
           {{capital_letter(selected_tile_data.resource_type)}}
          </b>
        </span>
        <span style="margin-top: 10px;">{{get_time_by_epoch(selected_tile_data.d_created)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { makeServerRequest } from '../request_manager';
import FilterComponent from './FilterModule.vue';
import ActivityTile from './ActivityTile.vue';

export default {
  name: 'ActivitiesPage',
  props: {
    msg: String,
  },
  components: { FilterComponent, ActivityTile },
  data: () => ({
    table_data: [],
    table_data_grouped: {},
    activity_types: ['All Work'],
    filter_btn_state: 'All Work',
    popup_state: false,
    selected_tile_data: {},
  }),

  beforeMount() {
    this.get_activities();
  },
  methods: {
    open_popup(tile) {
      this.popup_state = true;
      this.selected_tile_data = (tile);
    },

    set_filter_btn(type) {
      this.filter_btn_state = type;
    },

    get_activities() {
      makeServerRequest('get_activities').then((response) => {
        this.table_data = response.data;
        this.sort_activities();
        this.sort_dates();
      });
    },
    sort_dates() {
      /* eslint-disable arrow-body-style */
      /* eslint-disable max-len */
      /* eslint-disable no-restricted-syntax */
      /* eslint-disable guard-for-in */
      this.table_data.sort((a, b) => {
        return new Date(parseInt(b.d_created, 10) * 1000) - new Date(parseInt(a.d_created, 10) * 1000);
      });

      this.table_data.forEach((row) => {
        if (!this.table_data_grouped[row.mounth]) {
          this.table_data_grouped[row.mounth] = [];
        }
        this.table_data_grouped[row.mounth].push(row);
      });

      this.table_data = [];
      for (const row in this.table_data_grouped) {
        const rowObject = {};
        rowObject[row] = this.table_data_grouped[row];
        this.table_data.push(rowObject);
      }
      /* eslint-enable guard-for-in */
      /* eslint-enable no-restricted-syntax */
      /* eslint-enable max-len */
      /* eslint-enable arrow-body-style */
    },
    sort_activities() {
      this.table_data.forEach((row) => {
        if (!this.activity_types.includes(row.resource_type)) {
          this.activity_types.push(row.resource_type);
        }
        /* eslint-disable no-param-reassign */
        const mounth = this.get_mounth_by_epoch(row.d_created);
        row.mounth = mounth;
        /* eslint-enable no-param-reassign */
      });
    },
    get_mounth_by_epoch(epoch) {
      /* eslint-disable prefer-template */
      const a = new Date(parseInt(epoch, 10) * 1000);
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const month = months[a.getMonth()];
      const time = month;
      /* eslint-enable prefer-template */
      return time;
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
    capital_letter(str) {
      return str.charAt(0).toUpperCase() + str.substring(1, str.length);
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
    margin-top: 6px;
    width: 50px;
    height: 50px;
  }

.img_div{
    margin: 0 auto;
    text-align: center;
    background: darkturquoise;
    border-radius: 60px;
    width: 60px;
    height: 60px;
  }

.title_block{
  flex-direction: column;
  text-align: center;
  width: 400px;
  height: 150px;
  margin: 40px auto;
  display: flex;
}

.close_btn{
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  height: 30px;
  width: 30px;
  border-radius: 30px;
  border: 4px solid lightgray;
  font-size: 20px;
  color: lightgray;
  text-align: center;
  font-weight: 900;
}

.popup{
  position: absolute;
  width: 600px;
  height: 300px;
  top: 19%;
  left: 16%;
  border-radius: 20px;
  border: 4px solid lightgray;
  background: white;
}

.line_spacer_top{
  background: lightgray;
  width: 1px;
  height: 14px;
  margin-left: 5%;
}
.line_spacer{
    background: lightgray;
    width: 1px;
    height: 2px;
    margin-left: 5%;
  }

.month_chip{
  display: inline-block;
  padding: 4px;
  text-align: center;
  height: 14px;
  width: 70px;
  font-size: 12px;
  background: cornsilk;
  border-radius: 20px;
  padding-bottom: 7px;
}

.activities_container {
  width: 55%;
  text-align: left;
  position: relative;
  margin: 20px auto;
}
</style>
