import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './Header'
import { User } from '@/types/graphql.gen'

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Components/Navigation/Header',
}

export default meta

type Story = StoryObj<typeof Header>

const dummyViewer: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  imageUrl: '/uploads/user/image_url/10/dummy_woman.jpg',
}

export const Default: Story = {
  args: {},
}

export const AuthenticatedHeader: Story = {
  args: {
    viewer: dummyViewer,
  },
}
