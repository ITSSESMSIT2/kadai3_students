import { ref } from 'vue'
import type { Student } from '@/types/student'

export function useSortCriteria() {
  const sortList = ref<string | null>(null)
  const reverseSort = ref(true)

  // 並べ替え
  // // 最後の条件
  const lastSortOrder = (a: Student, b: Student) => {
    if (a.id < b.id) {
      return -1
    } else {
      return 1
    }
  }

  // // 第二条件：学校
  const secondSortOrder = (a: Student, b: Student) => {
    if (a.school.id < b.school.id) {
      return -1
    } else if (a.school.id > b.school.id) {
      return 1
    } else {
      return kanaSortOrder(a, b)
    }
  }

  const kanaSortOrder = (a: Student, b: Student) => {
    const kanaResult = a.kana.localeCompare(b.kana, 'ja')
    if (kanaResult !== 0) {
      return kanaResult
    } else {
      return lastSortOrder(a, b)
    }
  }

  const gradeSortOrder = (a: Student, b: Student) => {
    if (a.grade.id < b.grade.id) {
      return -1
    } else if (a.grade.id > b.grade.id) {
      return 1
    } else {
      return secondSortOrder(a, b)
    }
  }

  const dateSortOrder = (a: Student, b: Student) => {
    if (a.updatedAt < b.updatedAt) {
      return -1
    } else if (a.updatedAt > b.updatedAt) {
      return 1
    } else {
      return secondSortOrder(a, b)
    }
  }

  // 並べ替え条件
  const sortCondition = (element: string | null) => {
    if (element === 'sort-grade') {
      return gradeSortOrder
    } else if (element === 'sort-date') {
      return dateSortOrder
    } else {
      return kanaSortOrder
    }
  }

  // 配列の末尾にvalueが空の要素を移動する関数
  const sortKanaNull = (a: Student, b: Student) => {
    const aNull = a.kana.trim() === ''
    const bNull = b.kana.trim() === ''
    if (aNull === bNull) {
      return 0
    } else if (aNull) {
      return 1
    }
    return -1
  }

  return {
    sortList,
    reverseSort,
    sortCondition,
    sortKanaNull,
    kanaSortOrder,
  }
}
