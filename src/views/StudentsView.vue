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
const sortList = ref<string | null>(null)
const reverseSort = ref(true)

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
  if (classChoice.value !== null) {
    return student.class?.id === classChoice.value.id
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
  sortList.value = null
  reverseSort.value = true
}

// 並べ替え

// // 最後の条件
const lastSortOrder = (a: Student, b: Student) => {
  if (a.id < b.id) {
    return -1
  } else {
    return 1
  }
}

// // 第二条件：学校
const secondSortOrder = (a: Student, b: Student) => {
  if (a.school.id < b.school.id) {
    return -1
  } else if (a.school.id > b.school.id) {
    return 1
  } else {
    return kanaSortOrder(a, b)
  }
}

const kanaSortOrder = (a: Student, b: Student) => {
  if (a.kana < b.kana) {
    return -1
  } else if (a.kana > b.kana) {
    return 1
  } else {
    return lastSortOrder(a, b)
  }
}

const gradeSortOrder = (a: Student, b: Student) => {
  if (a.grade.id < b.grade.id) {
    return -1
  } else if (a.grade.id > b.grade.id) {
    return 1
  } else {
    return secondSortOrder(a, b)
  }
}

const dateSortOrder = (a: Student, b: Student) => {
  if (a.updatedAt < b.updatedAt) {
    return -1
  } else if (a.updatedAt > b.updatedAt) {
    return 1
  } else {
    return secondSortOrder(a, b)
  }
}

// 並べ替え条件
const sortCondition = (element: string | null) => {
  if (element === 'sort-grade') {
    return gradeSortOrder
  } else if (element === 'sort-date') {
    return dateSortOrder
  } else {
    return kanaSortOrder
  }
}

// 並べ替え昇順降順→関数の呼び方が違う
// 配列に直接.でつないでいいのは既存のプロパティのみ
// 全部returnで書ききろうとすると可読性が下がる。

const sortValue = computed(() => {
  const copiedSearchFilterValue = searchFilterValue.value.slice()
  const sortedByChosenKey = sortCondition(sortList.value)
  const sortedArray = copiedSearchFilterValue.sort(sortedByChosenKey)
  if (reverseSort.value === true) {
    return sortedArray
  } else {
    return sortedArray.reverse()
  }
})
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
        v-model:sort-list="sortList"
        v-model:reverse-sort="reverseSort"
      />
      <span class="reset-button">
        <button @click="resetValue">絞り込みをクリア</button>
      </span>
    </div>
    <!-- 児童生徒一覧のパネル -->

    <div class="search-result-panel">
      <StudentList :students="students" :sortValue="sortValue" />
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
