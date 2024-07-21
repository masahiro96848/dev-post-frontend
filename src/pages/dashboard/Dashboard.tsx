import { Box, Container, VStack, Heading } from '@chakra-ui/react'
import React, { FC } from 'react'
import { PagePadding } from '@/components/layout/PagePadding'
import { PageRoot } from '@/components/layout/PageRoot'
import { Footer } from '@/components/navigation/Footer'
import { Header } from '@/components/navigation/Header'

export const Dashboard: FC = () => {
  return (
    <PageRoot backgroundColor="gray.50">
      <Header />
      <Box>
        <Container
          bg="white"
          boxShadow="md"
          p={12}
          mt="96px"
          border="3px solid white"
          borderColor="#850b0bf"
        >
          <VStack>
            <Heading fontSize="lg">ダッシュボード</Heading>
          </VStack>
        </Container>
      </Box>
      <PagePadding />
      <Footer />
    </PageRoot>
  )
}
