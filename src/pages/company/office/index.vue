<script setup>
import { getPosts } from "../../../utils";

const officeData = getPosts({ postType: "office" });
</script>

<template>
  <div class="office">
    <template v-for="office in officeData" :key="office.id">
      <router-link :to="`/company/office/${office.id}`">
        <h2>{{ office.title.rendered }}</h2>
      </router-link>
    </template>
  </div>
</template>
