<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <RouterView />

    <FloatContainer v-slot="{ attrs, props }">
      <TheImage v-bind="attrs" />
    </FloatContainer>
    <TheFooter />
  </main>
</template>
