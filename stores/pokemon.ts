import { StyleValue } from "nuxt/dist/app/compat/capi";
import { IPokemon } from "~/types/pokemon";

const usePokemonStore = defineStore("pokemon", () => {
  const pokemon = ref<IPokemon>({} as IPokemon);
  const loading = ref<boolean>(false);
  const totalPokemons = ref<number>(0);
  const predominantColor = ref<string | null>(null);

  const bgSolid = computed((): StyleValue => {
    return {
      backgroundColor: predominantColor.value,
    } as StyleValue;
  });

  function setPokemon(newPokemon: IPokemon) {
    pokemon.value = newPokemon;
    setPredominantColor(newPokemon.sprites?.other?.home?.front_default);
  }

  async function setPredominantColor(imageUrl: string | undefined) {
    predominantColor.value = await getPredominantColor(imageUrl);
  }

  return {
    pokemon,
    loading,
    totalPokemons,
    setPokemon,
    predominantColor,
    bgSolid,
  };
});

export default usePokemonStore;
