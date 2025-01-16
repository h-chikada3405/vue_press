<template>
  <div id="app">
    <LayoutHeader />
    <main>
      <router-view />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup>
import LayoutHeader from './components/layouts/Header.vue'
import LayoutFooter from './components/layouts/Footer.vue'
</script>
