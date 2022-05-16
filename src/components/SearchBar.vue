<script setup lang="ts">
import { ref } from "vue";

const input = ref<HTMLInputElement | null>(null);
const {
  modelValue,
  dense = false,
  mask = null,
} = defineProps<{
  modelValue: string;
  dense?: boolean;
  mask?: any;
}>();

function focus() {
  input?.value?.focus();
}

function blur() {
  input?.value?.blur();
}

defineEmits(["update:modelValue", "submit"]);
defineExpose({
  focus,
  blur,
});
</script>

<template>
  <input
    ref="input"
    type="text"
    v-maska="mask"
    class="rounded-full w-full bg-gray-200"
    :class="dense ? 'px-4 py-2' : 'py-6 px-8 text-xl'"
    title="CNJ do processo"
    placeholder="CNJ do processo"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event?.target as HTMLInputElement).value)"
    @keypress.enter="$emit('submit')"
  />
</template>

<style></style>
