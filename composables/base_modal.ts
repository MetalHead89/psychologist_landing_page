import { useVfm } from 'vue-final-modal'

const DEFAULT_MODAL_ID = 'baseModal'

export function useBaseModal({ modalId: id }: { modalId: string }) {
  const modalId = id || DEFAULT_MODAL_ID
  const vfm = useVfm()

  const handleCloseClick = () => {
    close()
  }

  const close = () => {
    vfm.close(modalId)
  }

  return {
    handleCloseClick,
    close,
    modalId
  }
}
