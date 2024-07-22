import { Box } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  children: React.ReactNode
  backgroundColor?: string
}

export const PageRoot: FC<Props> = ({
  children,
  backgroundColor,
  ...props
}) => {
  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      backgroundColor={backgroundColor}
      paddingTop="72px"
      {...props}
    >
      {children}
    </Box>
  )
}
