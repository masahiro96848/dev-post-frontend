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
import { profileSchema } from '@/schemas/validationSchema'
import { User } from '@/types/graphql.gen'
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
  const [isMobile, setIsMobile] = useState(false)
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
      name: '',
      bio: '',
      imageUrl: '',
    },
  })

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const imageUrl = reader.result as string
        setImageSrc(imageUrl)
        setValue('imageUrl', imageUrl)
        await trigger('imageUrl') // バリデーションをトリガー
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileUpload = () => {
    document.getElementById('image-upload')?.click()
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize() // 初期実行
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setValue])

  return (
    <PageRoot backgroundColor="gray.50">
      <Header viewer={viewer} />
      <Box p={4}>
        <Container
          maxWidth={isMobile ? '100%' : '800px'}
          bg="white"
          boxShadow="md"
          px={isMobile ? 6 : 12}
          py={isMobile ? 12 : 12}
          mt="48px"
          border="3px solid white"
          borderColor="#850b0bf"
        >
          <Heading size={isMobile ? 'md' : 'lg'} mb={8}>
            プロフィール変更
          </Heading>
          <form
            onSubmit={handleSubmit((v) => {
              console.log(v) // 入力値をコンソールに表示
              onSubmit(v) // 既存のonSubmit関数を呼び出す
            })}
          >
            <Flex
              direction={isMobile ? 'column' : 'row'}
              justifyContent={isMobile ? 'center' : 'space-between'}
              alignItems="center"
            >
              <Box>
                <FormControl id="imageUrl" mt="6">
                  <Flex
                    align="center"
                    justify="left"
                    direction="column"
                    border="1px dashed gray"
                    borderRadius="md"
                    cursor="pointer"
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
                        <Button fontSize="sm" variant="ghost" mt={2}>
                          画像をアップロード
                        </Button>
                      </>
                    )}
                    <Input
                      id="image-upload"
                      type="file"
                      accept=".png, .jpg"
                      {...register('imageUrl', {
                        onChange: handleImageChange,
                      })}
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
                  width={isMobile ? '100%' : 'auto'}
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

                <FormControl
                  id="bio"
                  isInvalid={!!errors.bio}
                  width={isMobile ? '100%' : 'auto'}
                >
                  <FormLabel>自己紹介文</FormLabel>
                  <Textarea
                    size="lg"
                    placeholder="自己紹介文を入力してください"
                    height={isMobile ? '150px' : '200px'}
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
                width={isMobile ? '100%' : '50%'}
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
