import { Box } from '@chakra-ui/react'
import React, { FC } from 'react'
import { PagePadding } from '@/components/layout/PagePadding'
import { PageRoot } from '@/components/layout/PageRoot'
import { Footer } from '@/components/navigation/Footer'
import { Header } from '@/components/navigation/Header'
import { Sidebar } from '@/components/navigation/Sidebar'
import { User } from '@/types/graphql.gen'

type Props = {
  viewer: User
}
export const Dashboard: FC<Props> = (props: Props) => {
  const { viewer } = props
  return (
    <PageRoot backgroundColor="gray.50">
      <Header viewer={viewer} />
      <Sidebar />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {viewer.email}
      </Box>
      <PagePadding />
      <Footer />
    </PageRoot>
  )
}
