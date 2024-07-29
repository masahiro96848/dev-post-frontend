import { useCallback } from 'react'
import { useToast } from './useToast'

export const useSuccessToast = () => {
  const toast = useToast()
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

  return { showToastSuccess }
}
