<template>
  <div class="q-pt-md">
    <div class="logos_row" >
      <img
        :src="require('assets/logos/SASSCAL.png')"
        class="WeMast_Dashboard_logos"
      />

      <img
        :src="require('assets/logos/Gmes.png')"
        class="WeMast_Dashboard_logos"
      />
    
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
</template>

<script>
export default {};
</script>

<style scoped>
 .WeMast_Dashboard_logos {
    height: 35px;
    object-fit: contain;
    margin: 2px;
  }
  .logos_row{
     /* margin-left: 2%; */
  }
</style>
