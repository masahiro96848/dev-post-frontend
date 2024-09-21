import { Button, HStack, VStack } from '@chakra-ui/react'
import type { Meta } from '@storybook/react'
import React from 'react'

export default {
  component: Button,
  tilte: 'Form/Button',
} as Meta

export const Solid: React.FC = () => {
  const params = [{}, { isDisabled: true }]
  return (
    <HStack spacing={3} m={4} alignItems="flex-start">
      <VStack>
        {params.map((p, i) => (
          <Button m={4} size="lg" key={i} {...p}>
            Large
          </Button>
        ))}
      </VStack>
      <VStack>
        {params.map((p, i) => (
          <Button m={4} size="md" key={i} {...p}>
            Medium
          </Button>
        ))}
      </VStack>
      <VStack>
        {params.map((p, i) => (
          <Button m={4} size="sm" key={i} {...p}>
            Small
          </Button>
        ))}
      </VStack>
    </HStack>
  )
}

export const Outline: React.FC = () => {
  const params = [{}, { isDisabled: true }]
  return (
    <HStack spacing={3} m={4} alignItems="flex-start">
      <VStack>
        {params.map((p, i) => (
          <Button m={4} size="lg" variant="outline" key={i} {...p}>
            Large
          </Button>
        ))}
      </VStack>
      <VStack>
        {params.map((p, i) => (
          <Button m={4} size="md" variant="outline" key={i} {...p}>
            Medium
          </Button>
        ))}
      </VStack>
      <VStack>
        {params.map((p, i) => (
          <Button m={4} size="sm" variant="outline" key={i} {...p}>
            Small
          </Button>
        ))}
      </VStack>
    </HStack>
  )
}
