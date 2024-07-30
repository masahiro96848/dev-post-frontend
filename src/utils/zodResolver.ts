import { ZodSchema, ZodError } from 'zod'

export const zodResolver = <T>(schema: ZodSchema<T>) => {
  return async (data: T) => {
    try {
      const result = schema.parse(data)
      return { values: result, errors: {} }
    } catch (err) {
      if (err instanceof ZodError) {
        return {
          values: {},
          errors: err.errors.reduce(
            (acc: Record<string, { type: string; message: string }>, error) => {
              acc[error.path[0] as string] = {
                type: error.code,
                message: error.message,
              }
              return acc
            },
            {},
          ),
        }
      }
      // If it's not a ZodError, rethrow the error
      throw err
    }
  }
}
