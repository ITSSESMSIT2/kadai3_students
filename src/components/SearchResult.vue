<script setup lang="ts">
import type { SchoolClass } from '@/types/school'
import type { Student } from '@/types/student'

// 親コンポーネントから、Student型の配列を受け取る
defineProps<{
  students: Student[]
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
  <div class="resultPanel">
    <div class="resultTitle">
      <span class="title">児童生徒一覧</span>
      <span class="resultNum">該当n件・全件{{ students.length }}件</span>
    </div>
    <table class="studentTable">
      <thead>
        <tr class="paleText">
          <th>氏名</th>
          <th>ID</th>
          <th>ふりがな</th>
          <th>学校</th>
          <th>学年</th>
          <th>組</th>
          <th>出席番号</th>
          <th>要フォロー</th>
          <th>更新日</th>
        </tr>
      </thead>
      <tbody class="result" v-for="student in students" :key="student.id">
        <th class="paleText">{{ student.id }}</th>
        <th>{{ student.name }}</th>
        <th class="paleText">{{ student.kana }}</th>
        <th>{{ student.school.name }}</th>
        <th>{{ student.grade.name }}</th>
        <th>{{ classValue(student.class) }}</th>
        <th>{{ student.attendanceNumber }}</th>
        <th>{{ needsFollowValue(student.needsFollow) }}</th>
        <th class="paleText">{{ updatedAtValue(student.updatedAt) }}</th>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.resultPanel {
  background-color: var(--surface);
  border: var(--elevation-2);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
}
.resultTitle {
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
.resultNum {
  font-size: large;
  color: var(--text-sub);
}
.paleText {
  color: var(--text-sub);
}

.studentTable {
  text-align: left;
}
</style>
