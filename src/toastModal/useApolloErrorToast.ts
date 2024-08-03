import { ApolloError } from '@apollo/client'
import { useCallback } from 'react'
import { useToast } from './useToast'

export const useApolloErrorToast = () => {
  const toast = useToast()
  const showToastError = useCallback(
    (e: ApolloError) => {
      let title = '問題が発生しました。時間をおいて再度お試しください。'

      if (e.graphQLErrors && e.graphQLErrors.length > 0) {
        const firstError = e.graphQLErrors[0]
        // detailed_codeが入っている場合は、バックエンドのエラーハンドリングで総れされたエラーなのでメッセージを表示する
        if (firstError.extensions?.['detailed_code']) {
          title = firstError.message
        }
      }

      toast({
        title,
        status: 'error',
      })
    },
    [toast],
  )
  return showToastError
}
