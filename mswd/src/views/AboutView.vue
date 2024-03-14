<template>
   <Navbar />
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  text-align: center;

}
</style>
