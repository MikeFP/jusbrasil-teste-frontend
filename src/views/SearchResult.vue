<script setup lang="ts">
import type Processo from "@/classes/processo";
import { computed, ref } from "vue";
import SearchBar from "../components/SearchBar.vue";
import Chip from "../components/Chip.vue";
import { processo as mock } from "../classes/mocks";
import { RouterLink } from "vue-router";
import { apiStore } from "../stores/api";
import NaturezaDg from "@/classes/naturezaDg";

const props = defineProps<{
  cnj: string;
}>();

const cnj = ref(props.cnj);
const processo = ref<Processo | null>(mock);

// apiStore.search(cnj.value).then((res) => {
//   list.value = res;
// });

const estadoProcesso = computed(() => {
  const p = processo.value;
  let estado = p.situacao ?? "Ativo";
  if (p.arquivado) {
    estado = "Arquivado";
  } else if (p.extinto) {
    estado = "Extinto";
  }
  return estado;
});

const classForEstado = computed(() => {
  const estado = estadoProcesso.value;
  let className = "";
  if (estado == "Arquivado") {
    className = "border-none bg-orange-400 text-white";
  } else if (estado == "Extinto") {
    className = "border-none bg-zinc-700 text-white";
  } else if (estado != "Ativo") {
    className = "border-green-300 bg-green-200";
  }
  return className;
});

const anexosText = computed(() => {
  const p = processo.value;
  const count = p.anexos?.length ?? 0;
  let res = `${count} anexos`;
  if (p.flag === 0) {
    if (count > 0) {
      res += " físicos";
    } else {
      res = "Processo físico";
    }
  }
  return res;
});

const ultimaAtualizacao = computed(() => {
  return processo.value.alteradoEm;
});

const natureza = computed(() => {
  return NaturezaDg.getDescricao(processo.value.classeNatureza_dg);
});

function capitalize(value: string) {
  let res = value.toLowerCase();
  res = res[0].toUpperCase() + res.substring(1);
  return res;
}
</script>

<template>
  <div>
    <div class="grid grid-cols-[1fr_auto_1fr] bg-zinc-800 px-6 py-4 gap-4">
      <RouterLink to="/" class="my-auto flex gap-2 items-center place-self-start p-2">
        <img src="./../assets/logo.png" alt="Logo Digesto" class="w-8 h-8" />
        <span class="text-red-200 text-lg tracking-wider">DIGESTO</span>
      </RouterLink>
      <div class="mx-auto flex flex-col gap-2">
        <h6 class="text-red-200">Pesquisar processo por CNJ:</h6>
        <SearchBar v-model="cnj" :dense="true" class="min-w-[50vw]"></SearchBar>
      </div>
    </div>
    <div class="p-6 max-w-[1024px] mx-auto">
      <h2>
        Processo {{ processo.area }} <span class="text-gray-500">{{ processo.numero }}</span>
      </h2>
      <hr class="border-t-gray-300" />
      <div class="mt-2 flex gap-2 items-center">
        <Chip :class="classForEstado">{{ estadoProcesso }}</Chip>

        <span class="text-sm text-gray-600">
          Criado em {{ Intl.DateTimeFormat("pt-BR").format(processo.criadoEm) }} ·
          {{ anexosText }}
        </span>
      </div>

      <div class="props mt-6">
        <div><span>Última atualização:</span>{{ ultimaAtualizacao }}</div>
        <div class="gap-1">
          <span>Características:</span>
          <Chip
            v-if="processo.liminar"
            :dense="true"
            class="bg-blue-500 border-0 font-semibold text-gray-100"
            >liminar</Chip
          >
          <Chip
            v-if="processo.segredo_justica"
            :dense="true"
            class="bg-gray-900 border-0 font-semibold text-gray-100"
            >segredo</Chip
          >
          <Chip
            v-if="processo.gratuita"
            :dense="true"
            class="bg-green-500 border-0 font-semibold text-black"
            >gratuita</Chip
          >

          <span v-if="!processo.gratuita && !processo.segredo_justica && !processo.liminar">-</span>
        </div>
        <div><span>Natureza:</span>{{ natureza }}</div>
        <div>
          <span>Valor:</span
          >{{
            Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(processo.valor)
          }}
        </div>
      </div>

      <div class="mt-4 bg-gray-200 px-4 pt-2 pb-3 rounded-lg flex flex-col gap-1">
        <span class="label">Foro:</span>
        {{ processo.foro }} - Vara {{ processo.vara }}
        <div class="icon-label mt-2">
          <font-awesome-icon icon="location-dot"></font-awesome-icon>
          <span>{{ capitalize(processo.comarca) }}</span> - {{ processo.uf }}
        </div>
        <div class="icon-label" v-if="processo.juiz">
          <font-awesome-icon icon="user"></font-awesome-icon>
          Juiz {{ processo.juiz }}
        </div>
        <div class="icon-label">
          <font-awesome-icon icon="gavel"></font-awesome-icon>
          <span>Tribunal {{ processo.tribunal }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.props {
  @apply flex flex-col gap-1;
}

.props > div {
  @apply flex text-gray-700;
}

.props > div > span {
  @apply label;
}

.label {
  @apply font-semibold text-gray-600 mr-2;
}

.icon-label {
  @apply flex gap-2 items-center;
}

.icon-label > :first-child {
  @apply w-4 h-4 text-zinc-500;
}
</style>
