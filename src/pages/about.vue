<template>
  <div class="about">
    <h1>About Us</h1>
    <p>We are a team of passionate developers dedicated to creating amazing web applications.</p>
    <p>Our mission is to provide high-quality software solutions that meet the needs of our clients.</p>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style scoped>
.about {
  text-align: center;
  margin-top: 50px;
}
</style>
