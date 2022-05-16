<script setup lang="ts">
import router from "@/router";
import { onMounted, ref } from "vue";
import SearchBar from "../components/SearchBar.vue";
import { isValidCnj, cnjMask } from "@/utils/validators";

const input = ref<typeof SearchBar | null>(null);
const cnj = ref("");
const errorMessage = ref<string | null>(null);

onMounted(() => {
  input?.value?.focus();
});

function search() {
  const validation = isValidCnj(cnj.value);
  if (validation === true) {
    router.push(`/search/${cnj.value}`);
  } else {
    errorMessage.value = validation;
  }
}
</script>

<template>
  <div class="h-[80vh] bg-zinc-800 px-6 py-16 flex flex-col gap-8 items-center justify-center">
    <div class="flex flex-col text-center sm:flex-row items-center gap-4">
      <img src="./../assets/logo.png" alt="Logo Digesto" class="w-16 h-16" />
      <h2 class="text-red-200">Pesquisar processo</h2>
    </div>
    <div class="flex justify-center relative w-full">
      <SearchBar
        v-model="cnj"
        ref="input"
        :mask="cnjMask"
        @submit="search"
        class="lg:max-w-[50vw] md:max-w-[70vw] flex-grow"
      ></SearchBar>
      <span v-if="errorMessage" class="text-yellow-400 absolute -bottom-12"
        ><font-awesome-icon icon="circle-exclamation" class="mr-2" />{{ errorMessage }}</span
      >
    </div>
  </div>
</template>

<style></style>
