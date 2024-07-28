import { useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react'

const defaultOptions: UseToastOptions = { position: 'top', variant: 'solid' }

export const useToast = () => {
  return useChakraToast(defaultOptions)
}
