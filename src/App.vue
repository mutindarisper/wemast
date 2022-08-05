<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",

  data() {
    return {
      myIcons: {
        "app:arr_down": "img:uiIcons/arrow_drop_down_circle.png"
      }
    };
  },

  created() {
    this.$q.iconMapFn = iconName => {
      const icon = this.myIcons[iconName];
      if (icon !== void 0) {
        return { icon: icon };
      }
    };
  },
   mounted(){
    this.$q.iconSet.arrow.dropdown ='app:arr_down';
  },
};
</script>
<style >
.q-virtual-scroll__content{
  background-color: steelblue;
 
}


.q-item__label {
  color: white;
  padding: 15px;
    border-top: 1px solid white;
}
</style>