import type { IPokemon } from "~/types/pokemon";
import usePokemonStore from "~/stores/pokemon";

export default function () {
  const baseUrl = "https://pokeapi.co/api/v2";

  const pokemonStore = usePokemonStore();

  async function getPokemon(name: string | number) {
    try {
      pokemonStore.loading = true;
      const data = await fetch(`${baseUrl}/pokemon/${name}`);
      const pokemon: IPokemon = await data.json();
      pokemonStore.setPokemon(pokemon);
    } finally {
      pokemonStore.loading = false;
    }
  }

  async function getPokemonQuantity() {
    try {
      pokemonStore.loading = true;
      const data = await fetch(`${baseUrl}/pokemon-species`);
      const pokemons = await data.json();
      pokemonStore.totalPokemons = pokemons.count;
    } finally {
      pokemonStore.loading = false;
    }
  }

  async function init() {
    try {
      pokemonStore.loading = true;
      await getPokemonQuantity().finally(() => {
        getPokemon(Math.floor(Math.random() * pokemonStore.totalPokemons));
      });
    } finally {
      pokemonStore.loading = false;
    }
  }

  return {
    getPokemon,
    init,
  };
}
