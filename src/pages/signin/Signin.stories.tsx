import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect, fn, waitFor } from '@storybook/test'

import { Signin } from './Signin'

const meta: Meta<typeof Signin> = {
  component: Signin,
  title: 'Pages/Signin',
}

export default meta

type Story = StoryObj<typeof Signin>

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
}

export const InputInValidError: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Enter credentials', async () => {
      await userEvent.type(canvas.getByLabelText('メールアドレス'), 'aabbcc')
      await userEvent.type(canvas.getByLabelText('パスワード'), 'abc')
      await userEvent.tab()
    })
    await step('Check for validation errors', async () => {
      await waitFor(() => {
        expect(
          canvas.getByText('メールアドレスの形式が間違っています'),
        ).toBeInTheDocument()
        expect(
          canvas.getByText('パスワードは6文字以上が必要です'),
        ).toBeInTheDocument()
      })
    })
  },
}

export const InputFilled: Story = {
  ...Default,
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Enter credentials', async () => {
      await userEvent.type(
        canvas.getByLabelText('メールアドレス'),
        'sample01@test.com',
      )
      await userEvent.type(canvas.getByLabelText('パスワード'), 'password')
    })
    await step('Submit form', async () => {
      await userEvent.click(canvas.getByRole('button'))
    })

    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled())
  },
}
