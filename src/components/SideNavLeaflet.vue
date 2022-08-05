<template>
  <div id="sidebar" class="leaflet-sidebar collapsed" style=" display: none;">
      <!-- Nav tabs -->
      <div class="leaflet-sidebar-tabs">
        <ul role="tablist">
          <!-- top aligned tabs -->
          <li>
            <a href="#home" role="tab"><i class="fa fa-bars"></i></a>
          </li>
    
        </ul>
      </div>

      <!-- Tab panes -->
      <div class="leaflet-sidebar-content" style="width:600px;"> 
        <div class="leaflet-sidebar-pane" id="home" >
          <h1 class="leaflet-sidebar-header">
            sidebar-v2
            <div class="leaflet-sidebar-close">
              <i class="fa fa-caret-left"></i>
            </div>
          </h1>
          <p>A responsive sidebar for mapping libraries</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>