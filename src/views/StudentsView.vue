<script setup lang="ts">
import StudentsSearchForm from '@/components/StudentsSearchForm.vue'
import StudentList from '@/components/StudentList.vue'
import { getStudents } from '@/api/studentApi'

// 用意されているgetStudents()インタフェースを利用し、疑似的なAPI呼び出しを行う。
// 今回の場合、変数Studetsの箱の中には、getStudents()で呼び出したStudents[]配列がそのまま格納されている。

const students = getStudents()
</script>
<template>
  <!-- ここに絞り込み条件の画面 -->
  <div class="student-search-page">
    <div class="search-panel">
      <StudentsSearchForm />
    </div>
    <!-- 児童生徒一覧のパネル -->

    <div class="search-result-panel">
      <!-- 格納した変数側にprops名を付けて利用 -->
      <StudentList :students="students" />
    </div>
  </div>
</template>
<style scoped>
.student-search-page {
  background-color: var(--bg);
}
</style>
