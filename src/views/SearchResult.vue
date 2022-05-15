<script setup lang="ts">
import type Processo from "@/classes/processo";
import { ref } from "vue";
import SearchBar from "../components/SearchBar.vue";
import { processo as mock } from "../classes/mocks";
import { RouterLink } from "vue-router";
import { apiStore } from "../stores/api";

const props = defineProps<{
  cnj: string;
}>();

const cnj = ref(props.cnj);
const processo = ref<Processo | null>(mock);

// apiStore.search(cnj.value).then((res) => {
//   list.value = res;
// });
</script>

<template>
  <div>
    <div class="grid grid-cols-[1fr_auto_1fr] bg-zinc-800 px-6 py-4 gap-4">
      <RouterLink to="/" class="my-auto flex gap-2 items-center place-self-start p-2">
        <img src="./../assets/logo.png" alt="Logo Digesto" class="w-8 h-8" />
        <span class="text-red-300 text-lg tracking-wider">DIGESTO</span>
      </RouterLink>
      <div class="mx-auto flex flex-col gap-2">
        <h6 class="text-red-200">Pesquisar processo por CNJ:</h6>
        <SearchBar v-model="cnj" :dense="true" class="min-w-[50vw]"></SearchBar>
      </div>
    </div>
    <div class="m-6">
      <pre>{{ processo }}</pre>
    </div>
  </div>
</template>

<style></style>
