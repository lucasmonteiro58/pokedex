<script setup lang="ts">
import usePokemonStore from "~/stores/pokemon";

const { init } = useApi();
const pokemonStore = usePokemonStore();

onMounted(() => {
  init();
});
</script>

<template>
  <LoadingScreen v-if="pokemonStore.loading" />
  <BasePokedex v-else></BasePokedex>
</template>
