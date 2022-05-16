<script setup lang="ts">
const { dense = false } = defineProps<{
  dense?: boolean;
}>();
</script>

<template>
  <div
    class="border-gray-400 font-semibold lowercase border py-1 px-4 inline-flex items-center rounded-full"
    :class="dense ? 'px-2 py-0 text-sm rounded-md' : ''"
  >
    <slot />
  </div>
</template>
