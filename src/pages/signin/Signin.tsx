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
import { signinSchema } from '@/schemas/validationSchema'
import { zodResolver } from '@/utils/zodResolver'

type FormValues = {
  email: string
  password: string
}

export const Signin: FC<{ onSubmit: (values: FormValues) => void }> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
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
            <Heading fontSize="lg">ログイン</Heading>
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
                  data-testid="email"
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
                  px={4}
                  py={8}
                  placeholder="パスワードを入力"
                  data-testid="password"
                  {...register('password')}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
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
                  ログイン
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
