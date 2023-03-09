<template>
  <v-app>    
    
      <router-view/>
    
  </v-app>
</template>

<script>

export default {
 name: "App",
  components: {
    
  },
  data () {
    return {
      userID: 0
      //
    }
  }
}
</script>
<style>
 /* html{
      overflow-y: auto ;
      height: 100%;
    } */
*{ text-transform: none !important; }
</style>
