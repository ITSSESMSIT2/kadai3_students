<script setup lang="ts">
import StudentsSearchForm from '@/components/StudentsSearchForm.vue'
import StudentList from '@/components/StudentList.vue'
import { getStudents } from '@/api/studentApi'
import { ref } from 'vue'
import type { Grade, School, SchoolClass } from '@/types/school'

// 用意されているgetStudents()インタフェースを利用し、疑似的なAPI呼び出しを行う。
// 今回の場合、変数studentsの箱の中には、getStudents()で呼び出したStudent[]配列がそのまま格納されている。
const students = getStudents()

// 入力フォームの実データを格納
const schoolChoise = ref<School[]>([])
const gradeChoise = ref<Grade | null>(null)
const classChoise = ref<SchoolClass | null>(null)
const userInput = ref('')
const needsFollowChoise = ref(false)
</script>

<template>
  <!-- ここに絞り込み条件の画面 -->
  <div class="student-search-page">
    <div class="search-panel">
      <StudentsSearchForm
        v-model:school-choise="schoolChoise"
        v-model:grade-choise="gradeChoise"
        v-model:class-choise="classChoise"
        v-model:user-input="userInput"
        v-model:needsfollow-choise="needsFollowChoise"
      />
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
