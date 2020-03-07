<template>
  <div id="app">
    <Menu />

    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>

import Menu from './components/Menu.vue';

export default {
  components: {
    Menu,
  }
}
</script>

<style lang="scss">

</style>
