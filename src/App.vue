<script setup lang="ts" async>
import { watch } from "vue";
import { RouterView, useRoute } from "vue-router";

const route = useRoute();
const DEFAULT_TITLE = "Digesto";

watch(
  () => route.meta,
  (meta) => {
    document.title = (meta.title as string) ?? DEFAULT_TITLE;
  }
);
</script>

<template>
  <RouterView></RouterView>
</template>

<style></style>
