<script setup lang="ts">
import usePokemonStore from "~/stores/pokemon";
import { IPokemon } from "~/types/pokemon";

const pokemonStore = usePokemonStore();

const pokemon = computed<IPokemon | undefined>(() => pokemonStore.pokemon);

const nameMargin = computed(() => {
  const name = pokemon?.value?.name?.toLowerCase();
  return name && (name[0] === "q" || /[gjpqy]/.test(name.slice(1)));
});
</script>

<template>
  <div class="flex items-center justify-center gap-x-10 flex-wrap">
    <div
      class="flex flex-col items-start w-full md:px-10 lg:w-fit px-4 lg:px-0"
    >
      <div class="text-white font-semibold text-lg">#{{ pokemon?.id }}</div>
      <div
        class="capitalize text-white font-black sm:text-8xl text-5xl truncate"
        :class="nameMargin ? 'mb-4' : 'mb-0'"
      >
        {{ pokemon?.name }}
      </div>
      <div class="flex gap-2 mt-1">
        <LayoutBagde
          v-for="t in pokemon?.types"
          :key="t.slot"
          :name="t.type?.name"
        ></LayoutBagde>
      </div>
    </div>
    <div class="sm:min-w-[500px] sm:min-h-[500px] min-w-fit min-h-fit">
      <img :src="pokemonStore.pokemonImage" alt="" class="" />
    </div>
  </div>
</template>
