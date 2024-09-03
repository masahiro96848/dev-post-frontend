import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Container,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState, useMemo, useCallback } from 'react'
import { PagePadding } from '@/components/layout/PagePadding'
import { PageRoot } from '@/components/layout/PageRoot'
import { Footer } from '@/components/navigation/Footer'
import { Header } from '@/components/navigation/Header'
import { Pagination } from '@/components/ui/Pagination'
import { MemoizedMyPostCard } from '@/components/ui/myPost/Card'
import { Post, User } from '@/types/graphql.gen'

type Props = {
  viewer: User
  myposts: Post[]
  currentPage: number
  postsPerPage: number
  setCurrentPage: (page: number) => void
  setSortBy: (sortBy: string) => void
  setOrder: (order: string) => void
}

export const Dashboard: FC<Props> = (props: Props) => {
  const {
    viewer,
    myposts,
    currentPage,
    postsPerPage,
    setCurrentPage,
    setSortBy,
    setOrder,
  } = props

  const router = useRouter()
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [selectedSort, setSelectedSort] = useState<string>('作成日順')

  const totalPages = useMemo(
    () => Math.ceil(myposts.length / postsPerPage),
    [myposts, postsPerPage],
  )

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (router.query.sort_by) {
      setSortBy(router.query.sort_by as string)
      setSelectedSort(
        router.query.sort_by === 'is_published' && router.query.order === 'asc'
          ? '公開済み'
          : router.query.sort_by === 'is_published' &&
              router.query.order === 'desc'
            ? '保存中'
            : '作成日順',
      )
    }
    if (router.query.order) {
      setOrder(router.query.order as string)
    }
    if (router.query.page) {
      setCurrentPage(parseInt(router.query.page as string) || 1)
    }
  }, [
    router.query.sort_by,
    router.query.order,
    router.query.page,
    setSortBy,
    setOrder,
    setCurrentPage,
  ])

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page)
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, page: String(page) },
        },
        undefined,
        { shallow: true },
      )
    },
    [setCurrentPage, router],
  )

  const handleSortChange = useCallback(
    (sort_by: string, order: string, label: string) => {
      setSortBy(sort_by)
      setOrder(order)
      setSelectedSort(label)
      setCurrentPage(1)
      router.push(
        {
          pathname: router.pathname,
          query: { sort_by, order, page: '1' },
        },
        undefined,
        { shallow: true },
      )
    },
    [setSortBy, setOrder, setCurrentPage, router],
  )

  return (
    <PageRoot backgroundColor="gray.50">
      <Header viewer={viewer} />
      <Box>
        {isMobile ? (
          <Box p="24px">
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
                    {selectedSort}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() =>
                        handleSortChange('created_at', 'desc', '作成日順')
                      }
                    >
                      作成日順
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleSortChange('is_published', 'asc', '公開済み')
                      }
                    >
                      公開済み
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleSortChange('is_published', 'desc', '保存中')
                      }
                    >
                      保存中
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Box>
            <Box>
              <Flex wrap="wrap" justifyContent="center">
                {myposts.map((mypost, index) => (
                  <MemoizedMyPostCard
                    key={index}
                    myPost={mypost}
                    isMobile={isMobile}
                  />
                ))}
              </Flex>
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </Box>
          </Box>
        ) : (
          <Box p={isTablet ? '24px' : '96px'}>
            <Flex justifyContent="center">
              <Container maxWidth="1400px" bg="white" boxShadow="md" p={12}>
                <Flex>
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
                            {selectedSort}
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              onClick={() =>
                                handleSortChange(
                                  'created_at',
                                  'desc',
                                  '作成日順',
                                )
                              }
                            >
                              作成日順
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleSortChange(
                                  'is_published',
                                  'asc',
                                  '公開済み',
                                )
                              }
                            >
                              公開済み
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleSortChange(
                                  'is_published',
                                  'desc',
                                  '保存中',
                                )
                              }
                            >
                              保存中
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Flex>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      px={{ base: '8px', md: '24px' }}
                    >
                      <Box
                        width="100%"
                        maxWidth="1400px"
                        px={{ base: '8px', md: '24px' }}
                      >
                        <Flex
                          wrap="wrap"
                          gap={{ base: '8px', md: '8px' }}
                          justifyContent="flex-start"
                        >
                          {myposts.map((mypost, index) => (
                            <MemoizedMyPostCard key={index} myPost={mypost} />
                          ))}
                        </Flex>
                        {totalPages > 1 && (
                          <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Flex>
              </Container>
            </Flex>
          </Box>
        )}
      </Box>
      <PagePadding />
      <Footer />
    </PageRoot>
  )
}
