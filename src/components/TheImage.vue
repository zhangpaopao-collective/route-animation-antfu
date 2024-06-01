<script setup lang="ts">
const [value, toggle] = useToggle()
</script>

<template>
  <div overflow-hidden transition-all @click="toggle()">
    <img v-if="value" h-full w-full src="../assets/luke-miller.jpg" alt="" srcset="">
    <img v-else h-full w-full src="../assets/peter-thomas.jpg" alt="" srcset="">
  </div>
</template>
