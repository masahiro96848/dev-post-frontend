import {
  Box,
  Container,
  Heading,
  Image,
  Text,
  Flex,
  Icon,
  Link,
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import {
  usePagesPostDetailAddFavoriteMutation,
  usePagesPostDetailRemoveFavoriteMutation,
} from './PostDetail.gen'
import { PagePadding } from '@/components/layout/PagePadding'
import { PageRoot } from '@/components/layout/PageRoot'
import { Footer } from '@/components/navigation/Footer'
import { Header } from '@/components/navigation/Header'
import { imageOrigin } from '@/constants/post'
import { useApolloErrorToast } from '@/toastModal/useApolloErrorToast'
import { useModalToast } from '@/toastModal/useModalToast'
import { Post, User } from '@/types/graphql.gen'
import { formatDate } from '@/utils/date'

type Props = {
  viewer?: User | null
  post: Post
}
export const PostDetail: FC<Props> = (props: Props) => {
  const { viewer, post } = props
  const [isMobile, setIsMobile] = useState(false)
  const [favorited, setFavorited] = useState<boolean>(post.favorited || false)
  const [favoritesCount, setFavoritesCount] = useState<number>(
    post.favoritesCount,
  )

  const { showToastError } = useModalToast()
  const apolloErrorToast = useApolloErrorToast()

  const [addFavorite] = usePagesPostDetailAddFavoriteMutation({
    onCompleted() {},
    onError: apolloErrorToast,
  })

  const [removeFavorite] = usePagesPostDetailRemoveFavoriteMutation({
    onCompleted() {},
    onError: apolloErrorToast,
  })

  const handleFavoriteToggle = async (postId: string, isFavorited: boolean) => {
    try {
      if (!viewer) {
        showToastError('ログインしてください')
        return
      }
      if (isFavorited) {
        setFavorited(false)
        setFavoritesCount((prev) => prev - 1)
        await removeFavorite({ variables: { input: { postId } } })
      } else {
        setFavorited(true)
        setFavoritesCount((prev) => prev + 1)
        await addFavorite({ variables: { input: { postId } } })
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      // エラーが発生した場合、UIを元に戻す
      setFavorited(isFavorited)
      setFavoritesCount((prev) => (isFavorited ? prev + 1 : prev - 1))
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
                    post.id && favorited !== null
                      ? handleFavoriteToggle(post.id, favorited)
                      : console.error(
                          'Post ID or favorited status is undefined or null',
                        )
                  }
                >
                  <Icon
                    boxSize={6}
                    as={FaStar}
                    color={favorited ? 'yellow.400' : 'gray.400'}
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
            {viewer && viewer.id === post.user.id && (
              <Box mt={4}>
                <Link
                  href={`/posts/${post.uid}/edit`}
                  display="inline-block"
                  px={4}
                  py={2}
                  border="1px solid"
                  borderColor="blue.500"
                  borderRadius="4px"
                  color="blue.500"
                  _hover={{
                    backgroundColor: 'blue.50',
                    textDecoration: 'none',
                  }}
                >
                  編集
                </Link>
              </Box>
            )}
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
                    post.id && favorited !== null
                      ? handleFavoriteToggle(post.id, favorited)
                      : console.error(
                          'Post ID or favorited status is undefined or null',
                        )
                  }
                >
                  <Icon
                    boxSize={6}
                    as={FaStar}
                    color={favorited ? 'yellow.400' : 'gray.400'}
                    mt={1}
                  />
                  <Text fontSize="lg" ml={2}>
                    {favoritesCount}
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
