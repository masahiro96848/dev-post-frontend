import { test, expect } from '@playwright/test'

test.describe('新規ユーザー登録', () => {
  test('新規登録後、記事一覧ページに遷移する', async ({ page }) => {
    const now = new Date().toISOString().replace(/[:.]/g, '-')
    const authEmail = `e2e_dev_${now}@test.com`
    const authPassword = process.env.AUTH_PASSWORD || 'password'

    const signupUrl = 'http://localhost:3001/signup'
    const postsUrl = 'http://localhost:3001/posts'

    await page.goto(signupUrl)
    await expect(page).toHaveURL(signupUrl)

    await page.getByRole('textbox', { name: 'メールアドレス' }).fill(authEmail)
    await page
      .getByRole('textbox', { name: 'パスワード', exact: true })
      .fill(authPassword)
    await page
      .getByRole('textbox', { name: 'パスワード再確認', exact: true })
      .fill(authPassword)
    await page.getByRole('button', { name: '新規登録' }).click()

    await expect(page).toHaveURL(postsUrl)
  })
})
