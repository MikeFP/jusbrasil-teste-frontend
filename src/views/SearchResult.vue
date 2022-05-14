<script setup lang="ts">
import { ref } from "vue";
import SearchBar from "../components/SearchBar.vue";

const props = defineProps<{
  cnj: string;
}>();

const cnj = ref(props.cnj);
</script>

<template>
  <div>
    <div class="flex bg-sky-800 px-6 py-4">
      <div class="mx-auto flex flex-col gap-2">
        <h6 class="text-white">Exibindo processos para CNJ:</h6>
        <SearchBar v-model="cnj" ref="input" :dense="true" class="min-w-[50vw]"></SearchBar>
      </div>
    </div>
    <div class="m-6">0 resultados</div>
  </div>
</template>

<style></style>
