<template>
  <div class="home">
    <h1>Welcome to Our Website!</h1>
    <p>This is the home page where you can find the latest updates.</p>
    <router-link to="/about">Learn more about us</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}
</style>
