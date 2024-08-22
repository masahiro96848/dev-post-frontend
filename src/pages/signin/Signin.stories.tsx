import type { Meta, StoryObj } from '@storybook/react'

import { Signin } from './Signin'

const meta: Meta<typeof Signin> = {
  component: Signin,
}

export default meta

type Story = StoryObj<typeof Signin>

export const Default: Story = {
  args: {},
}
