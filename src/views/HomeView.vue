<script setup lang="ts">
import router from "@/router";
import { onMounted, ref } from "vue";
import SearchBar from "../components/SearchBar.vue";

const input = ref<typeof SearchBar | null>(null);
const cnj = ref("");

onMounted(() => {
  input?.value?.focus();
});

function search() {
  console.log(cnj.value);
  if (cnj.value !== "") {
    router.push(`/search/${cnj.value}`);
  }
}
</script>

<template>
  <div class="h-[80vh] bg-sky-800 px-6 flex flex-col gap-8 items-center justify-center">
    <h2 class="text-white">Pesquisar processos</h2>
    <SearchBar v-model="cnj" ref="input" @submit="search" class="max-w-[50vw]"></SearchBar>
  </div>
</template>

<style></style>
