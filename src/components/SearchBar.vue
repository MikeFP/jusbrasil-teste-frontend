<script setup lang="ts">
import { ref } from "vue";

const input = ref<HTMLInputElement | null>(null);
const { modelValue, dense = false } = defineProps<{
  modelValue: string;
  dense?: boolean;
}>();
const emit = defineEmits(["update:modelValue", "submit"]);
defineExpose({
  focus,
});

function focus() {
  input?.value?.focus();
}

function submit() {
  input?.value?.blur();
  emit("submit");
}
</script>

<template>
  <input
    ref="input"
    type="text"
    class="rounded-full w-full bg-gray-200"
    :class="dense ? 'px-4 py-2' : 'py-6 px-8 text-xl'"
    title="CNJ do processo"
    placeholder="CNJ do processo"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event?.target as HTMLInputElement).value)"
    @keypress.enter="submit"
  />
</template>

<style></style>
