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
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState, useMemo, useCallback } from 'react'
import { PagePadding } from '@/components/layout/PagePadding'
import { PageRoot } from '@/components/layout/PageRoot'
import { Footer } from '@/components/navigation/Footer'
import { Header } from '@/components/navigation/Header'
import { Pagination } from '@/components/ui/Pagination'
import { MemoizedPostCard } from '@/components/ui/Post/Card'
import { Post, User } from '@/types/graphql.gen'

type Props = {
  viewer?: User | null
  posts: Post[]
  totalPosts: number
  currentPage: number
  postsPerPage: number
  setCurrentPage: (page: number) => void
  setSortBy: (sortBy: string) => void
  setOrder: (order: string) => void
}

export const Posts: FC<Props> = (props: Props) => {
  const {
    viewer,
    posts,
    totalPosts,
    currentPage,
    postsPerPage,
    setCurrentPage,
    setSortBy,
    setOrder,
  } = props
  const router = useRouter()
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [selectedSort, setSelectedSort] = useState<string>('更新日順')

  const totalPages = useMemo(
    () => Math.ceil(totalPosts / postsPerPage),
    [totalPosts, postsPerPage],
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

  // ページ読み込み時にクエリパラメータからソートオプションを復元
  useEffect(() => {
    if (router.query.sort_by) {
      setSortBy(router.query.sort_by as string)
      setSelectedSort(
        router.query.sort_by === 'favorites_count'
          ? 'スターの多い順'
          : '更新日順',
      )
    }
    if (router.query.order) {
      setOrder(router.query.order as string)
    }
    if (router.query.page) {
      setCurrentPage(parseInt(router.query.page as string) || 1)
    }
  }, [router.query.sort_by, router.query.order, router.query.page])

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
      <Header viewer={viewer ?? undefined} />
      {isMobile ? (
        <Box p="24px">
          <Box py="24px">
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
                  {selectedSort}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() =>
                      handleSortChange('created_at', 'desc', '更新日順')
                    }
                  >
                    更新日順
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleSortChange(
                        'favorites_count',
                        'desc',
                        'スターの多い順',
                      )
                    }
                  >
                    スターの多い順
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Box>
          <Box>
            <Flex wrap="wrap" justifyContent="center">
              {posts.map((post, index) => (
                <MemoizedPostCard key={index} post={post} isMobile={isMobile} />
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
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
                  {selectedSort}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() =>
                      handleSortChange('created_at', 'desc', '更新日順')
                    }
                  >
                    更新日順
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleSortChange(
                        'favorites_count',
                        'desc',
                        'スターの多い順',
                      )
                    }
                  >
                    スターの多い順
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
            <Box width="100%" maxWidth="1400px" px={{ base: '8px' }}>
              <Flex
                wrap="wrap"
                gap={{ base: '8px', md: '8px' }}
                justifyContent="flex-start"
              >
                {posts.map((post, index) => (
                  <MemoizedPostCard key={index} post={post} />
                ))}
              </Flex>
            </Box>
          </Box>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      )}
      <PagePadding />
      <Footer />
    </PageRoot>
  )
}
