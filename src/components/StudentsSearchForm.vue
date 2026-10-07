<!-- 検索条件の機能本体 -->

<script setup lang="ts">
import { getClasses, getSchools } from '@/api/schoolApi'
import { getGrades } from '@/api/schoolApi'
import { students } from '@/data/students'
import type { CodeName } from '@/types/common'
import type { Grade, School, SchoolClass } from '@/types/school'
import { computed } from 'vue'

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

// 今やりたいこと＝schoolは複数の値を持つ配列だから、その値一つ一つに対しアクセスしたい。
// アクセスしてどうするの→該当のidを持つ生徒をstudentsから拾ってきて一覧表示
// schoolChoiceがそもそも配列になっているから、一回schoolChoiceの中に入っている情報のidを取得する？

// schoolIdに今入っているのは、schoolchoiceのオブジェクトたちのうち、id
// のはずだが、戻り値の型が勝手にNumber[]になっている。

const schoolIds = schoolChoice.value.map((element) => element.id)

const newSchool = students.filter(() => {
  return students.includes(schoolIds)
})

// 現在型が配列のCodeName[]になっているのでエラー　→　もともとschoolChoiceに複数の値が入るから。定義したものに何が入っているのかを意識
// 一旦配列の中身それぞれに行えればいいので、filterでもいいしforでもいいし手段はいろいろある

const newGrade = students.filter((student) => {
  if (gradeChoice.value !== null) {
    return student.grade.id === gradeChoice.value.id
  }
})
// const newClassChoice = students.filter((student) => {
//   if (student.class !== null && classChoice.value !== null) {
//     return student.class.id === classChoice.value.id
//   }
// })
// const newUserInput = students.filter((student) => {
//   if (userInput.value !== null) {
//     // 氏名のかな・漢字と一致するものすべてをもってくる
//   }
// })

// const newNeedsFollow = students.filter((student) => {
//   if (needsFollowChoice.value === true) {
//     return student.needsFollow === needsFollowChoice.value
//   }
// })

// 複数条件を一回だけ呼び出す関数を作り、それを配列に使って結果を出す

// const searchFilterValue = computed((student) => {
//   if (student !== null) {
//     // その関数を呼びたい生徒の一覧は？40件を5回フィルターしている状態になってしまっている→まず一件に対しかけて絞っていくか、40件全体に一気にフィルターをかけるか。
//     // 今回の場合、すべてに一致する人物がいたら非効率。フィルターをかける回数を減らす。既存の方向の場合、関数をかけたものを次に渡すができていない。
//     return newSchool && newGrade && newClassChoice && newUserInput && newNeedsFollow
//   }
//   return student
// })
</script>

<template>
  <div class="search-panel">
    <div class="title">絞り込み条件</div>
    <!-- {{ searchFilterValue }} -->
    {{ gradeChoice }}
    {{ schoolId }}
    {{ schoolChoice }}

    <div class="first-row">
      <span class="school-checkbox">
        <span class="entry-title">学校（複数選択）</span>
        <label v-for="schoolName in schoolNames" :key="schoolName.id">
          <input type="checkbox" :value="schoolName" v-model="schoolChoice" />
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
