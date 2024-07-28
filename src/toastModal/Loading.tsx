import { ChakraProps, Flex, Spinner } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'

export const Loading: FC<ChakraProps> = ({ ...props }) => {
  const [showSpinner, setShowSpinner] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  })
  return (
    <>
      {showSpinner && (
        <Flex
          py={6}
          px={6}
          alignItems="center"
          justifyContent="center"
          {...props}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      )}
    </>
  )
}
