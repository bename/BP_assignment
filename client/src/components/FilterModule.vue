<template>
  <div class="filter_container">
    <span style="font-size: 13px">Filter by:</span><br>
    <button
      v-bind:class="{'btn_selected': type == filter_btn}"
      @click="set_filter_btn(type)"
      :key="key"
      v-for="(type, key) in types"
      class="filter_btn">{{type}}
     </button>
  </div>
</template>

<script>

export default {
  name: 'FilterModule',
  props: {
    types: Array,
  },
  data: () => ({
    table_data: {},
    filter_btn: 'All Work',
  }),
  beforeMount() {
  },
  methods: {
    set_filter_btn(type) {
      this.filter_btn = type;
      this.$emit('set_filter_btn', type);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .filter_container{
    margin: 20px 0 10px 0;
  }

  .filter_btn:hover{
    background: rgba(0, 128, 128, .2);
  }

  .btn_selected{
    background: rgba(0, 128, 128, .2) !important;
  }

  .filter_btn:focus{
    outline: 0;
  }

  .filter_btn{
    cursor: pointer;
    margin: 10px 5px 10px 0;
    border: 1px solid teal !important;
    background: white;
    font-size: 12px;
    color: teal;
    font-weight: 600;
    border-radius: 3px;
    padding: 5px;
  }
</style>
