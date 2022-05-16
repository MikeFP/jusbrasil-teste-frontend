<script setup lang="ts">
import type Advogado from "@/classes/advogado";
import type ParteProcesso from "@/classes/parteProcesso";
import { computed, ref } from "vue";

const isOpen = ref(false);
const data = ref<{
  parte?: ParteProcesso;
  advogado?: Advogado;
}>(null);

function open(modalData?: any) {
  isOpen.value = true;
  data.value = modalData;
}

function close() {
  isOpen.value = false;
}

const subtitleForParteModal = computed(() => {
  if (data.value.advogado) {
    return "Advogado";
  }
  return "Parte " + data.value.parte.descricaoPapel;
});

defineExpose({
  isOpen,
  open,
  close,
});
</script>

<template>
  <Modal v-model="isOpen" :close="close">
    <div class="modal" v-if="data">
      <h5>{{ (data.parte || data.advogado).nome }}</h5>
      <div class="text-gray-600">{{ subtitleForParteModal }}</div>
      <hr class="my-2" />
      <div class="props" v-if="data.parte">
        <div>
          <span>Relação: </span><span class="capitalize">{{ data.parte.relacaoNormalizado }}</span>
        </div>
        <div>
          <span>{{ data.parte.fisica ? "CPF" : "CNPJ" }}: </span
          ><span class="capitalize">{{ data.parte.documento || "-" }}</span>
        </div>
        <div>
          <span>CEP: </span><span class="capitalize">{{ data.parte.cep || "-" }}</span>
        </div>
      </div>
      <div class="props" v-else>
        <div>
          <span>OAB: </span><span>{{ data.advogado.oab || "-" }}</span>
        </div>
        <div>
          <span>CPF: </span><span>{{ data.advogado.cpf || "-" }}</span>
        </div>
        <div>
          <span>UF: </span><span>{{ data.advogado.uf || "-" }}</span>
        </div>
      </div>
    </div>
  </Modal>
</template>
