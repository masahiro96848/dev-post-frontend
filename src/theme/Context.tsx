import React from 'react'
import { Theme, themeSetting } from './theme'

type ThemeContextValue = {
  theme: Theme
}

export const ThemeContext = React.createContext<ThemeContextValue>({
  theme: themeSetting,
})
