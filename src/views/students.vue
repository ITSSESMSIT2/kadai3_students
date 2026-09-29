<script setup lang="ts">
import Search from '@/components/Search.vue'
import SearchResult from '@/components/SearchResult.vue'
</script>
<template>
  <body>
    <!-- ここに絞り込み条件の画面 -->
    <div class="searchPanel">
      <Search />
    </div>
    <!-- 児童生徒一覧のパネル -->

    <div class="SearchResultPanel">
      <SearchResult />
    </div>
  </body>
</template>
<style>
body {
  background: #f5f5f5;
  margin: 0%;
}
</style>
