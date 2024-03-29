<script setup lang="ts">
import type Processo from "@/classes/processo";
import { computed, ref, watch } from "vue";
import SearchBar from "../components/SearchBar.vue";
import Chip from "../components/Chip.vue";
import IconLabel from "../components/IconLabel.vue";
import { processo as mock } from "../classes/mocks";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { apiStore } from "../stores/api";
import NaturezaDg from "@/classes/naturezaDg";
import Instancia from "@/classes/instancia";
import ParteModal from "@/modals/ParteModal.vue";
import AnexoModal from "@/modals/AnexoModal.vue";
import useToggle from "@/utils/use-toggle";
import capitalize from "@/utils/capitalize";
import Spinner from "@/icons/Spinner.vue";
import { isValidCnj, cnjMask } from "@/utils/validators";
import { AxiosError } from "axios";

const router = useRouter();
const route = useRoute();
const props = defineProps<{
  cnj: string;
}>();

const input = ref<typeof SearchBar | null>();
const cnj = ref(props.cnj);
const searchQuery = ref(props.cnj);
const processo = ref<Processo | null>(null);
const isLoading = ref(true);
const errorMessage = ref<string | null>(null);
const apiErrorMessage = ref<string | null>(null);

watch(
  () => route.name,
  (routeName) => {
    if (routeName !== "search") {
      apiStore.cancelRequests();
    }
  }
);

function fetch() {
  processo.value = null;
  isLoading.value = true;
  apiErrorMessage.value = null;
  apiStore.cancelRequests();
  apiStore
    .search(cnj.value)
    .then((res) => {
      processo.value = res;
      isLoading.value = false;
    })
    .catch((err) => {
      isLoading.value = false;
      if (err.code && err.code == "ERR_CANCELED") {
        // Route was popped.
        return;
      }
      // [NOTE]: Remove this line when API works.
      processo.value = mock;
      if (err instanceof AxiosError && err.response.status == 404) {
        // [NOTE]: Uncomment this line when API works.
        // apiErrorMessage.value = "Processo não encontrado";
      } else {
        console.log(err);
        // [NOTE]: Uncomment this line when API works.
        // apiErrorMessage.value = "Ocorreu um erro inesperado, tente novamente";
      }
    });
}

function validate() {
  const validation = isValidCnj(cnj.value);
  if (validation === true) {
    errorMessage.value = null;
    return validation;
  }
  errorMessage.value = validation;
  return false;
}

function search() {
  if (validate()) {
    input?.value?.blur();
    searchQuery.value = cnj.value;
    router.push("/search/" + cnj.value);
    fetch();
  }
}

if (validate()) {
  fetch();
} else {
  // Redirect to home if invalid CNJ.
  router.replace("/");
}

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
  let className = "font-semibold capitalize ";
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

const natureza = computed(() => {
  return NaturezaDg.getDescricao(processo.value.classeNatureza_dg);
});

const otherInfoToggle = useToggle();
const movsListToggle = useToggle();
const parteModal = ref<typeof ParteModal | null>(null);
const anexoModal = ref<typeof AnexoModal | null>(null);
</script>

<template>
  <div>
    <div
      class="flex flex-col md:grid grid-cols-[1fr_auto_1fr] bg-zinc-800 px-6 pt-2 pb-3 md:py-4 md:gap-4"
    >
      <RouterLink
        to="/"
        class="m-auto md:my-auto md:mx-0 flex gap-2 items-center place-self-start p-2"
      >
        <img src="./../assets/logo.png" alt="Logo Digesto" class="w-8 h-8" />
        <span class="text-red-200 text-lg tracking-wider">DIGESTO</span>
      </RouterLink>
      <div class="sm:mx-10 md:mx-auto flex flex-col gap-2 relative">
        <div class="flex flex-col md:flex-row flex-wrap">
          <h6 class="text-red-200">Pesquisar processo por CNJ:</h6>
          <span v-if="errorMessage" class="md:ml-auto text-yellow-400"
            ><font-awesome-icon icon="circle-exclamation" class="mr-2" />{{ errorMessage }}</span
          >
        </div>
        <SearchBar
          ref="input"
          :mask="cnjMask"
          v-model="cnj"
          :dense="true"
          class="min-w-[50vw]"
          @submit="search"
        ></SearchBar>
      </div>
    </div>

    <div class="p-4 sm:p-6 max-w-[1024px] mx-auto mb-20" v-if="processo">
      <h2 class="text-2xl sm:text-4xl sm:mt-4 flex align-baseline gap-x-3 flex-wrap">
        <span>Processo {{ processo.area }}</span>
        <span class="text-gray-500 break-words max-w-full">{{ processo.numero }}</span>
      </h2>
      <div class="mb-3 flex gap-2 items-center flex-wrap">
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
          >{{ Intl.DateTimeFormat("pt-BR").format(processo.alteradoEm) }}
        </div>
        <div class="gap-1">
          <span>Características:</span>
          <Chip v-if="processo.liminar" :dense="true" class="bg-blue-500 border-0 text-gray-100"
            >liminar</Chip
          >
          <Chip
            v-if="processo.segredo_justica"
            :dense="true"
            class="bg-gray-900 border-0 text-gray-100"
            >segredo</Chip
          >
          <Chip v-if="processo.gratuita" :dense="true" class="bg-green-500 border-0 text-black"
            >gratuita</Chip
          >

          <span v-if="!processo.gratuita && !processo.segredo_justica && !processo.liminar">-</span>
        </div>
        <div><span>Natureza:</span>{{ natureza }}</div>
        <div><span>Instância: </span> {{ Instancia.getDescricao(processo.instancia) }}</div>
        <div v-if="processo.valor">
          <span>Valor da causa:</span
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
          <div>
            <span>Distribuição: </span> {{ processo.distribuicaoTipo }}, em
            {{ Intl.DateTimeFormat("pt-BR").format(processo.distribuicaoData) }}
          </div>
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
        <h3>Partes</h3>
        <hr />
        <div class="section-list" v-for="parte in processo.partes">
          <div
            class="flex gap-2 items-baseline group hover:cursor-pointer flex-wrap"
            @click="parteModal.open({ parte })"
          >
            <Chip :dense="true" class="bg-red-500 text-gray-100">
              {{ parte.descricaoPapel }}
            </Chip>
            <div class="title group-hover:underline">{{ parte.nome }}</div>
          </div>

          <IconLabel
            v-if="(parte.advogados?.length || 0) > 0"
            icon="user-tie"
            class="text-gray-700 capitalize mt-1 mb-1 items-baseline"
          >
            <div class="flex separate-comma gap-x-1 flex-wrap">
              <span
                v-for="advogado in parte.advogados"
                class="hover:cursor-pointer hover:underline"
                @click.prevent="parteModal.open({ advogado })"
              >
                {{ advogado.nome.toLowerCase() }}
              </span>
            </div>
          </IconLabel>
        </div>

        <ParteModal ref="parteModal" />
      </div>

      <div class="section" v-if="(processo.processosRelacionados?.length || 0) > 0">
        <h3>Processos Relacionados</h3>
        <hr />
        <div class="section-list" v-for="relacionado in processo.processosRelacionados">
          <div class="title">Tribunal {{ relacionado.tribunal }} - {{ relacionado.natureza }}</div>
          <div class="subtitle">
            {{ Intl.DateTimeFormat("pt-BR").format(relacionado.distribuicao_data) }} ·
            {{ relacionado.numero }}
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Movimentações</h3>
        <hr />
        <div
          class="section-list"
          v-for="mov in movsListToggle.isToggled ? processo.movs : processo.movs.slice(0, 3)"
        >
          <div class="title">{{ mov.tipo || "Sem título" }}</div>
          <div class="subtitle">
            {{ Intl.DateTimeFormat("pt-BR").format(mov.data) }}
          </div>
          <div class="flex gap-2 my-2 flex-wrap">
            <Chip
              :dense="true"
              v-for="tipoNormal in mov.tiposNormalizados"
              class="bg-gray-200 border-transparent text-gray-600 mr-1"
            >
              {{ tipoNormal.tipo }}</Chip
            >
          </div>
          <p class="my-3">
            {{ mov.texto }}
          </p>
          <hr />
        </div>
        <div
          v-if="(processo.movs?.length || 0) > 3"
          class="flex justify-center text-blue-800 hover:underline hover:cursor-pointer"
          @click="movsListToggle.toggle"
        >
          <span v-if="movsListToggle.isToggled">Ocultar movimentações</span>
          <span v-else>Ver mais {{ processo.movs.length - 3 }} movimentações</span>
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
              class="bg-red-500 border-none text-gray-100"
              >{{ audiencia.situacao }}</Chip
            >
            {{ Intl.DateTimeFormat("pt-BR").format(audiencia.data) }}
          </div>
        </div>
      </div>

      <div class="section">
        <div class="flex">
          <h3 class="leading-[1em] mb-3">Anexos</h3>
          <div
            v-if="processo.anexos?.length > 0"
            class="ml-2 rounded-full bg-gray-200 text-gray-600 font-semibold w-5 h-5 text-xs flex items-center justify-center mt-2"
          >
            {{ processo.anexos.length }}
          </div>
        </div>
        <hr />
        <p v-if="(processo.anexos?.length || 0) == 0">Sem anexos</p>
        <div
          class="section-list"
          :class="anexo.conteudo ? 'group hover:cursor-pointer' : ''"
          v-for="anexo in processo.anexos"
          @click="anexo.conteudo ? anexoModal.open(anexo) : null"
        >
          <div class="title group-hover:underline">{{ anexo.titulo || "Sem título" }}</div>
          <div class="subtitle">
            <Chip
              v-if="anexo.conteudo"
              :dense="true"
              class="bg-green-200 border-transparent text-gray-800 mr-1"
              >prévia</Chip
            >
            <Chip :dense="true" class="bg-gray-200 border-transparent text-gray-600 mr-1">{{
              anexo.descricaoTipo
            }}</Chip>
            <div class="flex">
              {{ Intl.DateTimeFormat("pt-BR").format(anexo.dataPublicacao) }} · obtido em
              {{ Intl.DateTimeFormat("pt-BR").format(anexo.dataObtencao) }}
            </div>
          </div>
        </div>

        <AnexoModal ref="anexoModal" />
      </div>
    </div>

    <div v-if="isLoading" class="flex h-full m-8">
      <div class="m-auto flex flex-col items-center gap-2">
        Pesquisando por {{ searchQuery }}
        <Spinner class="text-red-700 animate-spin w-8 h-8" />
      </div>
    </div>

    <div v-if="apiErrorMessage" class="flex h-full m-8 text-orange-600">
      <div class="m-auto flex flex-col items-center gap-2">
        {{ apiErrorMessage }}
      </div>
    </div>
  </div>
</template>

<style>
.props {
  @apply flex flex-col gap-1;
}

.props > * {
  @apply flex text-gray-700 flex-wrap;
}

.props > * > span:first-child {
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

.section-list .title {
  @apply text-lg text-gray-800;
}

.section-list .subtitle {
  @apply text-sm text-gray-500 flex items-start flex-wrap gap-1;
}
</style>
