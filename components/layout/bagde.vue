<script setup lang="ts">
import pokemonTypes from "~/data/pokemon-types.json";
const props = defineProps<{
  name: string;
}>();

function getTypeColor(name: string) {
  const type = pokemonTypes.types.find((t) => t.name === name);
  return type?.color;
}

const style = computed((): StyleValue => {
  return {
    backgroundColor: getTypeColor(props.name) || "gray",
  };
});
</script>

<template>
  <div class="px-3 py-1 w-fit text-white rounded-md shadow-sm" :style="style">
    {{ name }}
  </div>
</template>
