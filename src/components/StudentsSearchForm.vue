<!-- 検索条件の機能本体 -->

<script setup lang="ts">
import { getClasses, getSchools } from '@/api/schoolApi'
import { getGrades } from '@/api/schoolApi'
import { computed } from 'vue'
import type { Grade, School, SchoolClass } from '@/types/school'
import type { Student } from '@/types/student'

const props = defineProps<{ students: Student[] }>()
const students = props.students

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
function resetValue() {
  schoolChoice.value = []
  gradeChoice.value = null
  classChoice.value = null
  userInput.value = ''
  needsFollowChoice.value = false
  return students
}

// element.school.idはただのnumberであり、そのnumberがschoolIds配列の中にあればelementを返す。
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
  if (student.class !== null && classChoice.value !== null) {
    return student.class.id === classChoice.value.id
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

// 5つの関数をまとめたい
const searchFilterValue = computed(() => {
  console.log('searchFilterValue動いてる')
  return students.filter((student) => {
    newSchool(student) &&
      newGrade(student) &&
      newClassChoice(student) &&
      newUserInput(student) &&
      newNeedsFollow(student)
  })
})

// 親コンポーネントにデータを送るためのイベントを用意
const emit = defineEmits(['search'])

const onChange = () => {
  emit('search', searchFilterValue.value)
}

// 複数条件を一回だけ呼び出す関数を作り、それを配列に使って結果を出す
// その関数を呼びたい生徒の一覧は？40件を5回フィルターしている状態になってしまっている→まず一件に対しかけて絞っていくか、40件全体に一気にフィルターをかけるか。
// 今回の場合、すべてに一致する人物がいたら非効率。フィルターをかける回数を減らす。既存の方向の場合、関数をかけたものを次に渡すができていない。
</script>

<template>
  <div class="search-panel">
    <div class="title">絞り込み条件</div>
    <div class="first-row">
      <span class="school-checkbox">
        <span class="entry-title">学校（複数選択）</span>
        <label v-for="schoolName in schoolNames" :key="schoolName.id" @change="onChange">
          <input type="checkbox" v-model="schoolChoice" :value="schoolName" />
          {{ schoolName.name }}
        </label>
      </span>
    </div>

    <div class="second-row">
      <span class="grade-select">
        <label for="grade-select" class="entry-title">学年</label>
        <select id="grade-select" v-model="gradeChoice" @change="onChange">
          <option :value="null">すべて</option>
          <option :value="gradeName" v-for="gradeName in gradeNames" :key="gradeName.id">
            {{ gradeName.name }}
          </option>
        </select>
      </span>

      <span class="class-select">
        <label for="class-select" class="entry-title">組</label>
        <select id="class-select" v-model="classChoice" @change="onChange">
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
          @change="onChange"
        />
      </span>
    </div>

    <div class="third-row">
      <span class="needsfollow-toggle">
        <input id="needs-follow" type="checkbox" v-model="needsFollowChoice" @change="onChange" />
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

      <span class="reset-button">
        <!-- 何かしらクリックで関数を呼び、それぞれの管理しているrefの初期化処理を行う。初期値で上書きするイメージ-->
        <button @click="resetValue">絞り込みをクリア</button>
      </span>
    </div>
    {{ searchFilterValue }}
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
