<script setup lang="ts">
import StudentsSearchForm from '@/components/StudentsSearchForm.vue'
import StudentList from '@/components/StudentList.vue'
import { computed } from 'vue'
import { getStudents } from '@/api/studentApi'
import { useSearchCriteria } from '@/composables/selectValue'
import { useSortCriteria } from '@/composables/sortValue'
import type { Student } from '@/types/student'

// 用意されているgetStudents()インタフェースを利用し、疑似的なAPI呼び出しを行う。
// 今回の場合、変数studentsの箱の中には、getStudents()で呼び出したStudent[]配列がそのまま格納されている。
const students = getStudents()
const {
  schoolChoice,
  gradeChoice,
  classChoice,
  userInput,
  needsFollowChoice,
  newSchool,
  newGrade,
  newClass,
  newUserInput,
  newNeedsFollow,
} = useSearchCriteria()
// 5つの関数をまとめ、検索結果の配列を呼び出す関数を作成
const searchFilterValue = computed(() => {
  return students.filter((student: Student) => {
    return (
      newSchool(student) &&
      newGrade(student) &&
      newClass(student) &&
      newUserInput(student) &&
      newNeedsFollow(student)
    )
  })
})

const { sortList, reverseSort, sortCondition, sortKanaNull, kanaSortOrder } = useSortCriteria()
// 検索条件、並べ替え条件を配列に適用するcomputed関数
const sortValue = computed(() => {
  const copiedSearchFilterValue = searchFilterValue.value.slice()
  const sortedByChosenKey = sortCondition(sortList.value)
  const sortedArray = copiedSearchFilterValue.sort(sortedByChosenKey)
  // 降順の場合のみ反転させる処理（昇順ならば実行されない）
  if (reverseSort.value === false) {
    sortedArray.reverse()
  }
  // ふりがな順の場合のみ空のレコードを末尾に並べ替える処理(ふりがな以外なら実行されない)
  if (sortedByChosenKey === kanaSortOrder) {
    sortedArray.sort(sortKanaNull)
  }
  // 上記2つのif文を通過するかにかかわらず、加工された配列を返す
  return sortedArray
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
