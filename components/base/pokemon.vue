<script setup lang="ts">
import { useMouseInElement, useDeviceOrientation } from "@vueuse/core";
defineProps<{
  img?: string;
}>();

const imgRef = ref<HTMLElement | null>(null);
const { elementX: mouseX, elementY: mouseY } = useMouseInElement(imgRef);
const { gamma: deviceGamma, beta: deviceBeta } = useDeviceOrientation();

const style = ref({
  transform: "",
});

const imageWidth = computed(() => {
  const img = imgRef.value;
  return img ? img.offsetWidth : 0;
});

const imageHeight = computed(() => {
  const img = imgRef.value;
  return img ? img.offsetHeight : 0;
});

function handleMouseMove(event: MouseEvent) {
  mouseX.value = event.clientX;
  mouseY.value = event.clientY;

  animateImage();
}

function animateImage() {
  const img = imgRef.value as HTMLElement;
  const centerX = img.offsetLeft + imageWidth.value / 2;
  const centerY = img.offsetTop + imageHeight.value / 2;
  const diffX = mouseX.value - centerX;
  const diffY = mouseY.value - centerY;
  const rotationX = (diffY / imageHeight.value) * -40;
  const rotationY = (diffX / imageWidth.value) * 40;

  style.value = {
    transform: `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
  };
}

function animateImageOrientation() {
  const diffX = deviceGamma.value;
  const diffY = deviceBeta.value;
  const rotationX = diffY ? (diffY / imageHeight.value) * -60 : 0;
  const rotationY = diffX ? (diffX / imageWidth.value) * 60 : 0;

  style.value = {
    transform: `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
  };
}

watch([deviceGamma, deviceBeta], animateImageOrientation);

function resetImage() {
  style.value = {
    transform: "",
  };
}
</script>

<template>
  <div
    class="sm:min-w-[500px] md:min-h-[500px] min-w-fit min-h-fit select-none"
  >
    <img
      ref="imgRef"
      :src="img"
      class="perspective-effect cursor-crosshair select-none"
      :style="style"
      @mousemove="handleMouseMove"
      @mouseleave="resetImage"
    />
  </div>
</template>

<style>
.perspective-effect {
  transition: all 0.3s;
}
</style>
