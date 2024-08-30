import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Flex, Button } from '@chakra-ui/react'
import React from 'react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Flex justify="center" mt={8} alignItems="center">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        mr={4}
        aria-label="Previous Page"
      >
        <ChevronLeftIcon boxSize={6} />
      </Button>

      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1
        return (
          <Button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            variant={pageNumber === currentPage ? 'solid' : 'outline'}
            mx={1}
            bg={pageNumber === currentPage ? 'orange.400' : 'transparent'}
            color={pageNumber === currentPage ? 'white' : 'black'}
            _hover={{
              bg: pageNumber === currentPage ? 'orange.500' : 'gray.100',
            }}
          >
            {pageNumber}
          </Button>
        )
      })}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        ml={4}
        aria-label="Next Page"
      >
        <ChevronRightIcon boxSize={6} />
      </Button>
    </Flex>
  )
}
