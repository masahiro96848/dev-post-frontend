import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, waitFor, within } from '@storybook/test'
import { PostEdit } from './PostEdit'

const meta: Meta<typeof PostEdit> = {
  component: PostEdit,
  title: 'Pages/Post/edit',
}

export default meta

type Story = StoryObj<typeof PostEdit>

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
}

export const InputTitleValidError: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Input validation', async () => {
      await userEvent.type(
        canvas.getByLabelText('記事タイトル'),
        'ダミーテスト',
      )
      await userEvent.clear(canvas.getByLabelText('記事タイトル'))
    })
    await step('Check for validation errors', async () => {
      await waitFor(() => {
        expect(canvas.getByText('必須項目です')).toBeInTheDocument()
      })
    })
  },
}

export const InputFilled: Story = {
  ...Default,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Input Form', async () => {
      await userEvent.type(
        canvas.getByLabelText('記事タイトル'),
        'ダミーテスト',
      )
      await userEvent.type(canvas.getByLabelText('本文'), 'サンプルテスト')

      // await step('Upload Image', async () => {
      //   const fileInput = canvas.getByLabelText(
      //     '画像をアップロード',
      //   ) as HTMLInputElement

      //   await userEvent.upload(fileInput, mockImage)

      //   expect(fileInput.files?.[0]).toStrictEqual(mockImage)
      //   expect(fileInput.files?.length).toBe(1)
      // })
    })
    await step('Check for validation errors', async () => {})
  },
}

// const createFile = (name: string, size: number, type: string): File => {
//   const blob = new Blob(['a'.repeat(size)], { type })
//   return new File([blob], name, { type, lastModified: Date.now() })
// }

// const mockImage = createFile('test-image.png', 1024, 'image/png')
