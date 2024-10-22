import { test, expect } from '@playwright/test'

test('ログイン後、記事一覧ページに遷移する', async ({ page }) => {
  await page.goto('http://localhost:3001/signin')

  // コンソールメッセージをキャプチャ
  page.on('console', (msg) => {
    console.log(`Console message: [${msg.type()}] ${msg.text()}`)
  })

  // ページエラーをキャプチャ
  page.on('pageerror', (error) => {
    console.log(`Page error: ${error.message}`)
  })

  // ネットワークリクエストをキャプチャ
  page.on('request', (request) => {
    console.log(`Request: ${request.method()} ${request.url()}`)
  })

  // ネットワークリスポンスをキャプチャ
  page.on('response', (response) => {
    console.log(`Response: ${response.status()} ${response.url()}`)
  })

  await page
    .getByRole('textbox', { name: 'メールアドレス' })
    .fill('sample01@test.com')
  await page.getByRole('textbox', { name: 'パスワード' }).fill('password')
  await page.getByRole('button', { name: 'ログイン' }).click()

  await expect(page).toHaveURL('http://localhost:3001/posts')
})
