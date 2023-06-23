<script setup lang="ts">
import { animate, ElementOrSelector } from "motion";
import { Stat } from "~/types/pokemon";

const props = defineProps<{
  stat: Stat;
}>();

const elAnim = ref<HTMLElement | null>(null);

const statName = computed(() =>
  props.stat.stat.name.replace("-", " ").replace("special", "sp.")
);
const statValue = computed(() => props.stat.base_stat);

const sizeToPercent = (size: number) => {
  const max = 255;
  const base = 100;
  return (size / max) * base;
};

onMounted(() => {
  const size = sizeToPercent(props.stat.base_stat);
  animate(
    elAnim?.value as ElementOrSelector,
    { width: `${size}%` },
    { duration: size * 0.05, easing: "ease-out" }
  );
});
</script>

<template>
  <div class="w-full flex flex-col">
    <div class="uppercase text-white font-semibold text-sm">
      {{ statName }}: <span class="font-bold">{{ statValue }}</span>
    </div>
    <div class="bg-[#ffffff3d] h-2 w-full rounded mt-1">
      <div ref="elAnim" class="bg-white h-2 rounded w-0"></div>
    </div>
  </div>
</template>
