import { extendTheme } from '@mui/joy/styles';

export const theme = extendTheme({
  cssVarPrefix: 'bs',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#88BDBF',
          100: '#b5d7d8',
          200: '#88bdbf',
          300: '#5aa4a6',
          400: '#399394',
          500: '#208180',
          600: '#1e7574',
          700: '#1b6664',
          800: '#185654',
          900: '#103c38',
        },
        neutral: {
          50: '#f1eeec',
          100: "#dcd4ce",
          200: "#c6b6ae",
          300: "#ae998c",
          400: "#9c8171",
          500: "#8a6a57",
          600: "#7d604f",
          700: "#6d5345",
          800: "#5e463b",
          900: "#4e3830",
        },
      }
    },
    dark: {
      palette: {
        primary: {
          100: '#185654',
          200: '#1b6664',
          300: '#1e7574',
          400: '#208180',
          500: '#399394',
          600: '#5aa4a6',
          700: '#88bdbf',
          900: '#88BDBF',
        },
        neutral: {
          outlinedColor: '#ffffff',
          outlinedHoverColor: '#ffffff',
          outlinedActiveBg: '#545454',
          50: '#c6b6ae',
          100: '#5e463b',
          200: '#646464',
          300: '#7d604f',
          400: '#8a6a57',
          500: '#9c8171',
          600: "#ae998c",
          700: "#c6b6ae",
          800: "#545454",
          900: '#242424',
        },
        text: {
          primary: '#ffffff',
          secondary: '#ffffff',
        },
        background: {
          surface: '#242424',
        }
      },
    },
  },
});
