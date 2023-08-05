// import { TranslationView } from '../components/TranslationView';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';

import { CssVarsProvider } from '@mui/joy/styles';
import { theme } from './theme';
import { ModeToggle } from '../components/ModeToggle';
import { SignInForm } from '../components/SignInForm';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssVarsProvider theme={theme}>
          <SignInForm />
          
          <ModeToggle
            sx={{
              position: "absolute",
              top: 15,
              right: 15,
            }}
          />
          {/* <TranslationView /> */}
        </CssVarsProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
