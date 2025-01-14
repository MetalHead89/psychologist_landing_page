interface ITableList {
  loadFunction: (params: unknown) => Promise<unknown>
}

export function useTableList({ loadFunction }: ITableList) {
  const loadingOverlay = useLoadingOverlayStore()
  const pagination = ref<TPaginationData>({
    page: 1,
    perPage: 25,
    totalItems: 0,
    totalPages: 0
  })

  const loadListData = () => {
    loadingOverlay.setIsShow(true)

    const params = {
      page: pagination.value.page,
      perPage: pagination.value.perPage
    }

    return (loadFunction(params) as Promise<unknown & TPaginationData>)
      .finally(() => {
        loadingOverlay.setIsShow(false)
      })
  }

  onMounted(() => {
    loadListData()
  })

  const changePage = (page: number) => {
    pagination.value.page = page
    loadListData()
  }

  return {
    loadListData,
    pagination,
    changePage
  }
}
