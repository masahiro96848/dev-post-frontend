import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { PagePadding } from '@/components/layout/PagePadding'
import { PageRoot } from '@/components/layout/PageRoot'
import { Footer } from '@/components/navigation/Footer'
import { Header } from '@/components/navigation/Header'
import { postsSchema } from '@/schemas/validationSchema'
import { zodResolver } from '@/utils/zodResolver'

type FormValues = {
  title: string
  description: string
  body: string
}

export const PostEdit: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(postsSchema),
    defaultValues: {
      title: '',
      description: '',
      body: '',
    },
  })

  return (
    <PageRoot backgroundColor="gray.50">
      <Header />
      <Box>
        <Container
          maxWidth="1200px"
          bg="white"
          boxShadow="md"
          p={12}
          mt="96px"
          border="3px solid white"
          borderColor="#850b0bf"
        >
          <form onSubmit={handleSubmit((v) => v)}>
            <Stack spacing={4}>
              <FormControl id="title" isInvalid={!!errors.title}>
                <FormLabel fontWeight="600" color="gray.800">
                  記事タイトル
                </FormLabel>
                <Input
                  type="text"
                  size="lg"
                  px={4}
                  py={8}
                  placeholder="タイトル"
                  {...register('title')}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="description" mt="6">
                <FormLabel fontWeight="600" color="gray.800">
                  記事概要
                </FormLabel>
                <Input
                  type="text"
                  size="lg"
                  placeholder="概要を入力"
                  px={4}
                  py={8}
                  {...register('description')}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl id="body" mt="6">
                <FormLabel fontWeight="600" color="gray.800">
                  本文
                </FormLabel>
                <Textarea
                  size="lg"
                  placeholder="技術内容を入力"
                  height={600}
                  {...register('body')}
                />
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
