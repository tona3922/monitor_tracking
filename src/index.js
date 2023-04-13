import React from "react"
import ReactDOM from "react-dom"
import './styles/index.css'
import App from "./App"
import { DarkModeContextProvider } from "./context/darkModeContext"
import { Provider } from "react-redux"
import store, { persistor } from "./storage/stores"
import { PersistGate } from "redux-persist/integration/react";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DarkModeContextProvider>
          <App />
        </DarkModeContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode >,
  document.getElementById("root")
);
