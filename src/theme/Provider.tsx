import { ChakraProvider } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { ThemeContext } from './Context'
import { themeSetting } from './theme'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = themeSetting

  return (
    <ChakraProvider theme={theme}>
      <ThemeContext.Provider value={{ theme }}>
        {children}
      </ThemeContext.Provider>
    </ChakraProvider>
  )
}

export const useTheme = () => useContext(ThemeContext)
