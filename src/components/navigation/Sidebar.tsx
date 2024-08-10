import { VStack, Button, Icon } from '@chakra-ui/react'
import React from 'react'
import { FaLock, FaUser } from 'react-icons/fa'

export const Sidebar = () => {
  return (
    <VStack width="20%" spacing={4} align="stretch" mt={12}>
      <Button
        justifyContent="flex-start"
        leftIcon={<Icon as={FaLock} />}
        borderRadius="none"
        _hover={{ bg: 'gray.100' }}
      >
        投稿記事一覧
      </Button>
      <Button
        justifyContent="flex-start"
        leftIcon={<Icon as={FaUser} />}
        borderRadius="none"
        _hover={{ bg: 'gray.100' }}
      >
        プロフィール変更
      </Button>
    </VStack>
  )
}
