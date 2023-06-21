<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
}>();
const emit = defineEmits(["update:modelValue", "search"]);

const data = useVModel(props, "modelValue", emit);
</script>

<template>
  <div class="flex">
    <input
      v-model="data"
      :placeholder="props.placeholder || 'Search...'"
      class="bg-white px-4 py-3 rounded-l w-full sm:w-[300px] outline-0"
      :disabled="props.disabled"
      @keypress.enter="emit('search', data)"
    />
    <button
      class="px-4 rounded-r bg-white text-gray-500"
      :disabled="props.disabled"
      @click="emit('search', data)"
    >
      <IconSpinner v-if="disabled" width="20" />
      <IconSearch v-else width="20" />
    </button>
  </div>
</template>
