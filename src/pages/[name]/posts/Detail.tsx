import {
  Box,
  Container,
  Heading,
  Image,
  Text,
  Flex,
  Icon,
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { PagePadding } from '@/components/layout/PagePadding'
import { PageRoot } from '@/components/layout/PageRoot'
import { Footer } from '@/components/navigation/Footer'
import { Header } from '@/components/navigation/Header'
import { Post } from '@/types/graphql.gen'
import { formatDate } from '@/utils/date'

type Props = {
  post: Post
}
export const Detail: FC<Props> = (props: Props) => {
  const { post } = props
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize() // 初期実行
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <PageRoot backgroundColor="gray.50">
      <Header />
      <Box p={4}>
        {isMobile ? (
          <Container
            bg="white"
            boxShadow="md"
            p={4}
            mt="48px"
            border="3px solid white"
            borderColor="#850b0bf"
          >
            <Box>
              <Image
                src={post.imageUrl ?? undefined}
                alt="Article Image"
                w="100%"
                h="auto"
                borderRadius="md"
              />
            </Box>
            <Flex justifyContent="space-between" alignItems="center" mt={6}>
              <Text fontSize="sm" color="gray.600">
                {formatDate(post.createdAt)}
              </Text>
              <Flex alignItems="center">
                <Box>
                  <Icon boxSize={6} as={FaStar} color="yellow.400" mt={1} />
                </Box>
                <Text fontSize="lg" ml={2}>
                  7
                </Text>
              </Flex>
            </Flex>
            <Heading as="h2" fontSize="lg" mt={4}>
              {post.title}
            </Heading>
            <Text mt={4} lineHeight="tall">
              {post.body}
            </Text>
          </Container>
        ) : (
          <Container
            maxWidth="800px"
            bg="white"
            boxShadow="md"
            p={12}
            mt="48px"
            border="3px solid white"
            borderColor="#850b0bf"
          >
            <Box>
              <Image
                src={post.imageUrl ?? undefined}
                alt="Article Image"
                w="100%"
                h="auto"
                borderRadius="md"
              />
            </Box>
            <Flex justifyContent="space-between" alignItems="center" mt={6}>
              <Text fontSize="sm" color="gray.600">
                {formatDate(post.createdAt)}
              </Text>
              <Flex alignItems="center">
                <Box>
                  <Icon boxSize={6} as={FaStar} color="yellow.400" mt={1} />
                </Box>
                <Text fontSize="lg" ml={2}>
                  7
                </Text>
              </Flex>
            </Flex>
            <Heading as="h2" size="lg" mt={4}>
              {post.title}
            </Heading>
            <Text mt={4} lineHeight="tall">
              {post.body}
            </Text>
          </Container>
        )}
      </Box>
      <PagePadding />
      <Footer />
    </PageRoot>
  )
}
