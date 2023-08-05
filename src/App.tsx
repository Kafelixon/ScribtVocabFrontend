// import { TranslationView } from '../components/TranslationView';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';

import { CssVarsProvider } from '@mui/joy/styles';
import { theme } from './theme';
import { TopMenu } from "../components/TopMenu";
import { SignInForm } from '../components/SignInForm';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssVarsProvider theme={theme}>
          <SignInForm />
          <TopMenu />
          {/* <TranslationView /> */}
        </CssVarsProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
