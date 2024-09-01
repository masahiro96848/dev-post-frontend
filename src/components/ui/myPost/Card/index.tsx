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
import { imageOrigin, postStatus, PostStatusKey } from '@/constants/post'
import { Post } from '@/types/graphql.gen'
import { formatDate } from '@/utils/date'

type MyPostCardProps = {
  myPost: Post
  isMobile?: boolean
}

const MyPostCard: React.FC<MyPostCardProps> = ({ myPost, isMobile }) => {
  return (
    <Link
      href={`${myPost.user.name}/posts/${myPost.uid}`}
      textDecoration="none"
    >
      <Card
        width={isMobile ? '100%' : { base: '100%', md: '300px' }}
        height={isMobile ? '120px' : '400px'}
        maxW="100%"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        display="flex"
        flexDirection={isMobile ? 'row' : 'column'}
        justifyContent="space-between"
        mx={isMobile ? '0px' : '8px'}
        mb="8px"
      >
        <Box
          width={isMobile ? '30%' : '100%'}
          height={isMobile ? '100%' : '200px'}
        >
          <Image
            src={myPost.imageUrl ? imageOrigin + myPost.imageUrl : undefined}
            alt={myPost.title}
            width="100%"
            height="100%"
            objectFit="cover"
            loading="lazy"
          />
        </Box>
        <CardBody
          p={isMobile ? '4px' : '16px'}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          width={isMobile ? '70%' : '100%'}
        >
          <Stack spacing={isMobile ? '1' : '3'}>
            <Heading size={isMobile ? 'sm' : 'md'} noOfLines={2}>
              {myPost.title.length > 30
                ? `${myPost.title.slice(0, 30)}...`
                : myPost.title}
            </Heading>
            <Text
              fontSize={isMobile ? 'xs' : 'sm'}
              color="gray.500"
              noOfLines={2}
            >
              {myPost.body && myPost.body.length > 20
                ? `${myPost.body.slice(0, 20)}...`
                : myPost.body || ''}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {formatDate(myPost.createdAt)}
            </Text>
          </Stack>
          <Flex justify="space-between" alignItems="center">
            <Text
              fontSize="xs"
              color={myPost.isPublished === 1 ? 'gray.500' : 'blue.500'}
              border="1px solid"
              borderColor={myPost.isPublished === 1 ? 'gray.500' : 'blue.500'}
              px="2"
              py="1"
              borderRadius="md"
              textAlign="center"
            >
              {postStatus[(myPost.isPublished ?? 0) as PostStatusKey]}
            </Text>
            <Flex justify="flex-end" align="center">
              <Icon boxSize={isMobile ? 6 : 6} as={FaStar} color="yellow.400" />
              <Text ml="2" fontSize={isMobile ? 'xs' : 'sm'}>
                {myPost.favoritesCount}
              </Text>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Link>
  )
}

export const MemoizedMyPostCard = React.memo(MyPostCard)
