<script setup lang="ts">
import type Processo from "@/classes/processo";
import { ref } from "vue";
import SearchBar from "../components/SearchBar.vue";
import { processo as mock } from "../classes/mocks";
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
    <div class="flex bg-sky-800 px-6 py-4">
      <div class="mx-auto flex flex-col gap-2">
        <h6 class="text-white">Pesquisar processo por CNJ:</h6>
        <SearchBar v-model="cnj" :dense="true" class="min-w-[50vw]"></SearchBar>
      </div>
    </div>
    <div class="m-6">
      <pre>{{ processo }}</pre>
    </div>
  </div>
</template>

<style></style>
