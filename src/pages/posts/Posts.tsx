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
import { postsData } from '@/constants/post'
import { User } from '@/types/graphql.gen'

type Props = {
  viewer: User
}

export const Posts: FC<Props> = (props: Props) => {
  const { viewer } = props
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
      <Header viewer={viewer} />
      {isMobile ? (
        <Box p="24px">
          <Box px="24px" py="24px">
            <Heading fontSize="2xl" textAlign="left">
              最新投稿一覧
            </Heading>
          </Box>
          <Box px="12px" py="12px">
            <Flex justifyContent="flex-end" alignItems="center">
              <Text mr="4">並び順</Text>
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
              {postsData.map((post, index) => (
                <Link key={index} textDecoration="none" mb={4}>
                  <Card
                    width="100%"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    height="80px"
                    display="flex"
                    alignItems="center"
                  >
                    <CardBody p="0" display="flex" alignItems="center">
                      <Image
                        src={post.image}
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
                          {post.description.length > 20
                            ? `${post.description.slice(0, 20)}...`
                            : post.description}
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
          <Box px="24px" py="24px">
            <Heading fontSize="2xl" textAlign="left">
              最新投稿一覧
            </Heading>
          </Box>
          <Box px={isTablet ? '12px' : '96px'} py="24px">
            <Flex justifyContent="flex-end" alignItems="center">
              <Text mr="4">並び順</Text>
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
          <Box px="24px">
            <Flex
              wrap="wrap"
              gap={isTablet ? '6' : '8'}
              justifyContent="flex-start"
            >
              {postsData.map((post, index) => (
                <Link key={index} textDecoration="none">
                  <Card
                    width={isTablet ? '340px' : '300px'}
                    maxW={isTablet ? '500px' : '300px'}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    height="400px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
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
                        <Stack mt="6" spacing="3" p="4">
                          <Heading size="md">
                            {post.title.length > 30
                              ? `${post.title.slice(0, 30)}...`
                              : post.title}
                          </Heading>
                          <Text color="gray.500">
                            {post.description.length > 20
                              ? `${post.description.slice(0, 20)}...`
                              : post.description}
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
      )}
      <PagePadding />
      <Footer />
    </PageRoot>
  )
}
