import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Image,
  Container,
  Heading,
  Text,
  Flex,
  Button,
  Icon,
  Card,
  CardBody,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { PagePadding } from '@/components/layout/PagePadding'
import { PageRoot } from '@/components/layout/PageRoot'
import { Footer } from '@/components/navigation/Footer'
import { Header } from '@/components/navigation/Header'
import { Sidebar } from '@/components/navigation/Sidebar'
import { postStatus, PostStatusKey } from '@/constants/post'
import { Post, User } from '@/types/graphql.gen'
import { formatDate } from '@/utils/date'

type Props = {
  viewer: User
  myPosts: Post[]
}
export const Dashboard: FC<Props> = (props: Props) => {
  const { viewer, myPosts } = props
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
      <Header viewer={viewer} />
      <Box>
        {isMobile ? (
          <Box p="24px">
            <Tabs>
              <TabList>
                <Tab>投稿記事一覧</Tab>
                <Tab>プロフィール変更</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Box py="24px">
                    <Heading fontSize="2xl" textAlign="left">
                      投稿記事一覧
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
                          すべて
                        </MenuButton>
                        <MenuList>
                          <MenuItem>すべて</MenuItem>
                          <MenuItem>公開済み</MenuItem>
                          <MenuItem>保存中</MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>
                  </Box>
                  <Box>
                    <Flex wrap="wrap" justifyContent="center">
                      {myPosts.map((post, index) => (
                        <Link key={index} textDecoration="none" mb={4}>
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
                                <Text
                                  fontSize="sm"
                                  color={
                                    post.isPublished === 1
                                      ? 'blue.500'
                                      : 'gray.500'
                                  }
                                  border="1px solid"
                                  borderColor={
                                    post.isPublished === 1
                                      ? 'blue.500'
                                      : 'gray.500'
                                  }
                                  px="2"
                                  py="1"
                                  borderRadius="md"
                                  width="fit-content"
                                  display="inline-block"
                                >
                                  {
                                    postStatus[
                                      post.isPublished as PostStatusKey
                                    ]
                                  }
                                </Text>
                              </Stack>
                              <Flex
                                justify="flex-end"
                                align="center"
                                ml="auto"
                                pr="4"
                              >
                                <Icon
                                  boxSize={4}
                                  as={FaStar}
                                  color="yellow.400"
                                />
                                <Text ml="2">4.5</Text>
                              </Flex>
                            </CardBody>
                          </Card>
                        </Link>
                      ))}
                    </Flex>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        ) : (
          <Flex justifyContent="center" mt="48px">
            <Container maxWidth="1400px" bg="white" boxShadow="md" p={12}>
              <Flex>
                <Sidebar />

                <Box p="24px">
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
                      投稿記事一覧
                    </Heading>
                  </Box>
                  <Box maxWidth="1400px" mx="auto" px="96px" py="24px">
                    <Flex justifyContent="flex-end" alignItems="center">
                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                          backgroundColor="gray.500"
                          color="white"
                          _hover={{ backgroundColor: 'blue.600' }}
                        >
                          すべて
                        </MenuButton>
                        <MenuList>
                          <MenuItem>すべて</MenuItem>
                          <MenuItem>公開済み</MenuItem>
                          <MenuItem>下書き</MenuItem>
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
                        justifyContent="flex-start"
                      >
                        {myPosts.map((post, index) => (
                          <Link key={index} textDecoration="none">
                            <Card
                              width={{ base: '100%', md: '300px' }}
                              maxW="100%"
                              border="1px solid"
                              borderColor="gray.200"
                              borderRadius="md"
                              height="400px"
                              display="flex"
                              flexDirection="column"
                              justifyContent="space-between"
                              mx={{ base: 0, md: '8px' }}
                              mb={{ base: '8px', md: '8px' }}
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
                                  <Stack mt="2" spacing="3" p="4">
                                    <Text
                                      fontSize="sm"
                                      color={
                                        post.isPublished === 1
                                          ? 'blue.500'
                                          : 'gray.500'
                                      }
                                      border="1px solid"
                                      borderColor={
                                        post.isPublished === 1
                                          ? 'blue.500'
                                          : 'gray.500'
                                      }
                                      px="2"
                                      py="1"
                                      borderRadius="md"
                                      width="fit-content"
                                      display="inline-block"
                                    >
                                      {
                                        postStatus[
                                          (post.isPublished ??
                                            0) as PostStatusKey
                                        ]
                                      }
                                    </Text>
                                    <Heading size="md">
                                      {post.title.length > 30
                                        ? `${post.title.slice(0, 30)}...`
                                        : post.title}
                                    </Heading>
                                  </Stack>
                                </Box>
                                <Flex
                                  justify="space-between"
                                  alignItems="center"
                                  px={4}
                                  py={2}
                                  mt="auto"
                                >
                                  <Text fontSize="sm" color="gray.600">
                                    {formatDate(post.createdAt)}
                                  </Text>
                                  <Flex justify="flex-end" align="center">
                                    <Icon
                                      boxSize={8}
                                      as={FaStar}
                                      color="yellow.400"
                                    />
                                    <Text ml="2">4.5</Text>
                                  </Flex>
                                </Flex>
                              </CardBody>
                            </Card>
                          </Link>
                        ))}
                      </Flex>
                    </Box>
                  </Box>
                </Box>
              </Flex>
            </Container>
          </Flex>
        )}
      </Box>
      <PagePadding />
      <Footer />
    </PageRoot>
  )
}
