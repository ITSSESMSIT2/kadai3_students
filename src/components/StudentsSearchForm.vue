<!-- 検索条件の機能本体 -->

<script setup lang="ts">
import { ref } from 'vue'
import { getClasses, getSchools } from '@/api/schoolApi'
import { getGrades } from '@/api/schoolApi'
const schoolChoose = ref([])
// APIを取得する関数を設定する。→扱い方を関数でなく変数にする
const schoolNames = getSchools()
const gradeNames = getGrades()
const gradeChoose = ref([])
const classNames = getClasses()
const classChoose = ref([])
// console.logなどで手段で、入力値が反映されるかだけ確認
</script>

<template>
  <div>
    学校（複数選択）
    <span v-for="schoolName in schoolNames" :key="schoolName.id">
      <input id="schoolNameCheckbox" type="checkbox" value="schoolName" />
      <label id="schoolNameCheckbox">{{ schoolName.name }}</label>
    </span>
  </div>
  <div>
    学年
    <select v-model="gradeChoose">
      <option value="disabled">選択してください</option>
      <option v-for="gradeName in gradeNames" :key="gradeName.id">
        {{ gradeName.name }}
      </option>
    </select>
  </div>
  <div>
    組
    <select v-model="classChoose">
      <option value="disabled">選択してください</option>
      <option v-for="className in classNames" :key="className.id">{{ className.name }}</option>
    </select>
  </div>

  フリーワード
  <!-- <input v-model.trim="userInput" type="text" /> -->
  要フォロー 並び替え
  <button>"{昇順↑}"</button>
  <button>絞り込みをクリア</button>
</template>

<style scoped>
.sarchPanel {
  background-color: var(--bg);
  padding: var(--space-md) var(--space-sm);
  margin: var(--space-md);
  border: var(--elevation-1);
  border-radius: var(--radius-sm);
}
</style>
