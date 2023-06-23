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
  <div class="flex items-center justify-center gap-x-10 flex-wrap mb-10">
    <div
      class="flex flex-col items-start w-full md:px-10 lg:w-fit px-4 lg:px-0"
    >
      <div class="text-white font-semibold text-lg">#{{ pokemon?.id }}</div>
      <div
        class="capitalize text-white font-black sm:text-8xl text-5xl break-all max-w-full"
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
      <BasePokemon :img="pokemonStore.pokemonImage" class="block lg:hidden" />
      <div class="flex flex-col w-full sm:w-[300px] gap-3 mt-6">
        <BaseStat
          v-for="s in pokemon?.stats"
          :key="s.stat.name"
          :stat="s"
        ></BaseStat>
      </div>
    </div>
    <BasePokemon
      :img="pokemonStore.pokemonImage"
      glb-path="3D/pikachu.glb"
      class="hidden lg:block"
    />
  </div>
</template>
