import { Box, ChakraProps } from '@chakra-ui/react'
import { FC } from 'react'

export const Header: FC<ChakraProps> = ({ ...props }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      height="72px"
      px={6}
      background="orange.400"
      borderBottom="0.5px solid"
      borderBottomColor="gray.200"
      {...props}
    >
      Customer Management
    </Box>
  )
}
