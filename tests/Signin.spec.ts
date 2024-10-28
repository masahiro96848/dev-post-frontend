import { test, expect } from '@playwright/test'

test('ログイン後、記事一覧ページに遷移する', async ({ page }) => {
  const authEmail = process.env.AUTH_EMAIL || 'sample01@test.com'
  const authPassword = process.env.AUTH_PASSWORD || 'password'

  const signinUrl = 'http://localhost:3001/signin'
  const postsUrl = 'http://localhost:3001/posts'

  await page.goto(signinUrl)

  await page.getByRole('textbox', { name: 'メールアドレス' }).fill(authEmail)
  await page.getByRole('textbox', { name: 'パスワード' }).fill(authPassword)
  await page.getByRole('button', { name: 'ログイン' }).click()

  await expect(page).toHaveURL(postsUrl)
})
