<!-- 検索条件の機能本体 -->

<script setup lang="ts">
import { ref } from 'vue'
import { getClasses, getSchools } from '@/api/schoolApi'
import { getGrades } from '@/api/schoolApi'

const schoolChoise = ref([])
// APIを取得する関数を設定する。→扱い方を関数でなく変数にする
const schoolNames = getSchools()

const gradeNames = getGrades()
const gradeChoise = ref([])

const classNames = getClasses()
const classChoise = ref([])

const userInput = ref('')

const needsFollowChoise = ref(false)
// const reset を定義して、入力値を全部消去したい

// console.logで、入力値が反映されるかのみ確認（STEP2用）
function printSchoolChoise() {
  console.log(schoolChoise)
}
function printgradeChoise() {
  console.log(gradeChoise)
}
function printClassChoise() {
  console.log(classChoise)
}
function printUserInput() {
  console.log(userInput)
}
function printNeedsFollowChoise() {
  console.log(needsFollowChoise)
}
</script>

<template>
  <div class="search-panel">
    <div class="title">絞り込み条件</div>

    <div class="first-row">
      <span class="school-checkbox">
        <span class="entry-title">学校（複数選択）</span>
        <span v-for="schoolName in schoolNames" :key="schoolName.id">
          <input
            id="schoolname-checkbox"
            type="checkbox"
            :value="schoolName"
            v-model="schoolChoise"
            @change="printSchoolChoise()"
          />
          <label id="schoolname-checkbox">{{ schoolName.name }} </label>
        </span>
      </span>
    </div>

    <div class="second-row">
      <span class="grade-select">
        <span class="entry-title">学年</span>
        <select v-model="gradeChoise" @change="printgradeChoise()">
          <option value="" selected>選択してください</option>
          <option :value="gradeName" v-for="gradeName in gradeNames" :key="gradeName.id">
            {{ gradeName.name }}
          </option>
        </select>
      </span>

      <span class="class-select">
        <span class="entry-title">組</span>
        <select v-model="classChoise" @change="printClassChoise()">
          <option value="" selected>選択してください</option>
          <option :value="className" v-for="className in classNames" :key="className.id">
            {{ className.name }}
          </option>
        </select>
      </span>
      <span class="freeword-textbox">
        <span class="entry-title">フリーワード</span>
        <input
          type="text"
          placeholder="氏名・ふりがなで検索"
          v-model.trim="userInput"
          @input="printUserInput()"
        />
      </span>
    </div>

    <div class="third-row">
      <span class="needsfollow-toggle">
        <input
          id="needs-follow"
          type="checkbox"
          v-model="needsFollowChoise"
          @change="printNeedsFollowChoise()"
        />
        <label id="needs-follow"> 要フォローのみ表示 </label>
      </span>

      <span class="sort-select">
        <span class="entry-title">並び替え</span>
        <select>
          <option>ふりがな</option>
          <option>学年</option>
          <option>更新日</option>
        </select>
        <button class="change-order">昇順↑</button>
      </span>

      <span class="resetbutton">
        <!-- 何かしらクリックで関数を呼び、それぞれの管理しているrefの初期化処理を行う。初期値で上書きするイメージ-->
        <button>絞り込みをクリア</button>
      </span>
    </div>
  </div>
</template>

<style scoped>
.search-panel {
  background-color: var(--surface);
  border: var(--elevation-2);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  margin: var(--space-md);
}
.title {
  font-size: large;
  font-weight: bold;
}
.entry-title {
  color: var(--text-sub);
}
.right-elements {
  justify-content: flex-end;
}
</style>
