<template>
  <div class="q-pa-xs">
    <div class="row">
      <div class="col">
        <div class="q-pa-md float-right">
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
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="row">
          <img :src="require('assets/logos/SASSCAL.png')" class="WeMast_Img_home" />
          <div class="co">
            <img
              :src="require('assets/logos/WeMAST.png')"
              class="WeMast_Dashboard_logos"
            />

            <img
              :src="require('assets/logos/Gmes.png')"
              class="WeMast_Dashboard_logos"
            />

            <!-- <img
        :src="require('assets/logos/sansa.png')"
        class="WeMast_Dashboard_logos"
      /> -->

            <img
              :src="require('assets/logos/Au.png')"
              class="WeMast_Dashboard_logos"
            />

            <img
              :src="require('assets/logos/EU.png')"
              class="WeMast_Dashboard_logos"
            />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row float-right">
          <div :class="screenSize">
            <router-link to="/">
            <q-icon
              class="active"
              color="green"
              name="img:/uiIcons/home-landing.svg"
              size="37px"
            />
            </router-link>
            
            <br />
            <label class="label_title">Home</label>
          </div>
          <div :class="screenSize">
            <q-icon
              class="active"
              color="primary"
              name="img:/uiIcons/inventory.svg"
              size="37px"
            />
            <br />
            <label class="label_title"
              >Services & <br />
              Products</label
            >
          </div>
          <div :class="screenSize ">
            <q-icon
              class="active"
              color="primary"
              name="img:/uiIcons/graph.svg"
              size="37px"
            />
            <br />
            <label class="label_title"
              >Capacity <br />
              Development</label
            >
          </div>
          <div :class="screenSize ">
            <q-icon
              class="active"
              color="primary"
              name="img:/uiIcons/megaphone.svg"
              size="37px"
            />
            <br />
            <label class="label_title">News</label>
          </div>
          <div :class="screenSize">
            <q-icon
              class="active"
              color="primary"
              name="img:/uiIcons/contacts.svg"
              size="37px"
            />

            <br />
            <label class="label_title">Contacts</label>
          </div>
        </div>
      </div>
    </div>
    <!-- <button @click="testGmes">test</button> -->
   
      <Carousel />
   
  </div>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      language: "",
      options: ["english", "french"]
    };
  },
  components: {
    SideNavLogos: require("src/components/SideNavLogos").default,
    Carousel: require("src/components/Carousel").default,
    
  },
  computed: {
    screenSize() {
      const screenSize = screen.width;
      if(screenSize > 1280 ) return 'q-pa-lg'
      if(screenSize <1025  ) return 'q-pa-sm'
      return 'q-pt-lg q-mr-lg'
    }
  },
  methods: {
    async testGmes() {
      try {
        const response = await this.$axios.post(
          "https://geoimagesolutions.com/api/login",
          { username: "admin", password: "admin" }
        );
        console.log("response ", response);
      } catch (error) {
        if (process.env.DEV) console.log(" error ", error.message);
      }
    }
  }
};
</script>
<style scoped>
.WeMast_Img_home {
  width: 150px;
  /* height:80px; */
  margin-left: 5px;
  margin-right: 45px;
  /* margin-top: 25px; */
}
.WeMast_Dashboard_logos {
  height: 50px;
  margin-top: 25px;
}
.active {
  /* filter: invert(35%) sepia(100%) saturate(511%) hue-rotate(162deg) brightness(100%) contrast(100%); */
  filter: invert(48%) sepia(3%) saturate(10%) hue-rotate(360deg) brightness(97%)
    contrast(96%);
     margin-bottom: 4px;
}
.label_title {
  font-family: Montserrat;
  font-size: 19px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: #4e4e4e;
 
}
</style>
