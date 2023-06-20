<script setup lang="ts">
import usePokemonStore from "~/stores/pokemon";
import { IPokemon } from "~/types/pokemon";

const { init } = useApi();
const pokemonStore = usePokemonStore();

const pokemon = computed<IPokemon | undefined>(() => pokemonStore.pokemon);

onMounted(() => {
  init();
});
</script>

<template>
  <div>
    <img :src="pokemon?.sprites?.other?.home.front_default" alt="" />
  </div>
</template>
