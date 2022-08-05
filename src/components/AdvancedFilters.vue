<template>
  <q-card class="options-card bg-white">
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
    <div class="card_selections q-pa-xs q-pb-md">
      <div class="q-pa-sm q-ml-md">
        <label class="text-weight-bold">Select Country</label>
        <q-select
          dense
          outlined
          rounded
          v-model="option"
          :options="options"
          label="Country"
          :options-dense="true"
          class="select"
        />
      </div>
      <div class="q-pa-sm q-ml-md">
        <label class="text-weight-bold">Select Region</label>
        <q-select
          dense
          outlined
          rounded
          v-model="option"
          :options="options"
          label="Region"
          :options-dense="true"
           class="select"
        />
      </div>
      <div class="q-pa-sm q-ml-md">
        <label class="text-weight-bold">Select Sub-Region</label>
        <q-select
          dense
          outlined
          rounded
          v-model="option"
          :options="options"
          label="Sub-Region"
          :options-dense="true"
           class="select"
        />
      </div>
      <div class="q-pa-sm q-ml-md">
        <label class="text-weight-bold">Select Data Source</label>
        <q-select
          dense
          outlined
          rounded
          v-model="option"
          :options="options"
          label="Data Source"
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
      radio_selection: "",
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
