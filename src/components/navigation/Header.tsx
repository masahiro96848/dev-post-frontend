import {
  Box,
  Flex,
  Link,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  MenuGroup,
  Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaListAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import { IoMenu } from 'react-icons/io5'
import { MdSpaceDashboard } from 'react-icons/md'
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
            <Button
              as={Link}
              href={`/posts/${uid}/edit`}
              bg="white"
              borderRadius="full"
              color="orange.400"
              fontSize="lg"
              p={6}
              mr={4}
              _hover={{
                bg: 'gray.400',
                color: 'white',
                transition: 'all 0.5s',
                textDecoration: 'none',
              }}
            >
              新規投稿
            </Button>

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
                <MenuGroup title={viewer.name ?? undefined} fontWeight="normal">
                  <MenuItem
                    fontWeight="bold"
                    onClick={() => router.push('/dashboard')}
                    icon={<MdSpaceDashboard size="1.5rem" />}
                  >
                    ダッシュボード
                  </MenuItem>
                  <MenuItem
                    fontWeight="bold"
                    onClick={() => router.push('/settings/profile')}
                    icon={<CgProfile size="1.5rem" />}
                  >
                    プロフィール編集
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuItem
                  fontWeight="bold"
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
          <Menu>
            <MenuButton>
              <IoMenu size="3rem" />
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<FaListAlt />}
                onClick={() => router.push('/posts')}
              >
                記事一覧
              </MenuItem>
              <MenuItem
                icon={<FaSignInAlt />}
                onClick={() => router.push('/signin')}
              >
                ログイン
              </MenuItem>
              <MenuItem
                icon={<FaUserPlus />}
                onClick={() => router.push('/signup')}
              >
                新規登録
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
    </Box>
  )
}
