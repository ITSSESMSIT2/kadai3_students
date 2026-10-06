<!-- 検索条件の機能本体 -->

<script setup lang="ts">
import { getClasses, getSchools } from '@/api/schoolApi'
import { getGrades } from '@/api/schoolApi'
import type { Grade, School, SchoolClass } from '@/types/school'

// APIを取得する関数を設定する。→扱い方を関数でなく変数にする
const schoolNames = getSchools()
const gradeNames = getGrades()
const classNames = getClasses()

// defineModelを利用し、親のデータを呼び出す
const schoolChoise = defineModel<School[]>('school-choise', { required: true })
const gradeChoise = defineModel<Grade | null>('grade-choise', { required: true })
const classChoise = defineModel<SchoolClass | null>('class-choise', { required: true })
const userInput = defineModel<string>('user-input', { required: true })
const needsFollowChoise = defineModel<boolean>('needsfollow-choise', { required: true })
// const reset を定義して、入力値を全て消去したい（STEP3）
</script>

<template>
  <div class="search-panel">
    <div class="title">絞り込み条件</div>

    <div class="first-row">
      <span class="school-checkbox">
        <span class="entry-title">学校（複数選択）</span>
        <label v-for="schoolName in schoolNames" :key="schoolName.id">
          <input type="checkbox" :value="schoolName" v-model="schoolChoise" />
          {{ schoolName.name }}
        </label>
      </span>
    </div>

    <div class="second-row">
      <span class="grade-select">
        <label for="grade-select" class="entry-title">学年</label>
        <select id="grade-select" v-model="gradeChoise">
          <option :value="null">すべて</option>
          <option :value="gradeName" v-for="gradeName in gradeNames" :key="gradeName.id">
            {{ gradeName.name }}
          </option>
        </select>
      </span>

      <span class="class-select">
        <label for="class-select" class="entry-title">組</label>
        <select id="class-select" v-model="classChoise">
          <option :value="null" selected>すべて</option>
          <option :value="className" v-for="className in classNames" :key="className.id">
            {{ className.name }}
          </option>
        </select>
      </span>

      <span class="freeword-textbox">
        <label for="user-input" class="entry-title">フリーワード</label>
        <input
          id="user-input"
          type="text"
          placeholder="氏名・ふりがなで検索"
          v-model.trim="userInput"
        />
      </span>
    </div>

    <div class="third-row">
      <span class="needsfollow-toggle">
        <input id="needs-follow" type="checkbox" v-model="needsFollowChoise" />
        <label for="needs-follow"> 要フォローのみ表示 </label>
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
