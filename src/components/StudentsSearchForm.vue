<script setup lang="ts"></script>

<template>
  <div class="sarchPanel">
    <h2>絞り込み条件</h2>
    学校（複数選択） 学年、組、フリーワード 要フォローのみ表示（ラジオ） 並び替え（セレクト） 昇順
    <button>絞り込みをクリア</button>
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
