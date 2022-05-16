<script setup lang="ts">
import type Processo from "@/classes/processo";
import { computed, defineComponent, reactive, ref } from "vue";
import SearchBar from "../components/SearchBar.vue";
import Chip from "../components/Chip.vue";
import IconLabel from "../components/IconLabel.vue";
import { processo as mock } from "../classes/mocks";
import { RouterLink } from "vue-router";
import { apiStore } from "../stores/api";
import NaturezaDg from "@/classes/naturezaDg";
import Instancia from "@/classes/instancia";

const props = defineProps<{
  cnj: string;
}>();

const cnj = ref(props.cnj);
const processo = ref<Processo | null>(mock);

apiStore
  .search(cnj.value)
  .then((res) => {
    processo.value = res;
  })
  .catch((err) => {});

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
  let className = "font-semibold ";
  if (estado == "Extinto") {
    className += "border-transparent bg-zinc-700 text-white";
  } else if (estado != "Arquivado") {
    className += "border-green-300 bg-green-200";
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

function useToggle() {
  const isToggled = ref(false);
  function toggle() {
    isToggled.value = !isToggled.value;
  }
  return reactive({
    isToggled,
    toggle,
  });
}

const otherInfoToggle = useToggle();
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
    <div class="p-6 max-w-[1024px] mx-auto mb-20">
      <h2>
        Processo {{ processo.area }} <span class="text-gray-500">{{ processo.numero }}</span>
      </h2>
      <div class="mb-3 flex gap-2 items-center">
        <Chip :class="classForEstado">{{ estadoProcesso }}</Chip>

        <span class="text-sm text-gray-600">
          Criado em {{ Intl.DateTimeFormat("pt-BR").format(processo.criadoEm) }} ·
          {{ anexosText }}
        </span>
      </div>
      <hr class="border-t-gray-300" />

      <div class="props mt-6">
        <div>
          <span>Última atualização:</span
          >{{ Intl.DateTimeFormat("pt-BR").format(ultimaAtualizacao) }}
        </div>
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
        <div v-if="processo.valor">
          <span>Valor:</span
          >{{
            Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(processo.valor)
          }}
        </div>
      </div>

      <div
        class="mt-4 bg-gray-100 border-gray-200 border px-4 pt-2 pb-3 rounded-lg flex flex-col gap-1"
      >
        <span class="label">Foro:</span>
        {{ processo.foro }} - Vara {{ processo.vara }}
        <IconLabel icon="location-dot" class="mt-2">
          <span>{{ capitalize(processo.comarca) }}</span> - {{ processo.uf }}
        </IconLabel>
        <IconLabel icon="user" v-if="processo.juiz"> Juiz {{ processo.juiz }} </IconLabel>
        <IconLabel icon="gavel">
          <span>Tribunal {{ processo.tribunal }}</span>
        </IconLabel>
      </div>

      <button class="text-blue-800 mt-4 hover:underline" @click="otherInfoToggle.toggle()">
        Ver {{ otherInfoToggle.isToggled ? "menos" : "mais" }} detalhes...
      </button>

      <div class="mt-4" v-if="otherInfoToggle.isToggled">
        <h5>Outras informações</h5>

        <div class="props mt-2">
          <div><span>Instância: </span> {{ Instancia.getDescricao(processo.instancia) }}</div>
          <div><span>Sistema fonte: </span> {{ processo.fonte_sistema }}</div>
          <div><span>Identificador original: </span> {{ processo.numeroAlternativo }}</div>
          <ul class="flex-col">
            <span>Classes: </span>
            <li v-for="classe in processo.classes">{{ classe }}</li>
          </ul>
          <ul class="flex-col">
            <span>Assuntos: </span>
            <li v-for="assunto in processo.assuntoExtra.split(',')">{{ assunto }}</li>
          </ul>
        </div>
      </div>

      <div class="section">
        <h3>Processos Relacionados</h3>
        <hr />
        <p v-if="(processo.processosRelacionados?.length || 0) == 0">Nenhum</p>
        <div class="section-list" v-for="relacionado in processo.processosRelacionados">
          <div class="title">Tribunal {{ relacionado.tribunal }} - {{ relacionado.natureza }}</div>
          <div class="subtitle">
            {{ Intl.DateTimeFormat("pt-BR").format(relacionado.distribuicao_data) }} ·
            {{ relacionado.numero }}
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Audiências</h3>
        <hr />
        <p v-if="(processo.audiencias?.length || 0) == 0">Sem audiências</p>
        <div class="section-list" v-for="audiencia in processo.audiencias">
          <div class="title">{{ audiencia.tipo }} - {{ audiencia.local }}</div>
          <div class="subtitle">
            <Chip
              v-if="audiencia.situacao"
              :dense="true"
              class="bg-red-400 border-none text-white font-semibold lowercase"
              >{{ audiencia.situacao }}</Chip
            >
            {{ Intl.DateTimeFormat("pt-BR").format(audiencia.data) }}
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Partes</h3>
        <hr />
        <div class="section-list" v-for="parte in processo.partes">
          <div class="title">{{ parte.nome }}</div>
          <div class="text-sm font-semibold text-gray-400 mb-1">
            {{ parte.relacaoNormalizado }}
          </div>

          <IconLabel
            v-if="(parte.advogados?.length || 0) > 0"
            icon="user-tie"
            class="text-gray-700 capitalize mt-1 mb-1"
          >
            {{ parte.advogados.map((a) => a.nome.toLowerCase()).join(", ") }}
          </IconLabel>
          <hr class="mt-1" />
        </div>
      </div>

      <div class="section">
        <div class="flex">
          <h3 class="leading-[1em] mb-3">Anexos</h3>
          <div
            v-if="processo.anexos?.length > 0"
            class="ml-2 rounded-full bg-red-500 text-white w-5 h-5 text-xs flex items-center justify-center mt-2"
          >
            {{ processo.anexos.length }}
          </div>
        </div>
        <hr />
        <p v-if="(processo.anexos?.length || 0) == 0">Sem anexos</p>
        <div class="section-list" v-for="anexo in processo.anexos">
          <div class="title">{{ anexo.titulo || "Sem título" }}</div>
          <div class="subtitle">
            <Chip
              :dense="true"
              class="bg-gray-200 border-transparent text-gray-600 font-semibold lowercase mr-1"
              >{{ anexo.descricaoTipo }}</Chip
            >
            {{ Intl.DateTimeFormat("pt-BR").format(anexo.dataPublicacao) }} · obtido em
            {{ Intl.DateTimeFormat("pt-BR").format(anexo.dataObtencao) }}
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Movimentações</h3>
        <hr />
        <div class="section-list" v-for="mov in processo.movs">
          <div class="title">{{ mov.tipo || "Sem título" }}</div>
          <div class="subtitle">
            {{ Intl.DateTimeFormat("pt-BR").format(mov.data) }}
          </div>
          <div class="flex gap-2 my-2">
            <Chip
              :dense="true"
              v-for="tipoNormal in mov.tiposNormalizados"
              class="bg-gray-200 border-transparent text-gray-600 font-semibold lowercase mr-1"
            >
              {{ tipoNormal.tipo }}</Chip
            >
          </div>
          <p class="my-3">
            {{ mov.texto }}
          </p>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.props {
  @apply flex flex-col gap-1;
}

.props > * {
  @apply flex text-gray-700;
}

.props > * > span {
  @apply label;
}

.label {
  @apply font-semibold text-gray-700 mr-2;
}

.section {
  @apply mt-10;
}

.section > hr {
  @apply mb-1;
}

.section-list {
  @apply flex flex-col py-1.5;
}

.section-list > .title {
  @apply text-lg text-gray-800;
}

.section-list > .subtitle {
  @apply text-sm text-gray-500;
}
</style>
