<template>
  <div class="row full-height" style="overflow:hidden;">
    <div class="col-md-8">
      <img
        src="https://lp-cms-production.imgix.net/news/2017/10/Pink-flamingos-in-the-National-Reserve-of-Celestun-Yucatan-Mexico.-Photo-by-Michael-Falzone-Getty-Images.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850"
        class="img_slide"
      />
    </div>
    <div class="col-md-4 right">
      <div class="Wetland-Monitoring  q-ml-md">
        Wetland <br />
        Monitoring
      </div>
      <div class="Rectangle-3">
        Wetland Monitoring and Assessment Service for Transboundary Basins
        <br>
        Wetland Monitoring and Assessment Service for Transboundary Basins
      </div>
      <div class="Rectangle-4">
        <div class="VISIT-DASHBOARD ">
          <router-link to="/dashboard"> VISIT DASHBOARD </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.Wetland-Monitoring {
  margin-left: 25px;
  font-family: Montserrat;
  font-size: 50px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  margin-top: 30%;
  color: #1481c3;
}
.Rectangle-3 {
  margin-left: 25px;
  margin-top: 25px;
  font-family: Montserrat;
  font-size: 28px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
}
.right {
  background-color: #2e3192;
}
.img_slide {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.Rectangle-4 {
  height: 57px;
  margin: 42px 20% 0 25px;
  padding: 16px 46px 17px 49px;
  border-radius: 29px;
  border: solid 3px #1481c3;
}
@media screen and (min-width:1281px)  and (max-width:1440px){
.Rectangle-4 {
  height: 57px;
  margin: 30px 30% 0 25px;
  padding: 16px 46px 17px 49px;
  border-radius: 29px;
  border: solid 3px #1481c3;
}
}
@media screen and (min-width:1441px){
.Rectangle-4 {
  height: 57px;
  margin: 30px 50% 0 25px;
  padding: 16px 46px 17px 49px;
  border-radius: 29px;
  border: solid 3px #1481c3;
}
}
.VISIT-DASHBOARD {
  height: 24px;
  text-align: left;
  cursor: pointer;
}
.VISIT-DASHBOARD a {
    margin-left: 10px;
  text-decoration: none;
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
}
</style>
