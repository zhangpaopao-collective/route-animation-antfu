<script setup lang="ts" generic="T extends any, O extends any">
import { TheImageContainer } from '~/composables/images'
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <div>
      <RouterLink
        class="m-3 text-sm btn"
        to="/"
      >
        Index
      </RouterLink>
      <RouterLink
        class="m-3 text-sm btn"
        to="/about"
      >
        About
      </RouterLink>
      <RouterLink
        class="m-3 text-sm btn"
        to="/product"
      >
        Product
      </RouterLink>
    </div>
    <RouterView />

    <TheImageContainer />
    <TheFooter />
  </main>
</template>
