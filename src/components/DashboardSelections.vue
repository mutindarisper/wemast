<template>
  <div class="row  q-pb-md q-mb-xs" style="background-color: #efefef;">
    <div class="WeMast_Options_selections  q-pa-xs">
      <label class="text-weight-bold">Select Basin</label>
      <q-select
        dense
        outlined
        rounded
        v-model="basin"
        :options="basins"
        @input="handleBasin"
        label="Basin"
        :options-dense="true"
      />
    </div>
    <div class="WeMast_Options_selections q-pa-xs">
      <label class="text-weight-bold ">Select Indicator</label>
      <q-select
        dense
        outlined
        rounded
        @input="handleIndicator"
        v-model="indicator"
        :options="indicators"
        label="Indicator"
        :options-dense="true"
      />
    </div>

    <div class="q-pa-xs WeMast_Options_selections">
      <label class="text-weight-bold">Select Sub-Indicator</label>
      <q-select
        dense
        outlined
        rounded
        v-model="sub_indicator"
        :options="sub_indicators"
        @input="handleSubIndicator"
        label="Sub-Indicator"
        :options-dense="true"
      />
    </div>

    <div class="q-pa-xs WeMast_Options_selections">
      <label class="text-weight-bold">Select Year</label>
      <q-select
        dense
        rounded
        outlined
        v-model="year"
        @input="handleYear"
        :options="years"
        label="Year"
        :options-dense="true"
      />
    </div>

    <div
      class="q-pa-xs WeMast_Options_selections"
      v-if="sub_indicator && sub_indicator.value != 'lulc'"
    >
      <label class="text-weight-bold">Select Season</label>
      <q-select
        dense
        outlined
        rounded
        v-model="season"
        :options="seasons"
        @input="handleSeason"
        label="Season"
        :options-dense="true"
      >
      </q-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      language: null, //holds the selected language
      basin: null, //holds the selected basin
      indicator: null, //holds the selected indicator
      sub_indicator: null, //holds the selected sub_indicator
      sub_indicator: null, //holds the selected sub_indicator
      year: null, //holds the selected year
      season: null, //holds the selected year
      seasons: [
        { label: "dry_season", value: "dry_season" },
        { label: "wet_season", value: "wet_season" }
      ],
      basin_list: []
    };
  },
  computed: {
    basins() {
      const basin_dropdown_list = this.basin_list.map(basin => {
        return {
          value: basin.code,
          label: basin.name
        };
      });
      return basin_dropdown_list;
    },
    indicators() {
      return [
        { label: "Exposure", value: "exposure" },
        { label: "Sensitivity", value: "sensitivity" },
        { label: "Resiliance", value: "resiliance" }
      ];
    },
    sub_indicators() {
      if (this.indicator?.value === "exposure")
        return [
          { label: "lulc", value: "lulc" },
          { label: "ndvi", value: "ndvi" },
          { label: "Wetland Inventory", value: "wetland_inventory" }
        ];
      if (this.indicator?.value === "sensitivity")
        return [
          { label: "Water Quality", value: "water_quality" },
          { label: "Soil Moisture Index", value: "soil_moisture_index" },
          { label: "Water Extent", value: "water_extent" }
        ];
      if (this.indicator?.value === "resiliance")
        return [
          { label: "Burnt Area", value: "burnt_area" },
          { label: "SPI", value: "spi" },
          { label: "Flooding", value: "flooding" }
        ];
      return [
        { label: "lulc", value: "lulc" },
        { label: "ndvi_dryseason", value: "ndvi_dryseason" },
        { label: "ndvi_wetseason", value: "ndvi_wetseason" }
      ];
    },
    years() {
      const years = [];
      const base_year = 1994;
      const period = new Date().getFullYear() - base_year + 1;
      for (let i = 0; i < period; i++) {
        years[i] = base_year + i;
      }
      return years.reverse();
    },
    UserSelections() {
      return this.$store.getters["WemastSelections/getUserSelections"];
    }
  },
  async mounted() {
    try {
      const response = await this.$axios.get(
        "https://wemast.geoimagesolutions.com/wemast-api-back-end-0.1/api/regions/category/1",

        {
          headers: {
            sdf09rt2s: "locateit"
          }
        }
      );
      if (process.env.DEV) console.log("basins response ", response.data);
      this.basin_list = response.data;
    } catch (error) {
      if (process.env.DEV) console.log("boundaries error ", error);
    }
  },
  methods: {
    handleBasin(selection) {
      this.$store.dispatch("WemastSelections/handleUserSelections", {
        basin: selection.value
      });
     const selected_basin = this.basin_list.filter(basin=>{
        return basin.code === selection.value
      })
      if(process.env.DEV) console.log("selected basin",selected_basin[0]?.geom);
        this.$store.dispatch("Geojson/StoreGeojson", selected_basin[0]?.geom);

     
    },
    handleIndicator(selection) {
      this.$store.dispatch("WemastSelections/handleUserSelections", {
        indicator: selection.value
      });
    },
    handleSubIndicator(selection) {
      this.$store.dispatch("WemastSelections/handleUserSelections", {
        subindicator: selection.value
      });
    },
    handleYear(selection) {
      this.$store.dispatch("WemastSelections/handleUserSelections", {
        year: selection
      });
    },
    handleSeason(selection) {
      this.$store.dispatch("WemastSelections/handleUserSelections", {
        season: selection.value
      });
    }
  }
};
</script>

<style scoped>
.WeMast_Options_selections >>> .q-field__control {
  background-color: white;
}
.q-select {
  width: 160px;
}

@media screen and (min-width: 1920px) {
  .q-select {
    width: 250px;
  }
}
</style>
