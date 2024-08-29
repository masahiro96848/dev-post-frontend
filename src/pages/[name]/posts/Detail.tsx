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
import {
  usePagesPostDetailAddFavoriteMutation,
  usePagesPostDetailRemoveFavoriteMutation,
} from './Detail.gen'
import { PagePadding } from '@/components/layout/PagePadding'
import { PageRoot } from '@/components/layout/PageRoot'
import { Footer } from '@/components/navigation/Footer'
import { Header } from '@/components/navigation/Header'
import { imageOrigin } from '@/constants/post'
import { useApolloErrorToast } from '@/toastModal/useApolloErrorToast'
import { useSuccessToast } from '@/toastModal/useSuccessToast'
import { Post, User } from '@/types/graphql.gen'
import { formatDate } from '@/utils/date'

type Props = {
  viewer?: User | null
  post: Post
}
export const Detail: FC<Props> = (props: Props) => {
  const { viewer, post } = props
  const [isMobile, setIsMobile] = useState(false)

  const { showToastSuccess } = useSuccessToast()
  const apolloErrorToast = useApolloErrorToast()

  const [addFavorite] = usePagesPostDetailAddFavoriteMutation({
    onCompleted() {
      showToastSuccess('いいねしました。')
    },
    onError: apolloErrorToast,
  })

  const [removeFavorite] = usePagesPostDetailRemoveFavoriteMutation({
    onCompleted() {
      showToastSuccess('いいねを削除しました。')
    },
    onError: apolloErrorToast,
  })

  const handleFavoriteToggle = (postId: string, isFavorited: boolean) => {
    if (isFavorited) {
      removeFavorite({ variables: { input: { postId } } })
    } else {
      addFavorite({ variables: { input: { postId } } })
    }
  }

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
      <Header viewer={viewer ?? undefined} />
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
                src={post.imageUrl ? imageOrigin + post.imageUrl : undefined}
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
                <Box
                  display="flex"
                  alignItems="center"
                  cursor="pointer"
                  onClick={() =>
                    post.id && post.favorited
                      ? handleFavoriteToggle(post.id, post.favorited)
                      : console.error(
                          'Post ID or favorited status is undefined',
                        )
                  }
                >
                  <Icon
                    boxSize={6}
                    as={FaStar}
                    color={post.favorited ? 'yellow.400' : 'gray.400'}
                    mt={1}
                  />
                  <Text fontSize="lg" ml={2}>
                    {post.favoritesCount}
                  </Text>
                </Box>
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
                src={post.imageUrl ? imageOrigin + post.imageUrl : undefined}
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
                <Box
                  display="flex"
                  alignItems="center"
                  cursor="pointer"
                  onClick={() =>
                    post.id && post.favorited
                      ? handleFavoriteToggle(post.id, post.favorited)
                      : console.error(
                          'Post ID or favorited status is undefined',
                        )
                  }
                >
                  <Icon
                    boxSize={6}
                    as={FaStar}
                    color={post.favorited ? 'yellow.400' : 'gray.400'}
                    mt={1}
                  />
                  <Text fontSize="lg" ml={2}>
                    {post.favoritesCount}
                  </Text>
                </Box>
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
