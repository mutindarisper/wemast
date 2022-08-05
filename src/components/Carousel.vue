<template>
  <div class="carousel q-mt-md">
    <q-carousel
      swipeable
      animated
      v-model="slide"
      navigation
      
      ref="carousel"
      height="100%"
      
    >
      <template v-slot:navigation-icon="{ active, btnProps, onClick }">
        <q-btn
          v-if="active"
          size="lg"
          icon="radio_button_checked"
          color="white"
          flat
          round
          dense
          @click="onClick"
        />
        <q-btn
          v-else
          size="sm"
          icon="radio_button_unchecked"
          color="white"
          flat
          round
          dense
          @click="onClick"
        />
      </template>
      <template v-slot:control>
        <q-carousel-control position="right" style="top:40%">
          <q-btn
            flat
            round
            dense
            size="30px"
            text-color="black"
            icon="img:/uiIcons/arrow_right.svg"
            @click="$refs.carousel.next()"
          />
        </q-carousel-control>
        <q-carousel-control position="left" style="top:40%">
          <q-btn
            flat
            round
            dense
            size="30px"
            text-color="black"
            icon="img:/uiIcons/arrow_left.svg"
            @click="$refs.carousel.previous()"
          />
        </q-carousel-control>
      </template>
      <q-carousel-slide name="style" >
      <slide1/>
      </q-carousel-slide>
      
      <q-carousel-slide name="map" class="column no-wrap flex-center bg-primary">
        <q-icon name="terrain" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: "style",
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo."
    };
  },
  components:{
      slide1:require('src/components/CarouselSlide/slide1').default,
  },
};
</script>

<style scope>
.carousel {
  width: 100%;
  height: 700px;
}
</style>
