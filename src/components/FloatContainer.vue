<script setup lang="ts">
import type { StyleValue } from 'vue'
import { metadata, proxyEl } from '~/composables/floating'

const rect = reactive(useElementBounding(proxyEl))

const style = computed<StyleValue>(() => ({
  transition: 'all 0.4s ease-in-out',
  position: 'fixed',
  left: `${rect?.left || 0}px`,
  top: `${rect?.top || 0}px`,
}))
</script>

<template>
  <div :style="style">
    <slot v-bind="metadata" />
  </div>
</template>
