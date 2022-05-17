<script setup lang="ts">
import * as CounterModel from '../models/Counter';

defineProps<{ msg: string }>()
</script>

<template>
  count is: {{ CounterModel.COUNT }}
  <button type="button" @click="CounterModel.addCount">count+1</button>
  <button type="button" @click="CounterModel.reduceCount">count-1</button>
</template>

<style scoped></style>
