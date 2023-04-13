import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './figures/user.js'
import deviceReducer from './figures/device.js'

const persistConfig = {
    key: 'root',
    storage,
}

const reducers = combineReducers({
    user: userReducer,
    device: deviceReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)

export default store