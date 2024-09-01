import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Container,
  Heading,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { PagePadding } from '@/components/layout/PagePadding'
import { PageRoot } from '@/components/layout/PageRoot'
import { Footer } from '@/components/navigation/Footer'
import { Header } from '@/components/navigation/Header'
import { Sidebar } from '@/components/navigation/Sidebar'
import { MemoizedMyPostCard } from '@/components/ui/myPost/Card'
import { Post, User } from '@/types/graphql.gen'

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
          <Box>
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
                        <MemoizedMyPostCard
                          key={index}
                          myPost={post}
                          isMobile={isMobile}
                        />
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
                          <MemoizedMyPostCard
                            key={index}
                            myPost={post}
                            isMobile={isMobile}
                          />
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
