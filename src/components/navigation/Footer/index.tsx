import { Box, ChakraProps, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React, { FC } from 'react'

export const Footer: FC<ChakraProps> = ({ ...props }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="50px"
      px={6}
      backgroundColor="gray.50"
      {...props}
    >
      <Box color="gray.600">Customer Management</Box>
      <NextLink href="">
        <Link>お問い合わせ</Link>
      </NextLink>
    </Box>
  )
}
