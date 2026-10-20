// 【指針】
// gradeChoiceの型だけでは不足→処理に使っているし共通でもつIDを引数で渡す→今共通で使っているIDは？一意のものはそれこそidのみでは
// Studentのどの項目を見たいか？
// returnにrefの値を入れてそれを親コンポーネントで回収

import { ref } from 'vue'
import type { Grade, School, SchoolClass } from '@/types/school'
import type { Student } from '@/types/student'
import { computed } from 'vue'

// 検索条件

// sourceの中に入れてるのは、フォームの入力値単品。
// 関数と状態を一つにまとめて持つ→composableの役割
export function useSearchCriteria() {
  // 入力フォームの実データを格納
  const schoolChoice = ref<School[]>([])
  const gradeChoice = ref<Grade | null>(null)
  const classChoice = ref<SchoolClass | null>(null)
  const userInput = ref('')
  const needsFollowChoice = ref(false)
  // const classChoice = ref<SchoolClass | null>(null)

  // この中に新しい関数を作るイメージ
  const newSchool = (element: Student) => {
    const schoolIds = schoolChoice.value.map((element) => element.id)
    if (schoolChoice.value.length !== 0) {
      return schoolIds.includes(element.school.id)
    } else {
      return true
    }
  }
  const newGrade = (element: Student) => {
    if (gradeChoice.value !== null) {
      return element.grade.id === gradeChoice.value.id
    } else {
      return true
    }
  }
  const newClass = (element: Student) => {
    if (classChoice.value !== null) {
      return element.class?.id === classChoice.value.id
    } else {
      return true
    }
  }
  const newUserInput = (element: Student) => {
    if (userInput.value.trim() !== '') {
      return element.name.includes(userInput.value) || element.kana.includes(userInput.value)
    } else {
      return true
    }
  }

  const newNeedsFollow = function (element: Student) {
    if (needsFollowChoice.value === true) {
      return element.needsFollow === needsFollowChoice.value
    } else {
      return true
    }

    // ここで作った新しい関数とgradeChoiceをreturn する、その新しい関数の中に親コンポーネントで使いたい配列なりを入れる
  }
  return {
    schoolChoice,
    classChoice,
    gradeChoice,
    userInput,
    needsFollowChoice,
    newSchool,
    newGrade,
    newClass,
    newUserInput,
    newNeedsFollow,

    // const newGrade = selectGradeClass()
    // const newClassChoice = selectGradeClass()
  }
}
