import { Box, Button, Flex, Link, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { User } from '@/types/graphql.gen'

type Props = {
  viewer?: User
}

export const Header: FC<Props> = (props: Props) => {
  const { viewer } = props
  const router = useRouter()

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
        <Link href="/" color="white" fontSize="lg" mr={4}>
          Customer Management
        </Link>
      </Box>
      {viewer ? (
        <Box>
          <Flex alignItems="center">
            <Text color="white" fontSize="lg" mr={4}>
              {viewer.name}
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
