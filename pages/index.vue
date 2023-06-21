<script setup lang="ts">
import usePokemonStore from "~/stores/pokemon";
import { IPokemon } from "~/types/pokemon";

const { init } = useApi();
const pokemonStore = usePokemonStore();

const pokemon = computed<IPokemon | undefined>(() => pokemonStore.pokemon);

const nameMargin = computed(() => {
  const name = pokemon?.value?.name?.toLowerCase();
  return name && (name[0] === "q" || /[gjpqy]/.test(name.slice(1)));
});

onMounted(() => {
  init();
});
</script>

<template>
  <div class="flex items-center justify-center gap-x-10">
    <div>
      <div class="text-white font-semibold text-lg">#{{ pokemon?.id }}</div>
      <div
        class="capitalize text-white font-black text-8xl"
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
    <img :src="pokemonStore.pokemonImage" alt="" />
  </div>
</template>
