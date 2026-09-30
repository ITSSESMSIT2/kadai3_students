<script setup lang="ts"></script>

<template>
  <div class="sarchPanel">
    <h2>絞り込み条件</h2>
    <SearchForm />
  </div>
</template>

<style scoped>
.sarchPanel {
  background-color: var(--bg);
  padding: var(--space-md) var(--space-sm);
  margin: var(--space-md);
  border: var(--elevation-1);
  border-radius: var(--radius-sm);
}
</style>
