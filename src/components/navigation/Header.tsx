import { Box, ChakraProps, Link } from '@chakra-ui/react'
import { FC } from 'react'

export const Header: FC<ChakraProps> = ({ ...props }) => {
  return (
    <Box
      position="fixed"
      top="0"
      width="100%"
      zIndex="1000"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="72px"
      px={8}
      background="orange.400"
      borderBottom="0.5px solid"
      borderBottomColor="gray.200"
      {...props}
    >
      <Box>
        <Link href="/" color="white" fontSize="lg" mr={4}>
          Customer Management
        </Link>
      </Box>
      <Box>
        <Link href="/signin" color="white" fontSize="lg" mr={4}>
          ログイン
        </Link>
        <Link href="/signup" color="white" fontSize="lg">
          新規登録
        </Link>
      </Box>
    </Box>
  )
}
