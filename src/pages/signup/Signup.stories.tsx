import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect, fn, waitFor } from '@storybook/test'

import { Signup } from './Signup'

const meta: Meta<typeof Signup> = {
  component: Signup,
  title: 'Pages/Signup',
}

export default meta

type Story = StoryObj<typeof Signup>

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
      await userEvent.type(canvas.getByLabelText('パスワード再確認'), 'abc')
      await userEvent.tab()
    })
    await step('Check for validation errors', async () => {
      await waitFor(() => {
        expect(
          canvas.getByText('メールアドレスの形式が間違っています'),
        ).toBeInTheDocument()
        expect(
          canvas.getByText('パスワードは6文字以上必要です（パスワード)'),
        ).toBeInTheDocument()
        expect(
          canvas.getByText('パスワードは6文字以上必要です（確認用）'),
        ).toBeInTheDocument()
      })
    })
  },
}

export const InputPasswordNotMatchError: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Enter credentials', async () => {
      await userEvent.type(canvas.getByLabelText('パスワード'), 'password')
      await userEvent.type(
        canvas.getByLabelText('パスワード再確認'),
        'password123',
      )
      await userEvent.tab()
    })
    await step('Check for validation errors', async () => {
      await waitFor(() => {
        expect(canvas.getByText('パスワードが一致しません')).toBeInTheDocument()
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
      await userEvent.type(
        canvas.getByLabelText('パスワード再確認'),
        'password',
      )
    })
    await step('Submit form', async () => {
      await userEvent.click(canvas.getByRole('button', { name: '新規登録' }))
    })

    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled())
  },
}
