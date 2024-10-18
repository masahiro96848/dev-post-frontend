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
import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegImage } from 'react-icons/fa'
import { PagePadding } from '@/components/layout/PagePadding'
import { PageRoot } from '@/components/layout/PageRoot'
import { Footer } from '@/components/navigation/Footer'
import { Header } from '@/components/navigation/Header'
import { imageOrigin } from '@/constants/post'
import { postsSchema } from '@/schemas/validationSchema'
import { Post, User } from '@/types/graphql.gen'
import { convertImageUrlToBase64 } from '@/utils/blob'
import { zodResolver } from '@/utils/zodResolver'

type FormValues = {
  title: string
  body?: string
  imageUrl?: string
  isPublished: number
}

export const PostEdit: FC<{
  viewer: User
  post: Post
  onSubmit: (values: FormValues) => void
}> = ({ viewer, post, onSubmit }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(postsSchema),
    defaultValues: {
      title: post?.title ?? '',
      body: post?.body ?? '',
      imageUrl: post?.imageUrl ?? '',
      isPublished: post?.isPublished ?? 1,
    },
  })

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const imageUrl = reader.result as string
        setImageSrc(imageUrl)
        setValue('imageUrl', imageUrl, {
          shouldValidate: true,
          shouldDirty: true,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileUpload = () => {
    document.getElementById('image-upload')?.click()
  }

  const isPublished = watch('isPublished', 1)

  useEffect(() => {
    const initializeImage = async () => {
      if (post?.imageUrl && !imageSrc) {
        try {
          const base64Image = await convertImageUrlToBase64(
            imageOrigin + post.imageUrl,
          )
          setImageSrc(base64Image as string)
          setValue('imageUrl', base64Image as string)
        } catch (error) {
          console.error('画像のBase64変換エラー:', error)
        }
      }

      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }

      handleResize() // 初期実行
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }

    initializeImage()
  }, [post, isPublished, setValue, imageSrc])

  return (
    <PageRoot backgroundColor="gray.50">
      <Header viewer={viewer} />
      <Box p={4}>
        {isMobile ? (
          <Container
            bg="white"
            boxShadow="md"
            p={8}
            border="3px solid white"
            borderColor="#850b0bf"
          >
            <form onSubmit={handleSubmit((v) => onSubmit(v))}>
              <Stack spacing={4} flex="1">
                <FormControl id="title" isInvalid={!!errors.title}>
                  <FormLabel fontSize="sm" fontWeight="600" color="gray.800">
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
              </Stack>

              <Box flexShrink={0}>
                <FormControl id="imageUrl" mt="6">
                  <FormLabel
                    textAlign="left"
                    fontSize="sm"
                    fontWeight="600"
                    color="gray.800"
                  >
                    画像をアップロード
                  </FormLabel>
                  <Flex
                    align="center"
                    justify="left"
                    direction="column"
                    border="1px dashed gray"
                    borderRadius="md"
                    cursor="pointer"
                    onClick={triggerFileUpload}
                    p={4}
                  >
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt="Uploaded image preview"
                        width="300px"
                        height="200px"
                        objectFit="cover"
                        borderRadius="md"
                        mb={2}
                      />
                    ) : (
                      <>
                        <IconButton
                          icon={<FaRegImage />}
                          aria-label="Upload Image"
                          variant="ghost"
                          fontSize="3xl"
                        />
                        <Button fontSize="sm" variant="ghost" mt={2}>
                          画像をアップロード
                        </Button>
                      </>
                    )}
                    <Input
                      id="image-upload"
                      data-testid="image-upload"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleImageChange}
                      display="none"
                    />
                  </Flex>
                </FormControl>
              </Box>

              <FormControl id="body" mt="6">
                <FormLabel fontSize="sm" fontWeight="600" color="gray.800">
                  本文
                </FormLabel>
                <Textarea
                  size="lg"
                  placeholder="技術内容を入力"
                  height={400}
                  {...register('body')}
                />
              </FormControl>

              <Flex align="center" justify="space-between" mt={6}>
                <FormControl display="flex" alignItems="center">
                  <FormLabel
                    htmlFor="isPublished"
                    fontWeight="600"
                    color="gray.800"
                    mb="0"
                  >
                    公開ステータス
                  </FormLabel>
                  <Switch
                    id="isPublished"
                    ml={4}
                    size="lg"
                    isChecked={isPublished === 2}
                    onChange={(e) => {
                      const value = e.target.checked ? 2 : 1
                      setValue('isPublished', value)
                    }}
                  />
                </FormControl>
              </Flex>

              <Stack spacing={10} mt={12}>
                <Button
                  bg={isPublished === 1 ? 'gray.300' : 'blue.600'}
                  color={isPublished === 1 ? 'black' : 'white'}
                  width="100%"
                  mx="auto"
                  size="lg"
                  fontWeight="bold"
                  type="submit"
                  px={4}
                  py={8}
                  _hover={{
                    bg: isPublished === 1 ? 'gray.300' : 'blue.500',
                  }}
                  isDisabled={!isValid}
                >
                  {isPublished === 1 ? '下書きを保存する' : '記事を公開する'}
                </Button>
              </Stack>
            </form>
          </Container>
        ) : (
          <Container
            maxWidth="1200px"
            bg="white"
            boxShadow="md"
            p={12}
            mt="48px"
            border="3px solid white"
            borderColor="#850b0bf"
          >
            <form
              onSubmit={handleSubmit((values) => {
                console.log('Submitting form with values:', values)
                onSubmit(values)
              })}
            >
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
                </Stack>

                <Box ml={8} flexShrink={0}>
                  <FormControl id="imageUrl">
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
                          mb={2}
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
                        data-testid="image-upload"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleImageChange}
                        display="none"
                      />
                    </Flex>
                  </FormControl>
                </Box>
              </Flex>

              <Flex align="center" justify="space-between" mt={6}>
                <FormControl
                  id="isPublished"
                  display="flex"
                  alignItems="center"
                >
                  <FormLabel
                    htmlFor="isPublished"
                    fontWeight="600"
                    color="gray.800"
                    mb="0"
                  >
                    公開ステータス
                  </FormLabel>
                  <Switch
                    id="isPublished"
                    ml={4}
                    size="lg"
                    isChecked={isPublished === 2}
                    onChange={(e) => {
                      const value = e.target.checked ? 2 : 1
                      setValue('isPublished', value)
                    }}
                  />
                </FormControl>
              </Flex>
              <Stack spacing={10} mt={12}>
                <Button
                  bg={isPublished === 1 ? 'gray.300' : 'blue.600'}
                  color={isPublished === 1 ? 'black' : 'white'}
                  width="50%"
                  mx="auto"
                  size="lg"
                  fontWeight="bold"
                  type="submit"
                  px={4}
                  py={8}
                  _hover={{
                    bg: isPublished === 1 ? 'gray.300' : 'blue.500',
                  }}
                  isDisabled={!isValid}
                >
                  {isPublished === 1 ? '下書きを保存する' : '記事を公開する'}
                </Button>
              </Stack>
            </form>
          </Container>
        )}
      </Box>
      <PagePadding />
      <Footer />
    </PageRoot>
  )
}
