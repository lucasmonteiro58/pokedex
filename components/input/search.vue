<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
}>();
const emit = defineEmits(["update:modelValue", "search"]);

const data = useVModel(props, "modelValue", emit);
</script>

<template>
  <input
    v-model="data"
    :placeholder="props.placeholder || 'Search...'"
    class="bg-white px-4 py-2"
    @keypress.enter="emit('search', data)"
  />
</template>
