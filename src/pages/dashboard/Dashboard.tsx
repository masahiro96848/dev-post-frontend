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
  VStack,
  Card,
  CardBody,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { FaLock, FaStar, FaUser } from 'react-icons/fa'
import { PagePadding } from '@/components/layout/PagePadding'
import { PageRoot } from '@/components/layout/PageRoot'
import { Footer } from '@/components/navigation/Footer'
import { Header } from '@/components/navigation/Header'
import { postsData } from '@/constants/post'

export const Dashboard: FC = () => {
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
      <Header />
      <Box p={4}>
        {isMobile ? (
          <Flex justifyContent="center" mt="48px">
            <Container maxWidth="1400px" bg="white" boxShadow="md" p={12}>
              <Flex>
                <VStack width="20%" spacing={4} align="stretch">
                  <Button
                    justifyContent="flex-start"
                    leftIcon={<Icon as={FaLock} />}
                    borderRadius="none"
                    _hover={{ bg: 'gray.100' }}
                  >
                    投稿記事一覧
                  </Button>
                  <Button
                    justifyContent="flex-start"
                    leftIcon={<Icon as={FaUser} />}
                    borderRadius="none"
                    _hover={{ bg: 'gray.100' }}
                  >
                    プロフィール変更
                  </Button>
                </VStack>

                <Box width="80%" p={4}>
                  <Box>
                    <Heading as="h2" fontSize="xl" mb={4}>
                      投稿記事一覧
                    </Heading>
                    <Flex wrap="wrap" justifyContent="space-between">
                      {[...Array(8)].map((_, i) => (
                        <Box
                          key={i}
                          bg="white"
                          width="30%"
                          mb={6}
                          p={4}
                          boxShadow="sm"
                          borderWidth="1px"
                          borderRadius="md"
                        >
                          <Box height="150px" bg="gray.100" mb={4} />
                          <Text fontSize="sm" color="gray.600" mb={2}>
                            2024-04-02
                          </Text>
                          <Heading as="h3" fontSize="md" mb={2}>
                            サンプルテキストサンプルテキスト
                          </Heading>
                          <Text fontSize="sm" color="gray.600">
                            公開中
                          </Text>
                        </Box>
                      ))}
                    </Flex>
                    {/* Pagination */}
                    <Flex justifyContent="center" mt={6}>
                      <Button size="sm" mr={2}>
                        1
                      </Button>
                      <Button size="sm" mr={2}>
                        2
                      </Button>
                      <Button size="sm" mr={2}>
                        ...
                      </Button>
                      <Button size="sm" mr={2}>
                        9
                      </Button>
                      <Button size="sm">10</Button>
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            </Container>
          </Flex>
        ) : (
          <Flex justifyContent="center" mt="48px">
            <Container maxWidth="1400px" bg="white" boxShadow="md" p={12}>
              <Flex>
                <VStack width="20%" spacing={4} align="stretch" mt={12}>
                  <Button
                    justifyContent="flex-start"
                    leftIcon={<Icon as={FaLock} />}
                    borderRadius="none"
                    _hover={{ bg: 'gray.100' }}
                  >
                    投稿記事一覧
                  </Button>
                  <Button
                    justifyContent="flex-start"
                    leftIcon={<Icon as={FaUser} />}
                    borderRadius="none"
                    _hover={{ bg: 'gray.100' }}
                  >
                    プロフィール変更
                  </Button>
                </VStack>

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
                        {postsData.map((post, index) => (
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
                                    src={post.image}
                                    alt={post.title}
                                    width="100%"
                                    height="200px"
                                    objectFit="cover"
                                    borderTopRadius="md"
                                  />
                                  <Stack mt="2" spacing="3" p="4">
                                    <Text
                                      fontSize="sm"
                                      color="blue.500"
                                      border="1px solid"
                                      borderColor="blue.500"
                                      px="2"
                                      py="1"
                                      borderRadius="md"
                                      width="fit-content"
                                      display="inline-block"
                                    >
                                      {post.isPublished}
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
                                    {post.createdAt}
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
