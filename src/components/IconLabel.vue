<script setup lang="ts">
defineProps<{
  icon: string;
}>();
</script>

<template>
  <div class="inline-flex gap-2 items-center">
    <font-awesome-icon :icon="icon" class="w-4 h-4 text-zinc-500"></font-awesome-icon>
    <slot />
  </div>
</template>
