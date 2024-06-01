<script setup lang="ts" generic="T extends any, O extends any">
import { TheImageProxy } from '~/composables/images'

defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div flex="~ col items-center">
    <div i-carbon-campsite inline-block text-4xl />

    <div m-20>
      <TheImageProxy :attrs="{class: 'h-100 w-100 rounded-10'}"  />
    </div>
  </div>
</template>
