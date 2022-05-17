<script setup lang="ts">
import * as CounterModel from './models/Counter';
import HelloWorld from './components/HelloWorld.vue';
import { cacheRef } from './hooks/Cache';

const [cacheText, initCacheText] = cacheRef('', 'cache_test');
initCacheText();

</script>

<template>
  <input type="text" v-model="cacheText">
  <hr />
  {{CounterModel.COUNT}}
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style></style>
