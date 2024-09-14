import type { Meta, StoryObj } from '@storybook/react'

import { Posts } from './Posts'
import { Post } from '@/types/graphql.gen'

const meta: Meta<typeof Posts> = {
  component: Posts,
  title: 'Pages/Posts/Posts',
}

export default meta

type Story = StoryObj<typeof Posts>

// ダミーのデータを作成
const generateDummyPosts = (count: number): Post[] => {
  return Array.from({ length: count }, (_, i) => ({
    uid: `${i + 1}`,
    title: `Sample Post Title ${i + 1}`,
    body: `Sample Post Body for post ${i + 1}`,
    createdAt: new Date().toISOString(),
    imageUrl: '/dummy/dummy_background.jpg',
    user: {
      id: `${i + 1}`,
      name: `Sample User ${i + 1}`,
      imageUrl: '/dummy/dummy_woman.jpg',
    },
    favoritesCount: i * 5,
  }))
}

// ダミーデータをcountによって生成
const dummyPosts = generateDummyPosts(20)

//TODO: ページネーションの機能がうまくいっていない。
export const Default: Story = {
  args: {
    viewer: null,
    posts: dummyPosts.slice(0, 12),
    totalPosts: dummyPosts.length,
    currentPage: 1,
    postsPerPage: 10,
    setCurrentPage: (page) => console.log(`Set page: ${page}`),
    setSortBy: (sortBy) => console.log(`Set sort by: ${sortBy}`),
    setOrder: (order) => console.log(`Set order: ${order}`),
  },
}
