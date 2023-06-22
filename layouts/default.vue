<script setup lang="ts">
import usePokemonStore from "~/stores/pokemon";

const { getPokemon } = useApi();
const search = ref("");

function searchPokemon(name: string) {
  if (!name) return;
  getPokemon(name);
}

const pokemonStore = usePokemonStore();
</script>

<template>
  <div
    class="min-h-screen flex flex-col flex-grow"
    :style="pokemonStore.bgSolid"
  >
    <div
      v-if="!pokemonStore.loading"
      class="w-full px-4 py-4 sm:px-8 sm:py-8 flex flex-col justify-between sm:flex-row items-center"
    >
      <div class="flex items-center text-white">
        <IconPokeball width="30" />
        <div class="font-black text-2xl ml-2">Pokédex</div>
      </div>

      <InputSearch
        v-model="search"
        class="mt-4 sm:mt-0 w-full sm:w-fit"
        placeholder="Search by Name or ID..."
        :disabled="pokemonStore.loading"
        @search="searchPokemon"
      />
    </div>
    <NuxtPage />
  </div>
</template>
