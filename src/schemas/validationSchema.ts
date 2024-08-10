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

export const signupSchema = z
  .object({
    email: z
      .string()
      .email('メールアドレスの形式が間違っています')
      .min(1, { message: '必須項目です' }),
    password: z
      .string()
      .min(1, { message: '必須項目です' })
      .min(6, { message: 'パスワードは6文字以上が必要です' }),
    passwordConfirmation: z
      .string()
      .min(1, { message: '必須項目です' })
      .min(6, { message: 'パスワードは6文字以上が必要です' }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        path: ['passwordConfirmation'],
        message: 'パスワードが一致しません',
        code: 'custom',
      })
    }
  })

export const postsSchema = z.object({
  title: z
    .string()
    .min(1, { message: '必須項目です' })
    .max(50, { message: 'タイトルは50文字以内で入力してください' }),
  description: z
    .string()
    .max(50, { message: '説明は50文字以内で入力してください' })
    .optional(),
  body: z.string().optional(),
})

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, { message: '必須項目です' })
    .max(20, { message: 'ユーザー名は20文字以内で入力してください' }),
  bio: z
    .string()
    .max(100, { message: '自己紹介文は100文字以内で入力してください' })
    .optional(),
})
