import { TranslationView } from '../components/TranslationView';

import { CssVarsProvider } from '@mui/joy/styles';
import { theme } from './theme';
import { ModeToggle } from '../components/ModeToggle';

const App = () => {
  return (
    <CssVarsProvider theme={theme}>
      <ModeToggle sx={{
        position: 'absolute',
        top: 15,
        right: 15
      }} />
      <TranslationView />
    </CssVarsProvider>
  );
};

export default App;
