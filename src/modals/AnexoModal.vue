<script setup lang="ts">
import type Anexo from "@/classes/anexo";
import { computed, ref } from "vue";

const isOpen = ref(false);
const data = ref<Anexo | null>(null);

function open(modalData?: any) {
  isOpen.value = true;
  data.value = modalData;
}

function close() {
  isOpen.value = false;
}

defineExpose({
  isOpen,
  open,
  close,
});
</script>

<template>
  <Modal v-model="isOpen" :close="close">
    <div class="modal" v-if="data">
      <h5>Prévia do anexo: "{{ data.titulo || "Sem título" }}"</h5>
      <div class="text-gray-600">
        {{ Intl.DateTimeFormat("pt-BR").format(data.dataPublicacao) }}
      </div>
      <hr class="my-2" />
      <pre class="bg-gray-50 overflow-auto max-h-full p-2">{{ data.conteudo }}</pre>
      <div class="flex mt-4 lg:mt-6">
        <button class="btn ml-auto" @click="close">Fechar</button>
      </div>
    </div>
  </Modal>
</template>
