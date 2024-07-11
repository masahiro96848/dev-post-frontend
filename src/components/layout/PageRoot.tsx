import { Box, ChakraProps } from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'

export const PageRoot: FC<PropsWithChildren<ChakraProps>> = ({
  children,
  ...props
}) => {
  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      {...props}
    >
      {children}
    </Box>
  )
}
