import type { Meta, StoryObj } from '@storybook/react'

import { Dashboard } from './Dashboard'
import { Post, User } from '@/types/graphql.gen'

const meta: Meta<typeof Dashboard> = {
  component: Dashboard,
  title: 'Pages/Dashboard',
}

export default meta

type Story = StoryObj<typeof Dashboard>

const dummyUser: User = {
  id: '1',
  name: 'ダミーテスト01',
  email: 'dummy01@test.com',
  imageUrl: '/dummy/dummy_woman.jpg',
}

// ダミーのデータを作成
const generateDummyPosts = (count: number): Post[] => {
  return Array.from({ length: count }, (_, i) => ({
    uid: `${i + 1}`,
    title: `Sample Post Title ${i + 1}`,
    body: `Sample Post Body for post ${i + 1}`,
    createdAt: new Date().toISOString(),
    imageUrl: '/dummy/dummy_background.jpg',
    user: {
      id: '1',
      name: 'Sample User',
      imageUrl: '/dummy/dummy_woman.jpg',
    },
    favoritesCount: i * 5,
    isPublished: Math.floor(Math.random() * 2) + 1,
  }))
}

// ダミーデータをcountによって生成
const dummyPosts = generateDummyPosts(20)

export const Default: Story = {
  args: {
    viewer: dummyUser,
    myposts: dummyPosts.slice(0, 12),
    currentPage: 1,
    postsPerPage: 10,
    setCurrentPage: (page) => console.log(`Set page: ${page}`),
    setSortBy: (sortBy) => console.log(`Set sort by: ${sortBy}`),
    setOrder: (order) => console.log(`Set order: ${order}`),
  },
}
