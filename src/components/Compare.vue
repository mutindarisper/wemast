<template>
  <q-card class="options-card">
    <div class="bg-grey-2">
      <div class="row">
        <div class="col">
          <q-icon
            class="q-pa-xs float-right"
            size="20px"
            name="img:uiIcons/close.png" 
            @click.stop="close_card"
          />
        </div>
      </div>
      <div class="q-pa-xs row">
        <div class=" q-ml-md">
          <q-radio v-model="radio_selection" val="parameters" />
          <br />
          <label class="">Parameters</label>
        </div>
        <div class=" q-ml-lg">
          <q-radio v-model="radio_selection" val="time" />
          <br />
          <label class="">Time</label>
        </div>
      </div>
    </div>
    <!-- year and season selection  -->
    <div class="card_selections q-pa-xs q-pb-sm" v-if="radio_selection ==='time'">
      <div class="q-pa-sm q-ml-md">
        <label class="text-weight-bold">Select Year</label>
        <q-select
          dense
          outlined
          rounded
          v-model="option"
          :options="options"
          label="Year"
          :options-dense="true"
          class="select"
        />
      </div>
      <div class="q-pa-sm q-ml-md">
        <label class="text-weight-bold">Select Season</label>
        <q-select
          dense
          outlined
          rounded
          v-model="option"
          :options="options"
          label="Season"
          :options-dense="true"
          class="select"
        />
      </div>
    </div>
   <!-- parameters selections -->
    <div class="card_selections q-pa-xs q-pb-sm" v-if="radio_selection ==='parameters'">
      <div class="q-pa-sm q-ml-md">
        <label class="text-weight-bold">Select parameter 1</label>
        <q-select
          dense
          outlined
          rounded
          v-model="option"
          :options="options"
          label="parameter 1"
          :options-dense="true"
           class="select"
        />
      </div>
      <div class="q-pa-sm q-ml-md ">
        <label class="text-weight-bold">Select parameter 2</label>
        <q-select
          dense
          outlined
          rounded
          v-model="option"
          :options="options"
          label="parameter 2"
          :options-dense="true"
           class="select"
        />
      </div>
      <div class="q-pa-sm q-ml-md">
        <label class="text-weight-bold">Select parameter 3</label>
        <q-select
          dense
          outlined
          rounded
          v-model="option"
          :options="options"
          label="parameter 3"
          :options-dense="true"
           class="select"
        />
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      radio_selection: "time",
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      option: ""
    };
  },

  methods: {
    close_card() {
      this.$emit("close_card", true);
    }
  }
};
</script>

<style scoped>
.select{
  width: 203px;
  height: 39px; 
}
</style>
