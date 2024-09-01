import { Box, Button, Flex, Link, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { User } from '@/types/graphql.gen'

type Props = {
  viewer?: User
}

export const Header: FC<Props> = (props: Props) => {
  const { viewer } = props
  const router = useRouter()
  const uid = uuidv4()

  return (
    <Box
      position="fixed"
      top="0"
      width="100%"
      zIndex="1000"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="72px"
      px={8}
      background="orange.400"
      borderBottom="0.5px solid"
      borderBottomColor="gray.200"
    >
      <Box>
        <Link href="/posts" color="white" fontSize="3xl" mr={4}>
          Dev Post
        </Link>
      </Box>
      {viewer ? (
        <Box>
          <Flex alignItems="center">
            <Link href="/posts" color="white" fontSize="lg" mr={4}>
              記事一覧
            </Link>
            <Link
              href={`/posts/${uid}/edit`}
              color="white"
              fontSize="lg"
              mr={4}
            >
              新規投稿
            </Link>
            <Text color="white" fontSize="lg" mr={4}>
              <Link href={`/settings/profile`}>{viewer.name}</Link>
            </Text>

            <Button
              onClick={() => {
                router.push('/signout')
              }}
            >
              ログアウト
            </Button>
          </Flex>
        </Box>
      ) : (
        <Box>
          <Link href="/posts" color="white" fontSize="lg" mr={4}>
            記事一覧
          </Link>
          <Link href="/signin" color="white" fontSize="lg" mr={4}>
            ログイン
          </Link>
          <Link href="/signup" color="white" fontSize="lg">
            新規登録
          </Link>
        </Box>
      )}
    </Box>
  )
}
