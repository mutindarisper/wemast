<template>
  <div>
    <DashboardNav
      @show_search_input="handleShowSearch"
      @show_login_form="handleShowLoginForm"
    />
    <Login v-if="show_login_form" />
    <div class="mapwrap">
      <div id="more_options">
        <div class="more_options_group">
          <div
            class="filters"
            @click="handleMoreOptionsClicked('filter')"
            :style="
              more_options_selected === `filter`
                ? ` border-left: 35px solid steelblue;`
                : ``
            "
          >
            <p style="white-space: nowrap; caret-color: transparent">
              Advanced Filter
            </p>
            <div class="q-pa-none" v-if="more_options_selected === `filter`">
              <AdvancedFilters @close_card="close_card" />
            </div>
          </div>
          <div
            class="compare"
            @click="handleMoreOptionsClicked('compare')"
            :style="
              more_options_selected === `compare`
                ? ` border-left: 35px solid steelblue;`
                : ``
            "
          >
            <p>Compare</p>
            <div class="q-pa-none" v-if="more_options_selected === `compare`">
              <Compare @close_card="close_card" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="mapContainer"></div>
    <SideNavLeaflet />
    <div id="sidenav" class="sidenav bg-white">
      <div id="mySidenav" style="height: 100%">
        <div id="protrusion" class="bg-white protrusion">
          <div @click.stop="toggle_nav">
            <img id="close" src="uiIcons/drawer.svg" v-if="!show_sidenav" />
            <img id="open" src="uiIcons/drawer.svg" v-if="show_sidenav" />
          </div>
        </div>
        <div class="sidenav_body" v-if="!show_sidenav">
          <div class="row">
            <div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
              <div class="row" v-if="show_search">
                <div class="col-xs-6 offset-3">
                  <q-input dense outlined v-model="search" label="Search" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="q-pa-xs">
                    <div
                      class="text-weight-bolder text-h6"
                      @click="handleAnalysisMetaSwap('data_analysis')"
                      style="cursor: pointer"
                    >
                      <span
                        :class="
                          analysis_swap_toggle === 'data_analysis'
                            ? 'side_nav_swap'
                            : ''
                        "
                        >Data Analysis</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="q-pa-xs">
                    <div
                      class="text-weight-bolder text-h6"
                      @click="handleAnalysisMetaSwap('metadata')"
                      style="cursor: pointer"
                    >
                      <span
                        :class="
                          analysis_swap_toggle === 'metadata'
                            ? 'side_nav_swap'
                            : ''
                        "
                        >Metadata</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="analysis_swap_toggle === 'data_analysis'">
            <q-btn flat label="get WMS" @click="getWMS_Layer" />

            <Summary>
              {{ summary_text }}
            </Summary>
            <br />
            <label class="text-bold" style="font-family: Montserrat">
              {{ chart_title }}
            </label>
            <PieChart
              :height="200"
              :width="200"
              :Stats="stats"
              class="q-pt-md q-pb-md bg-grey-2 q-mb-sm q-pr-md"
            />

         
            <br />
            <label class="text-bold" style="font-family: Montserrat">
              {{ line_chart_title }}</label
            >
            <!-- <LineChart
              :Stats="stats"
              :height="250"
              :width="180"
              class="q-pt-lg q-pr-lg bg-grey-2"
            /> -->
            <BarChart
              :Stats="stats"
              :height="250"
              :width="180"
              class="q-pt-lg q-pr-lg bg-grey-2"
            />
          </div>
          <div class="q-pa-none" v-if="analysis_swap_toggle === 'metadata'">
            metatata
          </div>
          <!-- <LineChart :height="250" :width="250" /> -->
          <div class="logos_container row">
            <SideNavLogos />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "src/assets/map.css";
import { leaflet_custom_controls } from "src/CustomMapControls/LeafletCustomControls";
import { close_nav, open_nav } from "src/CustomMapControls/SideNavControls";
import "leaflet-sidebar-v2";
import "leaflet-sidebar-v2/css/leaflet-sidebar.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw-src.css";
import "leaflet-draw";
import "leaflet-wms-header";

export default {
  name: "Map",
  data() {
    return {
      center: [-11.981, 24.916], // set initial map center
      map: null, //instance of map object,
      more_options_selected: "", //selects which option is clicked
      sidebar: null, //holds leflet sidebar instance
      show_sidenav: false, //holds variable to toggle side nav when clicked
      show_base_layers: true, //used to toggle visibility of the base layer list
      previous_wemast_ctrl_id: null, //holds the id of the element clicked  prevously
      baseMaps: {}, // holds base layers array
      current_raster_layer: null, //holds curren requested layer geoserver
      current_geojson: null, //holds curren requested geometry
      raster_layers: [],
      editableLayers: null, //draw control
      show_draw_control: false, //toggles draw control visibility
      analysis_swap_toggle: "data_analysis", // toggles between analysis and meta data
      current_top_base_layer: null, //holds the current later at the top
      search: "", //holds the search item
      show_search: false, // show search input
      show_login_form: false, // show search input
      legend_link: "", // holds the legend link from geoserver
      legend: null, //holds instance of leaflet legend
      stats: {}, //holds sorted chart data
      chart_title: "title", //
      line_chart_title: "Vegatation Cover (Histogram)", //
      summary_text: ` Land use land cover maps monitor the land use in a specific year. The
      integration of the biophysical and human factors plays a leading role in
      causing land-use changes, and is used to explain the dynamics of land use
      that occur within a river basin or a wetland. The study of land cover may
      also be used to predict future trends of an ecosystem while understanding
      its sustainability.`,
    };
  },
  components: {
    DashboardNav: require("src/components/DashboardNav").default,
    AdvancedFilters: require("src/components/AdvancedFilters").default,
    Compare: require("src/components/Compare").default,
    SideNavLeaflet: require("src/components/SideNavLeaflet").default,
    SideNavLogos: require("src/components/SideNavLogos").default,
    Summary: require("src/components/Summary").default,
    PieChart: require("src/components/Charts/PieChart").default,
    LineChart: require("src/components/Charts/LineChart").default,
    BarChart: require("src/components/Charts/BarChart").default,
    Login: require("src/components/Login").default,
  },
  computed: {
    UserSelections() {
      return this.$store.getters["WemastSelections/getUserSelections"];
    },
    selectedGeojson(){
      return this.$store.getters["Geojson/getGeojson"];
    }
  },
  watch: {
    UserSelections: {
      deep: true,
      immediate: true,
      handler(val) {
        if (process.env.DEV) console.log("Selections ", val);
        if ("year" in val) {
          this.findData();
        }
      },
    },
    selectedGeojson:{
      deep:true,
      handler(val){
       this.handleGeojson(val)
      }
    }
  },
  methods: {
      handleGeojson(val){
        if(this.current_geojson)    this.map.removeLayer(this.current_geojson);
       this.current_geojson =  L.geoJSON(val,{
        color: "black",
        // "weight": 5,
        fillColor: "none",
        opacity: 1
      });
       this.current_geojson.addTo(this.map);
       this.map.fitBounds(this.current_geojson.getBounds(), { padding: [50, 50] });
      }
    
    ,
    handleAnalysisMetaSwap(value) {
      this.analysis_swap_toggle = value;
    },
    wemast_zoom_ctrl_in() {
      this.map.setZoom(this.map.getZoom() + 1);
    },
    wemast_zoom_ctrl_out() {
      this.map.setZoom(this.map.getZoom() - 1);
    },
    wemast_base_layers() {
      if (!this.show_base_layers)
        document.getElementById("show_base_layers").style.display = "none";
      if (this.show_base_layers) {
        document.getElementById("show_base_layers").style.display = "block";
        document.getElementById("show_base_layers").style.marginRight = "-4px";

        //create the base map list and render
        const base_layers = Object.keys(this.baseMaps);
        let layer_html = `<ul class=base_layer_list>`;
        base_layers.forEach((layer, i) => {
          layer_html += `<li id=base_layer-${layer}>
          <div class=row>
          <div class="col-xs-1" ><input type="radio" name="base_map" id="checkbox-${layer}" ${
            this.current_top_base_layer === layer ? "checked" : ""
          } ></div>
          <div class="col-xs-10 q-ml-sm">
           ${layer} ${
            base_layers.length - 1 != i ? "<hr class=full-width> " : ""
          }
           </div>
          </div>
           </li>`;
        });
        layer_html += `</ul>`;
        document.getElementById("show_base_layers").innerHTML = layer_html;

        document
          .getElementById("show_base_layers")
          .addEventListener("mouseleave", (e) => {
            document.getElementById("show_base_layers").style.display = "none";
          });
      }

      this.show_base_layers = !this.show_base_layers;
    },
    wemast_draw() {
      if (!this.show_draw_control) {
        const draw_ctrl = document.getElementsByClassName("leaflet-draw");
        draw_ctrl[0].style.visibility = "hidden";
      } else {
        const draw_ctrl = document.getElementsByClassName("leaflet-draw");
        draw_ctrl[0].style.visibility = "visible";
      }
      this.show_draw_control = !this.show_draw_control;
    },
    change_base_layer(id) {
      this.current_top_base_layer = id;
      const base_map = id.split("-")[1];
      this.current_top_base_layer = base_map;
      console.log("change base map ", base_map);
      const index = Object.keys(this.baseMaps).indexOf(base_map);

      let layerControlElement = document.getElementsByClassName(
        "leaflet-control-layers"
      )[0];
      layerControlElement.getElementsByTagName("input")[index].click();

      this.map.eachLayer(function (layer) {
        console.log("layer ", layer);
      });
    },

    AddCustomRightControls() {
      const leaflet_controls = L.control({ position: "topright" });
      leaflet_controls.onAdd = () => {
        let div = L.DomUtil.create("div", "WeMAST_zoom");
        div.innerHTML = leaflet_custom_controls;
        return div;
      };

      leaflet_controls.addTo(this.map);
      const right_ctrls = document.querySelector(".WeMAST_leaflet_controls");
      right_ctrls.addEventListener("click", (event) => {
        const id = event.target.id;
        if (process.env.DEV) console.log("target id ", id);
        if (
          ![
            "wemast_zoom_ctrl_in",
            "wemast_zoom_ctrl_out",
            "wemast_download",
            "wemast_base_layers",
          ].includes(id)
        ) {
          try {
            document.getElementById(`${id}`).style.backgroundColor =
              "steelblue";
          } catch (err) {}
        }

        if (this[`${id}`]) {
          this[id]();
        }
        if (id.startsWith("checkbox")) {
          this.change_base_layer(id);
        }
        if (
          (this.previous_wemast_ctrl_id &&
            this.previous_wemast_ctrl_id != id) ||
          (this.previous_wemast_ctrl_id && this.previous_wemast_ctrl_id === id)
        ) {
          document.getElementById(
            this.previous_wemast_ctrl_id
          ).style.backgroundColor = "white";
        }

        this.previous_wemast_ctrl_id = id;
      });
    },
    AddSideLeafletSideBar() {
      this.sidebar = L.control.sidebar({
        container: "sidebar",
        position: "right",
      });
      this.map.addControl(this.sidebar);
    },
    setupLeafletMap() {
      let osm = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
        }
      );

      let mapbox = L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
          // maxZoom: 18,
          id: "mapbox/streets-v11",
          accessToken:
            "pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og",
        }
      );
      let mapboxSatellite = L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}{r}?access_token={accessToken}",
        {
          attribution:
            'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',

          id: "mapbox/satellite-v9",
          accessToken:
            "pk.eyJ1IjoiY2hyaXNiYXJ0IiwiYSI6ImNrZTFtb3Z2bDAweTMyem1zcmthMGY0ejQifQ.3PzoCgSiG-1-sV1qJvO9Og",
        }
      );
      this.baseMaps = {
        OpenStreetMap: osm,
        MapBox: mapbox,
        MapBoxSatellite: mapboxSatellite,
      };
      this.map = L.map("mapContainer", {
        zoomControl: false,
        layersControl: false,
        center: this.center,
        // minZoom: 4.4,
        // maxZoom: 17,
        zoom: 4.5,
        layers: [mapboxSatellite],
      }); // add the basemaps to the controls
      L.control.layers(this.baseMaps).addTo(this.map);

      this.current_top_base_layer = "MapBoxSatellite";
      this.AddSideLeafletSideBar();
    },
    handleMoreOptionsClicked(option) {
      if (process.env.DEV) console.log("handleMoreOptionsClicked ", option);
      if (option === "compare") {
        return (this.more_options_selected = "compare");
      }
      if (option === "filter") {
        return (this.more_options_selected = "filter");
      }
    },
    //close the more options
    close_card() {
      this.more_options_selected = "";
    },
    toggle_nav(e) {
      console.log(" toggle_nav ", e.target.id);
      const cmd = e.target.id;
      if (cmd === "close") return this.closeNav();
      return this.openNav();
    },
    openNav() {
      this.sidebar.open("home");
      this.show_sidenav = false;
      open_nav();
    },

    closeNav() {
      this.sidebar.close("home");
      close_nav();
      this.show_sidenav = true;
    },
    addDrawCtrl() {
      //we add the polygon draw feature to map as seen  below
      this.editableLayers = new L.FeatureGroup();
      this.map.addLayer(this.editableLayers);
      let options = {
        position: "topright",
        draw: {
          polyline: false,
          polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            showArea: true,
            drawError: {
              color: "#e1e100", // Color the shape will turn when intersects
              message: "<strong>Oh snap!<strong> you can't draw that!", // Message that will show when intersect
            },
            shapeOptions: {
              color: "black",
              fillColor: "none",
            },
          },
          circle: false, // Turns off this drawing tool
          rectangle: false,
          marker: false,
          circlemarker: false,
        },
        edit: {
          featureGroup: this.editableLayers, //REQUIRED!!
          edit: true,
        },
      };
      let drawControl = new L.Control.Draw(options);
      this.map.addControl(drawControl);

      this.map.on(L.Draw.Event.CREATED, (e) => {
        const layer = e.layer;
        this.editableLayers.addLayer(layer);
        if (process.env.DEV)
          console.log(JSON.stringify(layer.toGeoJSON().geometry));
      });

      this.map.on(L.Draw.Event.EDITSTOP, (e) => {
        if (process.env.DEV) console.log("stop edit", e);
      });
      this.map.on(L.Draw.Event.DELETED, (e) => {
        if (process.env.DEV) console.log(" deleted ", e);
        //remove the control from map and remove focus on the draw icon by changing color
        this.wemast_draw();
        document.getElementById("wemast_draw").style.backgroundColor = "white";
      });
    },
    async findData() {
      try {
        this.$q.loading.show()
        const response = await this.$axios.post(
          "https://wemast.geoimagesolutions.com/wemast-api-back-end-0.1/api/dataserver/finddata",
          {
            basin: this.UserSelections.basin,
            indicator: this.UserSelections.subindicator,
            year: this.UserSelections.year,
            geometry: JSON.stringify(this.selectedGeojson)
          },

          {
            headers: {
              sdf09rt2s: "locateit",
            },
          }
        );
        if (process.env.DEV) console.log("find data response ", response.data);
        await this.getWMS_Layer({
          layers: response.data.layername,
        });
       await  this.getLegend({
          base_url: response.data.geoserver,
          legend_url: response.data.legendurl,
        });
        await this.getStatistics();
         this.$q.loading.hide()
      } catch (error) {
        if (process.env.DEV) console.log("find data error ", error);
         this.$q.loading.hide()
      }
    },
    async CreateLegend() {
      if (this.legend) {
        this.map.removeControl(this.legend); //destroy legend everytime new data come in
      }
      this.legend = L.control({
        position: "bottomright",
        name: this.legendTitle,
      });
      this.legend.onAdd = (map) => {
        //create legend based on data, translatios have been included
        let div = L.DomUtil.create("div", "legend");
        div.innerHTML += `<div > 
        <img src=${this.legend_link} />
       
        </div >`;

        let draggable = new L.Draggable(div); //the legend can be dragged around the div
        draggable.enable();
        return div;
      };
      this.legend.addTo(this.map);
    },
    async getLegend({ base_url, legend_url }) {
      fetch(`${base_url}/${legend_url}`, {
        headers: {
          sdf09rt2s: "locateit",
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          //
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            this.legend_link = reader.result;
            this.CreateLegend();
          };
        });
    },
    async getStatistics() {
      try {
        const response = await this.$axios.post(
          "https://wemast.geoimagesolutions.com/wemast-api-back-end-0.1/api/dataserver/findstats",
          {
             basin: this.UserSelections.basin,
            indicator: this.UserSelections.subindicator,
            year: this.UserSelections.year,
             geometry: JSON.stringify(this.selectedGeojson)
          },

          {
            headers: {
              sdf09rt2s: "locateit",
            },
          }
        );
        this.stats = response.data;
        if (process.env.DEV) console.log("Chart Data", this.stats);
        this.chart_title = `${this.stats.layername
          .split("_")[1]
          .toUpperCase()}-${this.stats.year} (Pie chart)`;
        this.line_chart_title = `${this.stats.layername
          .split("_")[1]
          .toUpperCase()}-${this.stats.year} (Histogram)`;
      } catch (error) {
        if (process.env.DEV) console.log("get stats error ", error);
      }
    },
    async getWMS_Layer({ layers }) {
      const wmsLayer = L.TileLayer.wmsHeader(
        "https://spatial.geoimagesolutions.com/geoserver/sasscal/wms?",
        {
          layers,
          format: "image/png",
          transparent: true,
        },
        [{ header: "sdf09rt2s", value: "locateit" }],
        null
      );
     
     if(this.current_raster_layer) this.map.removeLayer(this.current_raster_layer);
      wmsLayer.addTo(this.map);
      wmsLayer.bringToFront();
       this.current_raster_layer = wmsLayer;
    },
    handleShowSearch(val) {
      this.show_search = val;
    },
    handleShowLoginForm(val) {
      this.show_login_form = val;
    },
  },

  mounted() {
    this.setupLeafletMap();
    this.AddCustomRightControls();
    this.closeNav();
    document
      .getElementById("wemast_base_layers")
      .addEventListener("mouseover", (e) => {
        console.log("mouseover ");
        this.show_base_layers = true;
        this.wemast_base_layers();
      });

    this.addDrawCtrl(); //adds draw control to map
    this.wemast_draw(); //hides draw controls

    this.map.on("baselayerchange", (e) => {
      console.log("Layer in basechange ", this.current_raster_layer);
      if (this.current_raster_layer) {
        this.current_raster_layer.bringToFront(); //current_raster can be tracked and brought to front
      }
    });
  },
};
</script>

<style scoped>
#mapwrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#wemast_base_layers {
  margin-top: 70px;
}
#mapContainer >>> .leaflet-control-layers {
  display: none;
  /* position: absolute;
  top:80;
  right:190px */
}
@media screen and (min-height: 1000px) {
  #mapContainer {
    width: 100%;
    height: 82vh;
    margin-top: -30px;
    /* margin-top: -1px;    */
  }
}
@media screen and (min-height: 900px) {
  #mapContainer {
    width: 100%;
    height: 80.5vh;
    margin-top: -30px;
    /* margin-top: -1px;    */
  }
}
@media screen and (max-height: 800px) {
  #mapContainer {
    width: 100%;
    height: 77.5vh;
    margin-top: -30px;
    /* margin-top: -1px;    */
  }
}
@media screen and (max-height: 720px) {
  #mapContainer {
    width: 100%;
    height: 80vh;
    margin-top: -30px;
    /* margin-top: -1px;    */
  }
}

.compare p {
  left: -47px;
  caret-color: transparent;
}
.options-card {
  margin-top: -38px;
  width: 268px;
}
#mapContainer >>> .WeMAST_leaflet_controls {
  font-size: 30px;
  position: sticky;
  top: 40%;
}
#mapContainer >>> .WeMAST_leaflet_controls img {
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: white;
}

/* from hapa ni side nav */
.sidenav {
  height: 100%;
  position: fixed;
  z-index: 3000;
  top: 90px;
  right: 0;
  caret-color: transparent;
}
#mySidenav {
  transition: width 0.3s;
}
.sidenav_body {
  height: 90%;

  margin-left: 20px;
  overflow-y: scroll;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: steelblue white;
}
.sidenav_body::-webkit-scrollbar {
  width: 5px;
}
.sidenav_body::-webkit-scrollbar-track {
  background: white; /* color of the tracking area */
}

.sidenav_body::-webkit-scrollbar-thumb {
  background-color: steelblue; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  border: 1px solid rgb(224, 213, 193); /* creates padding around scroll thumb */
}
.protrusion {
  top: 110px;
  position: absolute;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  cursor: pointer;
}
#close {
  margin-top: 9px;
  margin-left: 8px;
}
#open {
  margin-top: 9px;
  margin-left: 8px;
  transform: rotate(180deg);
}
@media screen and (max-height: 800px) {
  .logos_container {
    margin-bottom: 25px;
    margin-top: 10px;
  }
}
@media screen and (min-height: 901px) {
  .logos_container {
    position: absolute;
    bottom: 0;
    margin-left: 25%;
  }
}
#mapContainer >>> .base_layer_list {
  list-style: none;
  font-size: 15px;
  padding: 5px;
}
.side_nav_swap {
  color: #1481c3;
  border-bottom: solid 3px #1481c3;
  padding-bottom: 6px;
}
</style>
