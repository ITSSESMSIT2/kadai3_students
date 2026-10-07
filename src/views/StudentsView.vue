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
const schoolChoice = ref<School[]>([])
const gradeChoice = ref<Grade | null>(null)
const classChoice = ref<SchoolClass | null>(null)
const userInput = ref('')
const needsFollowChoice = ref(false)
</script>

<template>
  <!-- ここに絞り込み条件の画面 -->
  <div class="student-search-page">
    <div class="search-panel">
      <StudentsSearchForm
        v-model:school-choice="schoolChoice"
        v-model:grade-choice="gradeChoice"
        v-model:class-choice="classChoice"
        v-model:user-input="userInput"
        v-model:needsfollow-choice="needsFollowChoice"
      />
    </div>
    <!-- 児童生徒一覧のパネル -->

    <div class="search-result-panel">
      <StudentList :students="students" />
    </div>
  </div>
</template>
<style scoped>
.student-search-page {
  background-color: var(--bg);
}
</style>
