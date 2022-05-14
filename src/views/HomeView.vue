<script setup lang="ts">
import router from "@/router";
import { onMounted, ref } from "vue";

const input = ref<HTMLInputElement | null>(null);
const cnj = ref("");

onMounted(() => {
  input?.value?.focus();
});

function search() {
  if (cnj.value !== "") {
    router.push("/search");
  }
}
</script>

<template>
  <div class="h-[80vh] bg-sky-800 px-6 flex flex-col gap-8 items-center justify-center">
    <h2 class="text-white">Acompanhar processo</h2>
    <input
      ref="input"
      type="text"
      class="p-6 rounded-full w-full max-w-[50vw] bg-gray-200"
      title="CNJ do processo"
      placeholder="CNJ do processo"
      v-model="cnj"
      @keypress.enter="search"
    />
  </div>
</template>

<style></style>
