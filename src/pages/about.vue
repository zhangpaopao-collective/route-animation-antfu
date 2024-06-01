<script setup lang="ts" generic="T extends any, O extends any">
import { TheImageProxy } from '~/composables/images'

defineOptions({
  name: 'AboutPage',
})

const size = useStorage('size', 100)

function enlarge() {
  size.value += 20
}

function reset() {
  size.value = 100
}
</script>

<template>
  <div flex="~ col items-center">
    <div flex="~ gap-2">
      <button btn @click="enlarge">
        Enlarge
      </button>
      <button btn @click="reset">
        Reset
      </button>
    </div>

    <div m10 flex="~ <md:col" items-center>
      <TheImageProxy :style="{ width: `${size}px`, height: `${size}px` }" class="flex-shrink-0 rounded-1/2" />
      <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam odio vero, ipsam quidem enim esse? Hic eum reiciendis asperiores magnam alias? Sit, deleniti eius illo obcaecati perspiciatis iure facilis sapiente.</div>
    </div>
  </div>
</template>
