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
  <div class="studentSearchPage">
    <div class="searchPanel">
      <StudentsSearchForm />
    </div>
    <!-- 児童生徒一覧のパネル -->

    <div class="SearchResultPanel">
      <!-- 格納した変数側にprops名を付けて利用 -->
      <StudentList :students="students" />
    </div>
  </div>
</template>
<style scoped>
.studentSearchPage {
  background-color: var(--bg);
}
</style>
