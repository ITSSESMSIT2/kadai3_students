<!-- 検索結果一覧の表示 -->

<script setup lang="ts">
import type { SchoolClass } from '@/types/school'
import type { Student } from '@/types/student'

// 親コンポーネントから、Student型の配列を受け取る
defineProps<{
  searchFilterValue: Student[]
}>()

// 組がnullの場合の処理
const classValue = (className: SchoolClass | null): string => {
  if (className !== null) {
    return className.name
  } else {
    return '-'
  }
}
//要フォローをTFから「要フォロー」と「ー」に分ける
const needsFollowValue = (result: boolean): string => {
  if (result) {
    return '要フォロー'
  } else {
    return '-'
  }
}
// 日付をyyyy/MM/ddに直す　→toLocalDataString()を利用
const updatedAtValue = (day: string): string => {
  return new Date(day).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
</script>

<template>
  <div class="result-panel">
    <div class="result-title">
      <span class="title">児童生徒一覧</span>
      <span class="result-num">該当{{ searchFilterValue.length }}件・全件{{}}件</span>
    </div>
    <table class="student-table">
      <thead>
        <tr class="pale-text">
          <th>ID</th>
          <th>氏名</th>
          <th>ふりがな</th>
          <th>学校</th>
          <th>学年</th>
          <th>組</th>
          <th>出席番号</th>
          <th>要フォロー</th>
          <th>更新日</th>
        </tr>
      </thead>
      <tbody>
        <tr class="result" v-for="student in searchFilterValue" :key="student.id">
          <td class="pale-text">{{ student.id }}</td>
          <td>{{ student.name }}</td>
          <td class="pale-text">{{ student.kana }}</td>
          <td>{{ student.school.name }}</td>
          <td>{{ student.grade.name }}</td>
          <td>{{ classValue(student.class) }}</td>
          <td>{{ student.attendanceNumber }}</td>
          <td>{{ needsFollowValue(student.needsFollow) }}</td>
          <td class="pale-text">{{ updatedAtValue(student.updatedAt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.result-panel {
  background-color: var(--surface);
  border: var(--elevation-2);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  margin: var(--space-md);
  display: flex;
  flex-direction: column;
}
.result-title {
  color: ver(--text);
  font-size: large;
  margin: var(--space-md) var(--space-sm);
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: large;
  font-weight: bold;
}
.result-num {
  font-size: large;
  color: var(--text-sub);
}
.pale-text {
  color: var(--text-sub);
}

.student-table {
  text-align: left;
}
</style>
