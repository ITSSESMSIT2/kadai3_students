import { ref, computed } from 'vue'
import type { Grade, School, SchoolClass } from '@/types/school'
import type { Student } from '@/types/student'

// 検索条件

// sourceの中に入れてるのは、フォームの入力値単品。
// 関数と状態を一つにまとめて持つ→Composableの役割
export function useSearchCriteria(students: Student[]) {
  // 入力フォームの実データを格納
  const schoolChoice = ref<School[]>([])
  const gradeChoice = ref<Grade | null>(null)
  const classChoice = ref<SchoolClass | null>(null)
  const userInput = ref('')
  const needsFollowChoice = ref(false)

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
  }
  const searchFilterValue = computed(() => {
    return students.filter((student: Student) => {
      return (
        newSchool(student) &&
        newGrade(student) &&
        newClass(student) &&
        newUserInput(student) &&
        newNeedsFollow(student)
      )
    })
  })

  // ここで作った新しい関数とgradeChoiceをreturn する、その新しい関数の中に親コンポーネントで使いたい配列を入れる
  return {
    schoolChoice,
    classChoice,
    gradeChoice,
    userInput,
    needsFollowChoice,
    searchFilterValue,
  }
}
