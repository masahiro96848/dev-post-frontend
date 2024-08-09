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
  Switch,
  Flex,
  Image,
  IconButton,
} from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegImage } from 'react-icons/fa'
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
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [isPublished, setIsPublished] = useState(false)
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileUpload = () => {
    document.getElementById('image-upload')?.click()
  }

  const handleToggleChange = () => {
    setIsPublished((prev) => !prev)
  }

  return (
    <PageRoot backgroundColor="gray.50">
      <Header />
      <Box p={12}>
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
            <Flex>
              <Stack spacing={4} flex="1">
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
              </Stack>

              <Box ml={8} flexShrink={0}>
                <FormControl>
                  <FormLabel fontWeight="600" color="gray.800">
                    画像をアップロード
                  </FormLabel>
                  <Flex
                    align="center"
                    justify="center"
                    direction="column"
                    border="1px dashed gray"
                    p={4}
                    borderRadius="md"
                    cursor="pointer"
                    width="300px"
                    height="200px"
                    onClick={triggerFileUpload}
                  >
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt="Uploaded image preview"
                        width="300px"
                        height="200px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    ) : (
                      <>
                        <IconButton
                          icon={<FaRegImage />}
                          aria-label="Upload Image"
                          variant="ghost"
                          fontSize="3xl"
                        />
                        <Button variant="ghost" mt={2}>
                          画像をアップロード
                        </Button>
                      </>
                    )}
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      display="none"
                    />
                  </Flex>
                </FormControl>
              </Box>
            </Flex>

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

            <Flex align="center" justify="space-between" mt={6}>
              <FormControl display="flex" alignItems="center">
                <FormLabel fontWeight="600" color="gray.800" mb="0">
                  公開ステータス
                </FormLabel>
                <Switch
                  id="publish-status"
                  ml={4}
                  size="lg"
                  isChecked={isPublished}
                  onChange={handleToggleChange}
                />
              </FormControl>
            </Flex>

            <Stack spacing={10} mt={12}>
              <Button
                bg={isPublished ? 'black' : 'gray.300'}
                color={isPublished ? 'white' : 'black'}
                width="50%"
                mx="auto"
                size="lg"
                fontWeight="bold"
                type="submit"
                px={4}
                py={8}
                _hover={{
                  bg: isPublished ? 'black' : 'gray.400',
                }}
                isDisabled={!isValid}
              >
                {isPublished ? '記事を公開する' : '下書きを保存する'}
              </Button>
            </Stack>
          </form>
        </Container>
      </Box>
      <PagePadding />
      <Footer />
    </PageRoot>
  )
}
