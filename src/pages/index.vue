<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div>
    <div i-carbon-campsite inline-block text-4xl />

    <FloatProxy h-100 w-100 rounded-full />

    <RouterLink
      class="m-3 text-sm btn"
      to="/about"
    >
      go to About
    </RouterLink>
  </div>
</template>
