import { StyleValue } from "nuxt/dist/app/compat/capi";
import { IPokemon } from "~/types/pokemon";

const usePokemonStore = defineStore("pokemon", () => {
  const pokemon = ref<IPokemon>({} as IPokemon);
  const loadingRequest = ref<boolean>(false);
  const loadingImage = ref<boolean>(true);
  const totalPokemons = ref<number>(0);
  const predominantColor = ref<string | null>(null);

  const pokemonImage = computed<string | undefined>(() => {
    return (
      pokemon.value?.sprites?.other?.home.front_default ||
      pokemon.value?.sprites?.other?.["official-artwork"].front_default ||
      pokemon.value?.sprites?.front_default
    );
  });

  const bgSolid = computed((): StyleValue => {
    return {
      backgroundColor: predominantColor.value,
    } as StyleValue;
  });

  const loading = computed<boolean>(() => {
    return loadingRequest.value || loadingImage.value;
  });

  function setPokemon(newPokemon: IPokemon) {
    pokemon.value = newPokemon;
    setPredominantColor(pokemonImage.value);
  }

  async function setPredominantColor(imageUrl: string | undefined) {
    predominantColor.value = await getPredominantColor(imageUrl).finally(() => {
      loadingImage.value = false;
    });
  }

  return {
    pokemon,
    pokemonImage,
    loadingRequest,
    loadingImage,
    totalPokemons,
    setPokemon,
    predominantColor,
    bgSolid,
    loading,
  };
});

export default usePokemonStore;
