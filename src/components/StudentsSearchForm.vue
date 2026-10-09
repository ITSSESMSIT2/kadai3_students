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
const schoolChoice = defineModel<School[]>('school-choice', { required: true })
const gradeChoice = defineModel<Grade | null>('grade-choice', { required: true })
const classChoice = defineModel<SchoolClass | null>('class-choice', { required: true })
const userInput = defineModel<string>('user-input', { required: true })
const needsFollowChoice = defineModel<boolean>('needsfollow-choice', { required: true })

// const reset を定義して、入力値を全て消去したい（STEP3）
// clickしたときに起こる処理を書いている、複数処理を行いたいがクリック一回で処理が全部走るようにまとめている
// returnを使う→値を返す　なので今回そこまでを行う必要がない（returnする相手がいない）
// function resetValue() {
//   schoolChoice.value = []
//   gradeChoice.value = null
//   classChoice.value = null
//   userInput.value = ''
//   needsFollowChoice.value = false
// }

// element.school.idはただのnumberであり、そのnumberがschoolIds配列の中にあればelementを返す。

// 複数条件を一回だけ呼び出す関数を作り、それを配列に使って結果を出す
// その関数を呼びたい生徒の一覧は？40件を5回フィルターしている状態になってしまっている→まず一件に対しかけて絞っていくか、40件全体に一気にフィルターをかけるか。
// 今回の場合、すべてに一致する人物がいたら非効率。フィルターをかける回数を減らす。既存の方向の場合、関数をかけたものを次に渡すができていない。
</script>

<template>
  <div class="title">絞り込み条件</div>
  <div class="first-row">
    <span class="school-checkbox">
      <span class="entry-title">学校（複数選択）</span>
      <label v-for="schoolName in schoolNames" :key="schoolName.id">
        <input type="checkbox" v-model="schoolChoice" :value="schoolName" />
        {{ schoolName.name }}
      </label>
    </span>
  </div>

  <div class="second-row">
    <span class="grade-select">
      <label for="grade-select" class="entry-title">学年</label>
      <select id="grade-select" v-model="gradeChoice">
        <option :value="null">すべて</option>
        <option :value="gradeName" v-for="gradeName in gradeNames" :key="gradeName.id">
          {{ gradeName.name }}
        </option>
      </select>
    </span>

    <span class="class-select">
      <label for="class-select" class="entry-title">組</label>
      <select id="class-select" v-model="classChoice">
        <option :value="null">すべて</option>
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
      <input id="needs-follow" type="checkbox" v-model="needsFollowChoice" />
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
  </div>
</template>

<style scoped>
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
