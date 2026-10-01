<script setup lang="ts">
import { students } from '@/data/students'
import type { SchoolClass } from '@/types/school'

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
// 日付をyyyy/MM/ddに直す
const updatedAtValue = (day: string): string => {
  return day.slice(0, 10)
}
</script>
<template>
  <div class="resultTitle">
    <span class="title">児童生徒一覧</span>
    <span class="resultNum">該当n件・全件{{ students.length }}件</span>
  </div>
  <div class="resultPanel">
    <div class="showData">
      <span class="infoLine">ID</span>
      <span class="infoLine">氏名</span>
      <span class="infoLine">ふりがな</span>
      <span class="infoLine">学校</span>
      <span class="infoLine">学年</span>
      <span class="infoLine">組</span>
      <span class="infoLine">出席番号</span>
      <span class="infoLine">要フォロー</span>
      <span class="infoLine">更新日</span>
    </div>
    <div class="result" v-for="student in students" :key="student.id">
      <span class="infoLine">{{ student.id }}</span>
      <span class="infoLine"> {{ student.name }}</span>
      <span class="infoLine" id="kana"> {{ student.kana }}</span>
      <span class="infoLine">{{ student.school.name }}</span>
      <span class="infoLine">{{ student.grade.name }}</span>
      <span class="infoLine">{{ classValue(student.class) }}</span>
      <span class="infoLine">{{ student.attendanceNumber }}</span>
      <span class="infoLine">{{ needsFollowValue(student.needsFollow) }}</span>
      <span class="infoLine">{{ updatedAtValue(student.updatedAt) }}</span>
    </div>
  </div>
</template>

<style scoped>
div {
  font-size: medium;
}
.resultTitle {
  display: flex;
  margin: 16px;
}
.title {
  font-size: large;
  margin-right: auto;
  font-weight: bold;
}
.resultNum {
  color: #757575;
  margin-left: auto;
}
.resultPanel {
  display: flex;
  flex-direction: column;
  padding: 16px;
}
.showData {
  display: flex;
  color: #757575;
  justify-content: space-between;
  padding: 16px 8px;
}
.result {
  display: flex;
  justify-content: space-between;
}
.infoLine {
  text-align: start;
  justify-content: space-between;
}
#kana {
  color: #757575;
}
</style>
