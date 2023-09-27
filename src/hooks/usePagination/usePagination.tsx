import { useState, useEffect } from 'react'

interface Gap {
  before: boolean
  paginationGroup: number[]
  after: boolean
}
export interface UsePaginationProps {
  currentPage: number
  setCurrentPage: (page: number) => void
  contentPerPage: number
  count: number
}
interface UsePaginationReturn {
  currentPage: number
  totalPages: number
  firstContentIndex: number
  lastContentIndex: number
  setCurrentPage: (page: number) => void
  gaps: Gap
}
type UsePagination = (arg: UsePaginationProps) => UsePaginationReturn
export const useCardsPagination: UsePagination = ({
  contentPerPage,
  count,
  currentPage,
  setCurrentPage,
}) => {
  // like 3 dots that surrounds the immediate pages
  const [gaps, setGaps] = useState<Gap>({
    before: false,
    paginationGroup: [],
    after: true,
  })
  // number of pages in total (total items / content on each page)
  const pageCount = Math.ceil(count / contentPerPage)
  // index of last item of current page
  const lastContentIndex = currentPage * contentPerPage
  // index of first item of current page
  const firstContentIndex = lastContentIndex - contentPerPage
  //Pages between the first and last pages
  const [pagesInBetween, setPagesInBetween] = useState<number[]>([])

  useEffect(() => {
    if (pageCount > 2) {
      const temp = new Array(pageCount - 2).fill(1).map((_, i) => i + 2)

      setPagesInBetween(temp)
    }
  }, [pageCount])

  // to set the pages between the gaps depending on position of current page
  //and to setGaps Depending on position of current page
  useEffect(() => {
    const currentLocation = pagesInBetween.indexOf(currentPage)
    let paginationGroup = []
    let before = false
    let after = false

    if (currentPage === 1) {
      paginationGroup = pagesInBetween.slice(0, 3)
    } else if (
      currentPage === pageCount ||
      currentPage === pageCount - 1 ||
      currentPage === pageCount - 2
    ) {
      paginationGroup = pagesInBetween.slice(-3, pageCount)
    } else if (currentPage === 2) {
      paginationGroup = pagesInBetween.slice(currentLocation, currentLocation + 3)
    } else {
      paginationGroup = [currentPage - 1, currentPage, currentPage + 1]
    }
    if (pageCount <= 5) {
      before = false
      after = false
    } else {
      before = false
      after = false
      if (paginationGroup[0] > 2) {
        before = true
      }
      if (paginationGroup[2] < pageCount - 1) {
        after = true
      }
    }
    setGaps({ paginationGroup, before, after })
  }, [currentPage, pagesInBetween, pageCount, contentPerPage])

  // change page based on direction either front or back

  const setPageSAFE = (num: number) => {
    // if number is greater than number of pages, set to last page
    if (num > pageCount) {
      setCurrentPage(pageCount)
      // if number is less than 1, set page to first page
    } else if (num < 1) {
      setCurrentPage(1)
    } else {
      setCurrentPage(num)
    }
  }

  return {
    totalPages: pageCount,
    setCurrentPage: setPageSAFE,
    firstContentIndex,
    lastContentIndex,
    currentPage,
    gaps,
  }
}
