import {legacy_createStore} from 'redux';

import { AddReducer } from './reducers';


export const store = legacy_createStore(AddReducer);