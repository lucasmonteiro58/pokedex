<script setup lang="ts"></script>

<template>
  <div class="min-h-screen bg-green-500">
    <header class="w-full h-full px-8 py-8 flex justify-between">
      <div class="flex items-center text-white">
        <IconPokeball width="50" />
        <div class="font-black text-5xl ml-4">Pokédex</div>
      </div>

      <InputSearch />
    </header>
    <NuxtPage />
  </div>
</template>
