import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import {usersReducer} from "../features/Users/usersSlice.ts";
import storage from 'redux-persist/lib/storage';
import {activitiesReducer} from "../features/Activities/activitiesSlice.ts";
import {usersAndActivitiesListReducer} from "../features/UsersAndActivitiesList/usersAndActivitiesListSlice.ts";


const usersPersistConfig = {
  key: 'test:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig,usersReducer),
    activities: activitiesReducer,
    usersAndActivitiesList: usersAndActivitiesListReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persister = persistStore(store);