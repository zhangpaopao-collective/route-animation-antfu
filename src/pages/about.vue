<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'AboutPage',
})

const size = useStorage('size', 100)

function enlarge() {
  size.value += 20
}
</script>

<template>
  <div flex="~ col items-center">
    <button btn @click="enlarge">
      Enlarge
    </button>
    <div m20>
      <FloatProxy :style="{ width: `${size}px`, height: `${size}px` }" rounded-2 />
    </div>

    <RouterLink
      class="m-3 text-sm btn"
      to="/"
    >
      go to Index
    </RouterLink>
  </div>
</template>
