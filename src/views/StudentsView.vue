<script setup lang="ts">
import StudentsSearchForm from '@/components/StudentsSearchForm.vue'
import StudentList from '@/components/StudentList.vue'
import { getStudents } from '@/api/studentApi'
import { ref } from 'vue'
import type { Grade, School, SchoolClass } from '@/types/school'
import type { Student } from '@/types/student'
import { computed } from 'vue'

// 用意されているgetStudents()インタフェースを利用し、疑似的なAPI呼び出しを行う。
// 今回の場合、変数studentsの箱の中には、getStudents()で呼び出したStudent[]配列がそのまま格納されている。
const students = getStudents()

// 入力フォームの実データを格納
const schoolChoice = ref<School[]>([])
const gradeChoice = ref<Grade | null>(null)
const classChoice = ref<SchoolClass | null>(null)
const userInput = ref('')
const needsFollowChoice = ref(false)

// 検索条件
const newSchool = function (student: Student) {
  const schoolIds = schoolChoice.value.map((element) => element.id)
  if (schoolIds.length !== 0) {
    return schoolIds.includes(student.school.id)
  } else {
    return true
  }
}

const newGrade = function (student: Student) {
  if (gradeChoice.value !== null) {
    return student.grade.id === gradeChoice.value.id
  }
  return true
}

const newClassChoice = function (student: Student) {
  if (student.class !== null && classChoice.value !== null) {
    return student.class.id === classChoice.value.id
  } else {
    return true
  }
}
const newUserInput = function (student: Student) {
  if (userInput.value.trim() !== '') {
    return student.name.includes(userInput.value) || student.kana.includes(userInput.value)
  } else {
    return true
  }
}

const newNeedsFollow = function (student: Student) {
  if (needsFollowChoice.value === true) {
    return student.needsFollow === needsFollowChoice.value
  } else {
    return true
  }
}

// 5つの関数をまとめ、検索結果の配列を呼び出す関数を作成

const searchFilterValue = computed(() => {
  return students.filter((student) => {
    return (
      newSchool(student) &&
      newGrade(student) &&
      newClassChoice(student) &&
      newUserInput(student) &&
      newNeedsFollow(student)
    )
  })
})

// リセットボタン
function resetValue() {
  schoolChoice.value = []
  gradeChoice.value = null
  classChoice.value = null
  userInput.value = ''
  needsFollowChoice.value = false
}
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
        :students="students"
      />

      <span class="reset-button">
        <!-- 何かしらクリックで関数を呼び、それぞれの管理しているrefの初期化処理を行う。初期値で上書きするイメージ-->
        <button @click="resetValue">絞り込みをクリア</button>
      </span>
    </div>
    <!-- 児童生徒一覧のパネル -->

    <div class="search-result-panel">
      <StudentList :searchFilterValue="searchFilterValue" />
    </div>
  </div>
</template>

<style scoped>
.student-search-page {
  background-color: var(--bg);
}
.search-panel {
  background-color: var(--surface);
  border: var(--elevation-2);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  margin: var(--space-md);
}
</style>
