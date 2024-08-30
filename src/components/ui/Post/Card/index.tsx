import {
  Link,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Flex,
  Icon,
  Box,
} from '@chakra-ui/react'
import React from 'react'
import { FaStar } from 'react-icons/fa'
import { imageOrigin } from '@/constants/post'
import { Post } from '@/types/graphql.gen'

type PostCardProps = {
  post: Post
  isMobile?: boolean
}

const PostCard: React.FC<PostCardProps> = ({ post, isMobile }) => {
  return (
    <Link href={`${post.user.name}/posts/${post.uid}`} textDecoration="none">
      <Card
        width={isMobile ? '100%' : { base: '100%', md: '300px' }} // スマホで100%幅
        height={isMobile ? '110px' : '400px'} // スマホで高さ自動調整
        maxW="100%"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        display="flex"
        flexDirection={isMobile ? 'row' : 'column'} // スマホでは横並び
        justifyContent="space-between"
        mx={isMobile ? '0px' : '8px'} // 両側に8pxの余白を設定
        mb={isMobile ? '8px' : '8px'} // 下側に8pxの余白を設定
      >
        <Box
          width={isMobile ? '30%' : '100%'}
          height={isMobile ? '100%' : '200px'}
        >
          <Image
            src={post.imageUrl ? imageOrigin + post.imageUrl : undefined}
            alt={post.title}
            width={isMobile ? '100%' : '100%'}
            height={isMobile ? '100%' : '100%'}
            loading="lazy"
          />
        </Box>
        <CardBody
          p={isMobile ? '4px' : '16px'} // スマホで小さめのパディング
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          width={isMobile ? '70%' : '100%'}
        >
          <Stack spacing="1">
            <Heading size={isMobile ? 'sm' : 'md'} noOfLines={2}>
              {post.title.length > 30
                ? `${post.title.slice(0, 30)}...`
                : post.title}
            </Heading>
            <Text
              fontSize={isMobile ? 'xs' : 'sm'}
              color="gray.500"
              noOfLines={2}
            >
              {post.body && post.body.length > 20
                ? `${post.body.slice(0, 20)}...`
                : post.body || ''}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {new Date(post.createdAt).toLocaleDateString()}
            </Text>
          </Stack>
          <Flex justify="flex-end" align="center">
            <Icon boxSize={isMobile ? 6 : 6} as={FaStar} color="yellow.400" />
            <Text ml="2" fontSize={isMobile ? 'xs' : 'sm'}>
              {post.favoritesCount}
            </Text>
          </Flex>
        </CardBody>
      </Card>
    </Link>
  )
}

export const MemoizedPostCard = React.memo(PostCard)
