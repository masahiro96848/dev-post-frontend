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
  Flex,
  Image,
  Heading,
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
import { profileSchema } from '@/schemas/validationSchema'
import { User } from '@/types/graphql.gen'
import { convertImageUrlToBase64 } from '@/utils/blob'
import { zodResolver } from '@/utils/zodResolver'

type FormValues = {
  name: string
  bio?: string
  imageUrl?: string
}

export const Profile: FC<{
  viewer: User
  onSubmit: (values: FormValues) => void
}> = ({ viewer, onSubmit }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: viewer.name ?? '',
      bio: viewer.bio ?? '',
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
        await trigger('imageUrl') // バリデーションをトリガー
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileUpload = () => {
    document.getElementById('image-upload')?.click()
  }

  useEffect(() => {
    const initializeImage = async () => {
      if (viewer.imageUrl && !imageSrc) {
        try {
          const base64Image = await convertImageUrlToBase64(
            imageOrigin + viewer.imageUrl,
          )
          setImageSrc(base64Image as string)
          setValue('imageUrl', base64Image as string)
        } catch (error) {
          console.error('画像のBase64変換エラー:', error)
        }
      }
    }

    initializeImage()
  }, [viewer, imageSrc, setValue])

  return (
    <PageRoot backgroundColor="gray.50">
      <Header viewer={viewer} />
      <Box p={4}>
        <Container
          maxW={{ base: '100%', md: '800px' }}
          bg="white"
          boxShadow="md"
          px={{ base: 6, md: 12 }}
          py={{ base: 12, md: 12 }}
          mt="48px"
          border="3px solid white"
          borderColor="#850b0bf"
        >
          <Heading size={{ base: 'md', md: 'lg' }} mb={8} textAlign="left">
            プロフィール変更
          </Heading>
          <form onSubmit={handleSubmit((v) => onSubmit(v))}>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justifyContent={{ base: 'flex-start', md: 'space-between' }}
              alignItems={{ base: 'stretch', md: 'flex-start' }}
              gap={{ base: 6, md: 12 }}
            >
              <Box flexShrink={0}>
                <FormControl id="imageUrl" mt={{ base: 0, md: 6 }}>
                  <Flex
                    align="center"
                    justify="center"
                    direction="column"
                    border="1px dashed gray"
                    borderRadius="md"
                    cursor="pointer"
                    onClick={triggerFileUpload}
                    width={{ base: '100%', md: '300px' }}
                    height={{ base: '200px', md: '200px' }}
                    overflow="hidden"
                  >
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt="Uploaded image preview"
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    ) : (
                      <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        height="100%"
                      >
                        <IconButton
                          icon={<FaRegImage />}
                          aria-label="Upload Image"
                          variant="ghost"
                          fontSize="3xl"
                          mb={2}
                        />
                        <Button fontSize="sm" variant="ghost">
                          画像をアップロード
                        </Button>
                      </Flex>
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

              <Stack spacing={4} flex="1" width="100%">
                <FormControl
                  id="name"
                  isInvalid={!!errors.name}
                  mb={4}
                  width="100%"
                >
                  <FormLabel>ユーザー名</FormLabel>
                  <Input
                    type="text"
                    size="lg"
                    placeholder="Sample Test"
                    {...register('name')}
                    width="100%"
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="bio" isInvalid={!!errors.bio} width="100%">
                  <FormLabel>自己紹介文</FormLabel>
                  <Textarea
                    size="lg"
                    placeholder="自己紹介文を入力してください"
                    height={{ base: '150px', md: '200px' }}
                    {...register('bio')}
                    width="100%"
                  />
                  <FormErrorMessage>
                    {errors.bio && errors.bio.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </Flex>

            <Stack spacing={10} mt={12}>
              <Button
                bg="black"
                color="white"
                width={{ base: '100%', md: '50%' }}
                mx="auto"
                size="lg"
                fontWeight="bold"
                type="submit"
                _hover={{
                  bg: 'gray.700',
                }}
                isDisabled={!isValid}
              >
                プロフィールを変更する
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
