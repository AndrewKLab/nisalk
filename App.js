import React, { useEffect, useState } from 'react';
import { store } from './_helpers';
import { Provider } from 'react-redux';
import { theme } from './_styles';
import { Provider as PaperProvider } from 'react-native-paper';
//screens
import Router from './Router'

function App() {


  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Router />
      </PaperProvider>
    </Provider>
  )
}

export default App