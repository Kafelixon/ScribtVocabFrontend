import { TranslationView } from '../components/TranslationView';

import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
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
            },
        },
    },
});

const App = () => {

  return (
    <CssVarsProvider theme={theme}>
      <TranslationView />
    </CssVarsProvider>
  );
};

export default App;
