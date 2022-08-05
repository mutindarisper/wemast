<template>
  <div class="q-pa-none sticky">
    <div class="row q-mb-sm">
      <div class="col-md-1 ">
     <router-link to="/">
          <img :src="require('assets/logos/WeMAST.png')" class="WeMast_Img" />
     </router-link>
      </div>
      <div class="col-md-3 WeMast_title ">
        <label class="text-weight-bold">
          WETLAND MONITORING AND ASSESSMENT FOR TRANSBOUNDARY BASINS IN SOUTHERN
          AFRICA</label
        >
        <span class="text-primary text-weight-bold">(WeMAST)</span>
      </div>
      <div class="col-md-4  WeMast_top_logos" style="height:20px;">
            <SideNavLogos />

      </div>
      <!-- <div class="col-md-1 col-lg-1 WeMast_search">
        <q-input
          color="blue-12"
          v-model="search_text"
          outlined
          rounded
          dense
          label="Search"
        >
          <template v-slot:prepend>
            <q-icon color="primary" name="img:/uiIcons/search-24px.svg" />
          </template>
        </q-input>
      </div> -->
      <div class="col-md-4  WeMast_right_items">
        <div class="row float-right q-mr-md" style="font-size:30px;">
          <div class="q-pa-sm q-mr-md wemast_nav_icons">
            <router-link to="/"> 
             <q-icon color="primary" name="img:/uiIcons/home-24px.svg" />
            </router-link>
           
          </div>
          <div class="q-pa-sm q-mr-md wemast_nav_icons">
            <q-icon color="primary" name="img:/uiIcons/dashboard-24px.svg"/>
          </div>
          <div class="q-pa-sm q-mr-md wemast_nav_icons" @click="show_login_form">
            <q-icon color="primary" name="img:/uiIcons/person-24px.svg"/>
          </div>
          <div class="q-pa-sm q-mr-md wemast_nav_icons" @click="show_search_input">
            <q-icon color="primary" name="img:/uiIcons/search-24px.svg"/>
          </div>
          <div class="q-pa-xs">
            <q-select
              dense
               
              v-model="language"
              :options="options"
              label="Change Language"
              stack-label
              :options-dense="true"
              style="width:118px;"
            />
          </div>
           <!-- <Login/> -->
        </div>
       
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <DashboardSelections/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_text: "", //holds the search text
      language: null, //holds the selected language
      options: ["English", "French", "Portugesse"],
      show_search:false,
      show_login:false,
    };
  },
  components:{
    DashboardSelections:require('src/components/DashboardSelections').default,
     SideNavLogos: require("src/components/SideNavLogos").default,
      Login:require('src/components/Login').default,
  },
 
  methods:{
    show_search_input(){
      this.show_search= !this.show_search
      this.$emit('show_search_input', this.show_search)
    },
    show_login_form(){
      this.show_login= !this.show_login
      this.$emit('show_login_form', this.show_login)
    },
  },
};
</script>

<style soped>
.WeMast_Img {
  height: 50px;
  margin-left: 5px;
  margin-right: 15px;
  margin-top: 25px;
}
.WeMast_title {
  margin-top: 25px;
  
}
@media screen and (min-width: 1440px) {
.WeMast_title {
  margin-top: 25px;
  font-size: 80x;
  
}
}
.WeMast_search {
  margin-top: 30px;
}
.WeMast_right_items {
  margin-top: 25px;
  
}
.WeMast_top_logos{
  margin-top: 35px;
}
.q-select__dropdown-icon {
    transition: transform .32s;
    /* color: steelblue; */
}
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
 z-index: 3000;
  background-color: white;
}
.wemast_nav_icons{
  cursor: pointer;
}

</style>
