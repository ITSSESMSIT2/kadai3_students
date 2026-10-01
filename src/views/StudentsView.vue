<script setup lang="ts">
import Search from '@/components/Search.vue'
import SearchResult from '@/components/SearchResult.vue'
</script>
<template>
  <!-- ここに絞り込み条件の画面 -->
  <div class="studentSearchPage">
    <div class="searchPanel">
      <Search />
    </div>
    <!-- 児童生徒一覧のパネル -->

    <div class="SearchResultPanel">
      <SearchResult />
    </div>
  </div>
</template>
<style scoped>
.studentSearchPage {
  background-color: var(--bg);
}
</style>
