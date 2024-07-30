import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { PagePadding } from '@/components/layout/PagePadding'
import { PageRoot } from '@/components/layout/PageRoot'
import { Footer } from '@/components/navigation/Footer'
import { Header } from '@/components/navigation/Header'
import { signupSchema } from '@/schemas/validationSchema'
import { zodResolver } from '@/utils/zodResolver'

type FormValues = {
  email: string
  password: string
  passwordConfirmation: string
}

export const Signup: FC<{ onSubmit: (values: FormValues) => void }> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  return (
    <PageRoot backgroundColor="gray.50">
      <Header />
      <Box>
        <Container
          bg="white"
          boxShadow="md"
          p={12}
          mt="96px"
          border="3px solid white"
          borderColor="#850b0bf"
        >
          <VStack>
            <Heading fontSize="lg">新規登録</Heading>
          </VStack>
          <form onSubmit={handleSubmit((v) => onSubmit(v))}>
            <Stack spacing={4} mt="64px">
              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel fontWeight="600" color="gray.800">
                  メールアドレス
                </FormLabel>
                <Input
                  type="text"
                  size="lg"
                  inputMode="email"
                  px={4}
                  py={8}
                  placeholder="メールアドレスを入力"
                  {...register('email')}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="password" mt="6" isInvalid={!!errors.password}>
                <FormLabel fontWeight="600" color="gray.800">
                  パスワード
                </FormLabel>
                <Input
                  type="password"
                  size="lg"
                  placeholder="パスワードを入力"
                  px={4}
                  py={8}
                  {...register('password')}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                id="passwordConfirmation"
                mt="6"
                isInvalid={!!errors.passwordConfirmation}
              >
                <FormLabel fontWeight="600" color="gray.800">
                  パスワード再確認
                </FormLabel>
                <Input
                  type="password"
                  size="lg"
                  placeholder="パスワードを再確認"
                  px={4}
                  py={8}
                  {...register('passwordConfirmation')}
                />
                <FormErrorMessage>
                  {errors.passwordConfirmation &&
                    errors.passwordConfirmation.message}
                </FormErrorMessage>
              </FormControl>

              <Stack spacing={10} mt={12}>
                <Button
                  bg={isValid ? 'yellow.200' : 'gray.300'}
                  width="100%"
                  size="lg"
                  fontWeight="bold"
                  type="submit"
                  px={4}
                  py={8}
                  _hover={{ bg: isValid ? 'yellow.300' : 'gray.300' }}
                  isDisabled={!isValid}
                >
                  新規登録
                </Button>
              </Stack>
            </Stack>
          </form>
        </Container>
      </Box>
      <PagePadding />
      <Footer />
    </PageRoot>
  )
}
