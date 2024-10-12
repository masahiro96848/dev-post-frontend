import { useCallback } from 'react'
import { useToast } from './useToast'

export const useModalToast = () => {
  const toast = useToast()

  const showToastError = useCallback(
    (title: string) => {
      toast({
        title: title,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    },
    [toast],
  )

  const showToastSuccess = useCallback(
    (title: string) => {
      toast({
        title: title,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    [toast],
  )

  return { showToastError, showToastSuccess }
}
