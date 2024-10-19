import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, waitFor, within } from '@storybook/test'
import { Profile } from './Profile'
import { User } from '@/types/graphql.gen'

const meta: Meta<typeof Profile> = {
  component: Profile,
  title: 'Pages/Setting/Profile',
}

export default meta

type Story = StoryObj<typeof Profile>

const dummyUser: User = {
  id: '1',
  name: 'ダミーテスト01',
  bio: 'Hello World!',
  email: 'dummy01@test.com',
  imageUrl: '/dummy/dummy_woman.jpg',
}

export const Default: Story = {
  args: {
    viewer: dummyUser,
    onSubmit: fn(),
  },
}

export const InputNameValidError: Story = {
  ...Default,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Input validation', async () => {
      await userEvent.type(
        canvas.getByLabelText('ユーザー名'),
        'ダミーテスト01',
      )
      await userEvent.clear(canvas.getByLabelText('ユーザー名'))
    })

    await step('Check for validation errors', async () => {
      await waitFor(() => {
        expect(canvas.getByText('必須項目です')).toBeInTheDocument()
      })

      const input = canvas.getByLabelText('ユーザー名') as HTMLInputElement
      expect(input.value).toBe('')
    })
  },
}

// Base64形式のダミー画像データ（1x1ピクセルの透明PNG）
const base64Image =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='

// Base64をFileオブジェクトに変換する関数
const base64ToFile = (base64: string, filename: string): File | null => {
  if (typeof window === 'undefined') {
    // サーバーサイドでは File オブジェクトを生成できないため null を返す
    return null
  }

  const arr = base64.split(',')
  const mimeMatch = arr[0].match(/:(.*?);/)
  const mime = mimeMatch ? mimeMatch[1] : ''
  const bstr = atob(arr[1])
  const n = bstr.length
  const u8arr = new Uint8Array(n)

  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i)
  }

  return new File([u8arr], filename, { type: mime })
}

// mockImageをBase64データから作成
const mockImage = base64ToFile(base64Image, 'test-image.png')

export const InputFilled: Story = {
  ...Default,
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement)

    // mockImageが存在するか確認
    if (mockImage) {
      await step('Input Form', async () => {
        await userEvent.clear(canvas.getByLabelText('ユーザー名'))
        await userEvent.type(canvas.getByLabelText('ユーザー名'), 'Dummy User')

        await userEvent.clear(canvas.getByLabelText('自己紹介文'))
        await userEvent.type(
          canvas.getByLabelText('自己紹介文'),
          'Hello World!',
        )

        await step('Upload Image', async () => {
          const fileInput = canvas.getByTestId(
            'image-upload',
          ) as HTMLInputElement

          // モック画像をアップロード
          await userEvent.upload(fileInput, mockImage)

          // アップロードが成功したことを確認
          expect(fileInput.files?.[0]).toStrictEqual(mockImage)
          expect(fileInput.files?.length).toBe(1)
        })
      })

      await step('Submit Form', async () => {
        await userEvent.click(
          canvas.getByRole('button', { name: 'プロフィールを変更する' }),
        )
        await waitFor(() => {
          expect(args.onSubmit).toHaveBeenCalledWith({
            name: 'Dummy User',
            bio: 'Hello World!',
            imageUrl: base64Image,
          })
        })
      })
    } else {
      // サーバーサイドの場合の処理（テストをスキップ）
      console.warn(
        'サーバーサイド環境のため、画像アップロードのテストをスキップします。',
      )
    }
  },
}
