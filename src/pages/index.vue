<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div flex="~ col items-center">
    <div i-carbon-campsite inline-block text-4xl />

    <div m-20>
      <FloatProxy h-100 w-100 rounded-10 />
    </div>

    <RouterLink
      class="m-3 text-sm btn"
      to="/about"
    >
      Goto About
    </RouterLink>
  </div>
</template>
