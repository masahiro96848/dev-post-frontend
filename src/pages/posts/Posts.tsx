import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Button,
  Card,
  CardBody,
  Image,
  Stack,
  Link,
  Icon,
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { PagePadding } from '@/components/layout/PagePadding'
import { PageRoot } from '@/components/layout/PageRoot'
import { Footer } from '@/components/navigation/Footer'
import { Header } from '@/components/navigation/Header'
import { Post, User } from '@/types/graphql.gen'

type Props = {
  viewer?: User | null
  posts: Post[]
}

export const Posts: FC<Props> = (props: Props) => {
  const { viewer, posts } = props
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(window.innerWidth < 768)
      setIsTablet(width >= 768 && width < 1024)
    }

    handleResize() // 初期実行
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <PageRoot backgroundColor="gray.50">
      <Header viewer={viewer ?? undefined} />
      {isMobile ? (
        <Box p="24px">
          <Box px="24px" py="24px">
            <Heading fontSize="2xl" textAlign="left">
              最新投稿一覧
            </Heading>
          </Box>
          <Box py="12px">
            <Flex justifyContent="flex-end" alignItems="center">
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  backgroundColor="gray.500"
                  color="white"
                  _hover={{ backgroundColor: 'blue.600' }}
                >
                  更新日順
                </MenuButton>
                <MenuList>
                  <MenuItem>更新日順</MenuItem>
                  <MenuItem>スターの多い順</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Box>
          <Box>
            <Flex wrap="wrap" justifyContent="center">
              {posts.map((post, index) => (
                <Link
                  href={`${post.user.name}/posts/${post.uid}`}
                  key={index}
                  textDecoration="none"
                  mb={4}
                >
                  <Card
                    width="320px"
                    maxWidth="100%"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    height="80px"
                    display="flex"
                    alignItems="center"
                  >
                    <CardBody p="0" display="flex" alignItems="center">
                      <Image
                        src={post.imageUrl ?? undefined}
                        alt={post.title}
                        width="80px"
                        height="80px"
                        borderRadius="md"
                      />
                      <Stack
                        spacing="3"
                        pl="4"
                        pr="4"
                        height="100%"
                        justifyContent="center"
                      >
                        <Heading size="sm" noOfLines={1}>
                          {post.title.length > 30
                            ? `${post.title.slice(0, 30)}...`
                            : post.title}
                        </Heading>
                        <Text color="gray.500" noOfLines={1}>
                          {post.body && post.body.length > 20
                            ? `${post.body.slice(0, 20)}...`
                            : post.body || ''}
                        </Text>
                      </Stack>
                      <Flex justify="flex-end" align="center" ml="auto" pr="4">
                        <Icon boxSize={4} as={FaStar} color="yellow.400" />
                        <Text ml="2">4.5</Text>
                      </Flex>
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </Flex>
          </Box>
        </Box>
      ) : (
        <Box p={isTablet ? '24px' : '96px'}>
          <Box
            width="100%"
            maxWidth="1460px"
            mx="auto"
            px={{ base: '8px', md: '24px' }}
            py="24px"
          >
            <Heading
              px={{ base: '8px', md: '24px' }}
              fontSize="2xl"
              textAlign="left"
            >
              最新投稿一覧
            </Heading>
          </Box>
          <Box
            maxWidth="1400px"
            mx="auto"
            px={isTablet ? '12px' : '96px'}
            py="24px"
          >
            <Flex justifyContent="flex-end" alignItems="center">
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  backgroundColor="gray.500"
                  color="white"
                  _hover={{ backgroundColor: 'blue.600' }}
                >
                  更新日順
                </MenuButton>
                <MenuList>
                  <MenuItem>更新日順</MenuItem>
                  <MenuItem>スターの多い順</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            px={{ base: '8px', md: '24px' }}
          >
            <Box width="100%" maxWidth="1400px" px={{ base: '8px' }}>
              <Flex
                wrap="wrap"
                gap={{ base: '8px', md: '8px' }}
                justifyContent="flex-start" // 常に左揃え
              >
                {posts.map((post, index) => (
                  <Link
                    href={`${post.user.name}/posts/${post.uid}`}
                    key={index}
                    textDecoration="none"
                  >
                    <Card
                      width={{ base: '100%', md: '300px' }} // タブレットで300pxの固定幅
                      maxW="100%"
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="md"
                      height="400px"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      mx={{ base: 0, md: '8px' }} // 両側に8pxの余白を設定
                      mb={{ base: '8px', md: '8px' }} // 下側に8pxの余白を設定
                    >
                      <CardBody
                        p="0"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                      >
                        <Box>
                          <Image
                            src={post.imageUrl ?? undefined}
                            alt={post.title}
                            width="100%"
                            height="200px"
                            objectFit="cover"
                            borderTopRadius="md"
                          />
                          <Stack mt="6" spacing="3" p="4">
                            <Heading size="md">
                              {post.title.length > 30
                                ? `${post.title.slice(0, 30)}...`
                                : post.title}
                            </Heading>
                            <Text color="gray.500">
                              {post.body && post.body.length > 20
                                ? `${post.body.slice(0, 20)}...`
                                : post.body || ''}
                            </Text>
                          </Stack>
                        </Box>
                        <Flex justify="flex-end" align="center" p="4">
                          <Icon boxSize={8} as={FaStar} color="yellow.400" />
                          <Text ml="2">4.5</Text>
                        </Flex>
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </Flex>
            </Box>
          </Box>
        </Box>
      )}
      <PagePadding />
      <Footer />
    </PageRoot>
  )
}
