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
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PagePadding } from '@/components/layout/PagePadding'
import { PageRoot } from '@/components/layout/PageRoot'
import { Footer } from '@/components/navigation/Footer'
import { Header } from '@/components/navigation/Header'
import { profileSchema } from '@/schemas/validationSchema'
import { zodResolver } from '@/utils/zodResolver'

type FormValues = {
  name: string
  bio: string
}

export const Profile: FC = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      bio: '',
    },
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize() // 初期実行
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <PageRoot backgroundColor="gray.50">
      <Header />
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
          <form onSubmit={handleSubmit((v) => v)}>
            <Flex
              direction={isMobile ? 'column' : 'row'}
              justifyContent={isMobile ? 'center' : 'space-between'}
              alignItems="center"
            >
              <Flex
                direction="column"
                alignItems="center"
                mb={isMobile ? 6 : 0}
                mr={isMobile ? 0 : 8}
              >
                <Image
                  borderRadius="full"
                  boxSize={isMobile ? '150px' : '200px'}
                  src={imageSrc || 'https://via.placeholder.com/150'}
                  alt="Profile Picture"
                  mb={4}
                  objectFit="cover"
                />
                <Button
                  as="label"
                  colorScheme="teal"
                  variant="outline"
                  cursor="pointer"
                  mb={isMobile ? 6 : 0}
                  onClick={triggerFileUpload}
                >
                  写真を変更する
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    display="none"
                  />
                </Button>
              </Flex>

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
                  width={isMobile ? '100%' : 'auto'} // ここを追加
                >
                  <FormLabel>自己紹介文</FormLabel>
                  <Textarea
                    size="lg"
                    placeholder="自己紹介文を入力してください"
                    height={isMobile ? '150px' : '200px'}
                    {...register('bio')}
                    width="100%" // ここを追加
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
