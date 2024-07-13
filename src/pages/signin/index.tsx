import {
  Box,
  Button,
  ChakraProps,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { usePagesSigninIndexQuery } from './index.gen'
import { PagePadding } from '@/components/layout/PagePadding'
import { PageRoot } from '@/components/layout/PageRoot'
import { Footer } from '@/components/navigation/Footer'
import { Header } from '@/components/navigation/Header'

const SigninPage: FC<ChakraProps> = () => {
  const { data, error, loading } = usePagesSigninIndexQuery()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  console.log(data)

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
          <form action="">
            <Stack spacing={4} mt="64px">
              <FormControl id="email">
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
                />
              </FormControl>
              <FormControl id="password" mt="6">
                <FormLabel fontWeight="600" color="gray.800">
                  パスワード
                </FormLabel>
                <Input
                  type="password"
                  size="lg"
                  placeholder="パスワードを入力"
                  px={4}
                  py={8}
                />
              </FormControl>

              <Stack spacing={10} mt={12}>
                <Button
                  bg="yellow.200"
                  width="100%"
                  size="lg"
                  fontWeight="bold"
                  type="submit"
                  px={4}
                  py={8}
                  _hover={{ bg: 'yellow.300' }}
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

export default SigninPage
