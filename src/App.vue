<template>
  <!-- V2 routes: PublicLayout wraps the page -->
  <PublicLayout v-if="isV2Route" />
  <!-- Legacy routes: DashboardLayout wraps the page -->
  <DashboardLayout v-else />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DashboardLayout from './layouts/DashboardLayout.vue'
import PublicLayout from './layouts/PublicLayout.vue'

const route = useRoute()
const isV2Route = computed(() => route.path.startsWith('/v2'))
</script>

<style>
/* Global styles if needed */
</style>
