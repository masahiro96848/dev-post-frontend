import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, waitFor, within } from '@storybook/test'
import { PostEdit } from './PostEdit'
import { User } from '@/types/graphql.gen'

const meta: Meta<typeof PostEdit> = {
  component: PostEdit,
  title: 'Pages/Post/edit',
}

export default meta

type Story = StoryObj<typeof PostEdit>

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

const dummyViewer: User = {
  id: '1',
  name: 'ダミーユーザー',
  email: 'dummy@example.com',
  imageUrl: '/dummy/dummy_user.jpg',
}

export const Default: Story = {
  args: {
    viewer: dummyViewer,
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
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement)

    // mockImageが存在するか確認
    if (mockImage) {
      await step('Input Form', async () => {
        // 記事タイトルを入力
        await userEvent.clear(canvas.getByLabelText('記事タイトル'))
        await userEvent.type(
          canvas.getByLabelText('記事タイトル'),
          'テスト記事タイトル',
        )

        // 本文を入力
        await userEvent.clear(canvas.getByLabelText('本文'))
        await userEvent.type(
          canvas.getByLabelText('本文'),
          'これはテスト記事の本文です。',
        )

        // 画像をアップロード
        await step('Upload Image', async () => {
          const fileInput = canvas.getByTestId(
            'image-upload',
          ) as HTMLInputElement

          // モック画像をアップロード
          await userEvent.upload(fileInput, mockImage)

          // アップロードが成功したことを確認
          expect(fileInput.files?.[0]).toStrictEqual(mockImage)
          expect(fileInput.files?.length).toBe(1)

          // 画像プレビューが正しく表示されるまで待機して確認
          await waitFor(() => {
            const imagePreview = canvas.getByAltText(
              'Uploaded image preview',
            ) as HTMLImageElement
            expect(imagePreview.src).toContain('data:image/png;base64,')
          })
        })

        // 公開ステータスを切り替える
        await step('Toggle Publish Status', async () => {
          const publishSwitch = canvas.getByLabelText(
            '公開ステータス',
          ) as HTMLInputElement

          // スイッチをオン（公開状態）に切り替え
          if (!publishSwitch.checked) {
            await userEvent.click(publishSwitch)
            expect(publishSwitch.checked).toBe(true)
          }
        })
      })

      await step('Submit Form', async () => {
        // 「記事を公開する」ボタンをクリック
        const submitButton = canvas.getByRole('button', {
          name: /記事を公開する/,
        })
        await userEvent.click(submitButton)

        // onSubmitが呼ばれたことを確認
        await waitFor(() => {
          expect(args.onSubmit).toHaveBeenCalledWith({
            title: 'テスト記事タイトル',
            body: 'これはテスト記事の本文です。',
            imageUrl: expect.stringContaining('data:image/png;base64,'),
            isPublished: 2,
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
