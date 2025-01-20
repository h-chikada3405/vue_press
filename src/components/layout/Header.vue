<script setup>
import Breadcrumb from "../common/Breadcrumb.vue";
import "@/assets/scss/components/layout/Header.scss";
</script>

<template>
  <header>
    <h1>My Awesome Vue App</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/company">Company</router-link> |
      <router-link to="/news">News</router-link>
    </nav>
    <Breadcrumb/>
  </header>
</template>
