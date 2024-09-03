import {
  Box,
  Flex,
  Link,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Divider,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { imageOrigin } from '@/constants/post'
import { User } from '@/types/graphql.gen'

type Props = {
  viewer?: User
}

export const Header: FC<Props> = (props: Props) => {
  const { viewer } = props
  const router = useRouter()
  const uid = uuidv4()
  console.log(viewer)

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
            <Menu>
              <MenuButton>
                <Image
                  src={
                    viewer.imageUrl ? imageOrigin + viewer.imageUrl : undefined
                  }
                  width="50px"
                  height="50px"
                  alt="header_image"
                  borderRadius="full"
                  cursor="pointer"
                />
              </MenuButton>
              <MenuList>
                <Text px={4} py={2} fontSize="sm">
                  {viewer.name}
                </Text>
                <Divider />
                <MenuItem
                  fontWeight="bold"
                  py={2}
                  px={4}
                  onClick={() => router.push('/dashboard')}
                >
                  ダッシュボード
                </MenuItem>
                <MenuItem
                  fontWeight="bold"
                  py={2}
                  px={4}
                  onClick={() => router.push('/settings/profile')}
                >
                  プロフィール編集
                </MenuItem>
                <MenuItem
                  fontWeight="bold"
                  py={2}
                  px={4}
                  onClick={() => router.push('/signout')}
                >
                  ログアウト
                </MenuItem>
              </MenuList>
            </Menu>
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
