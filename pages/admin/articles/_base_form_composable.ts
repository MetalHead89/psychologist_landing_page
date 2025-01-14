export function useBaseForm() {
  const router = useRouter()

  const form = reactive({
    name: '',
    slug: '',
    content: '',
    title: '',
    description: '',
    keywords: '',
    isActive: true,
    previewImage: '',
    previewImageUrl: ''
  })

  const footer = {
    cancel: {
      text: 'Отменить',
      clickHandler: () => {
        router.push({ name: 'admin-articles' })
      }
    }
  }

  return {
    form,
    footer
  }
}
