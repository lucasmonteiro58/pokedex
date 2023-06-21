<script setup lang="ts">
import { useVModel, onClickOutside, useWindowSize } from "@vueuse/core";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
}>();
const emit = defineEmits(["update:modelValue", "search"]);

const { width } = useWindowSize();
const data = useVModel(props, "modelValue", emit);
const opened = ref(false);
const elRef = ref<HTMLElement | null>(null);

onClickOutside(elRef, () => {
  if (opened.value) {
    opened.value = false;
  }
});

const mobile = computed(() => width.value < 640);

function openInput() {
  opened.value = true;
}

onMounted(() => {
  if (props.modelValue) {
    opened.value = true;
  }
});
</script>

<template>
  <div v-if="opened || mobile" ref="elRef" class="flex animation-fade-left">
    <input
      v-model="data"
      :placeholder="props.placeholder || 'Search...'"
      class="bg-transparent text-white px-4 py-3 rounded-l-md w-full sm:w-[300px] outline-0 border-2 border-r-0 placeholder-gray-100 font-bold animation-border"
      :disabled="props.disabled"
      autofocus
      @keypress.enter="emit('search', data)"
    />
    <button
      class="px-4 rounded-r-md bg-transparent text-white border-2 border-l-0 animation-border"
      :disabled="props.disabled"
      @click="emit('search', data)"
    >
      <IconSpinner v-if="disabled" width="20" />
      <IconSearch v-else width="25" class="animation-zoom-out" />
    </button>
  </div>

  <button
    v-else
    class="h-[51.2px] flex items-center justify-end"
    @click="openInput"
  >
    <IconSearch
      color="white"
      width="35px"
      class="animation-zoom-in"
    ></IconSearch>
  </button>
</template>

<style>
.animation-fade-left {
  animation: fade-left 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

.animation-zoom-in {
  animation: zoom-in 0.8s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

.animation-zoom-out {
  animation: zoom-out 0.8s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

.animation-border {
  animation: border 0.8s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@keyframes fade-left {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes zoom-in {
  from {
    transform: scale(0.6) translateX(-25px);
  }
  to {
    transform: scale(1) translateX(0);
  }
}

@keyframes zoom-out {
  from {
    transform: scale(1.5) translateX(0px);
  }
  to {
    transform: scale(1) translateX(0);
  }
}

@keyframes border {
  from {
    border-color: transparent;
  }
  to {
    border-color: white;
  }
}
</style>
