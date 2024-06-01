<script setup lang="ts" generic="T extends any, O extends any">
import { TheImageContainer } from '~/composables/images'
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <RouterView />

    <TheImageContainer />
    <TheFooter />
  </main>
</template>
