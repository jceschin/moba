import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { createLogger } from "redux-logger";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reduxStore = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk, createLogger()))
);

const persistedStore = persistStore(reduxStore);

export { reduxStore, persistedStore };
