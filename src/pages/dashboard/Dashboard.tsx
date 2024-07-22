import { Box, Heading } from '@chakra-ui/react'
import React, { FC } from 'react'
import { PagePadding } from '@/components/layout/PagePadding'
import { PageRoot } from '@/components/layout/PageRoot'
import { Footer } from '@/components/navigation/Footer'
import { Header } from '@/components/navigation/Header'
import { Sidebar } from '@/components/navigation/Sidebar'

export const Dashboard: FC = () => {
  return (
    <PageRoot backgroundColor="gray.50">
      <Header />
      <Sidebar />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Heading fontSize="48px">aaaaaaa</Heading>
        <Heading fontSize="48px">aaaaaaa</Heading>
        <Heading fontSize="48px">aaaaaaa</Heading>
      </Box>
      <PagePadding />
      <Footer />
    </PageRoot>
  )
}
