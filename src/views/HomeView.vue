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
  if (cnj.value !== "") {
    router.push(`/search/${cnj.value}`);
  }
}
</script>

<template>
  <div class="h-[80vh] bg-zinc-800 px-6 py-16 flex flex-col gap-8 items-center justify-center">
    <div class="flex items-center gap-4">
      <img src="./../assets/logo.png" alt="Logo Digesto" class="w-16 h-16" />
      <h2 class="text-red-200">Pesquisar processo</h2>
    </div>
    <SearchBar v-model="cnj" ref="input" @submit="search" class="lg:max-w-[50vw] md:max-w-[70vw]"></SearchBar>
  </div>
</template>

<style></style>
