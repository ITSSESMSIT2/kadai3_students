import { ref, computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { Student } from '@/types/student'

// 引数にはselectValue.tsで作成した、computed関数を適用済みの配列searchFilterValueを利用
export function useSortCriteria(searchFilterValue: ComputedRef<Student[]>) {
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
  const sortValue = computed(() => {
    const copiedSearchFilterValue = searchFilterValue.value.slice()
    const sortedByChosenKey = sortCondition(sortList.value)
    const sortedArray = copiedSearchFilterValue.sort(sortedByChosenKey)
    // 降順の場合のみ反転させる処理（昇順ならば実行されない）
    if (reverseSort.value === false) {
      sortedArray.reverse()
    }
    // ふりがな順の場合のみ空のレコードを末尾に並べ替える処理(ふりがな以外なら実行されない)
    if (sortedByChosenKey === kanaSortOrder) {
      sortedArray.sort(sortKanaNull)
    }
    // 上記2つのif文を通過するかにかかわらず、加工された配列を返す
    return sortedArray
  })

  return {
    sortList,
    reverseSort,
    sortValue,
  }
}
