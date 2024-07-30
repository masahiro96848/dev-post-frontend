import { z } from 'zod'

export const signinSchema = z.object({
  email: z
    .string()
    .email('メールアドレスの形式が間違っています')
    .min(1, { message: '必須項目です' }),
  password: z
    .string()
    .min(1, { message: '必須項目です' })
    .min(6, { message: 'パスワードは6文字以上が必要です' }),
})
