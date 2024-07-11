import { Button, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import React from 'react'

const Page: NextPage = () => {
  return (
    <div>
      <Text fontSize="4xl">テスト</Text>
      <Button bg="red.400">Button</Button>
    </div>
  )
}

export default Page
