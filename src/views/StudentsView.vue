<script setup lang="ts">
import Search from '@/components/Search.vue'
import SearchResult from '@/components/SearchResult.vue'
import { getStudents } from '@/api/studentApi'

// API呼び出しのためのgetStudentsだが、そのまま使うと型エラーを起こすので一旦変数に格納する
const useGetStudents = getStudents()
</script>
<template>
  <!-- ここに絞り込み条件の画面 -->
  <div class="studentSearchPage">
    <div class="searchPanel">
      <Search />
    </div>
    <!-- 児童生徒一覧のパネル -->

    <div class="SearchResultPanel">
      <!-- 格納した変数側にprops名を付けて利用 -->
      <SearchResult :students="useGetStudents" />
    </div>
  </div>
</template>
<style scoped>
.studentSearchPage {
  background-color: var(--bg);
}
</style>
