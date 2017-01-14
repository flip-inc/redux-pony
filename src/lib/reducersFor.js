import actionTypesFor from './actionTypesFor';
import Immutable from 'seamless-immutable';
import _ from 'lodash';

import fetchSuccess from './reducers/fetch/success';
import createStart from './reducers/create/start';
import createSuccess from './reducers/create/success';
import createError from './reducers/create/error';
import updateStart from './reducers/update/start';
import updateSuccess from './reducers/update/success';
import updateError from './reducers/update/error';
import deleteStart from './reducers/delete/start';
import deleteSuccess from './reducers/delete/success';
import deleteError from './reducers/delete/error';
import { DEFAULT_KEY } from '../constants';

function emptyState(config) {
  let state = {
    records: [],
    recordsById: {}
  };

  if (config.objectModifier) {
    state = {};
    state[config.objectModifier] = {};
  }

  return state; 
}

function reducersFor(resourceName, args) {
  if (resourceName == null) throw new Error('reducersFor: Expected resourceName');

  args = args || {};

  let defaults = {
    key: DEFAULT_KEY,
    resourceName: resourceName
  };

  let modifiedState = {};

  let config = _.assign(defaults, args);

  return function reducers(state, action) {
    let originalState = state.asMutable ? state.asMutable({ deep: true }) : state;
    originalState = originalState || emptyState(config);
    modifiedState = originalState;

    if (config.objectModifier) {
      modifiedState = originalState[config.objectModifier][config.keyModifier] || emptyState({});
    } 

    if (action == null) throw new Error(resourceName + ' reducers: Expected action');

    let actionTypes = actionTypesFor(resourceName);
    let record = action.record;
    let error = action.error;
    let preparedRecords = {};

    switch (action.type) {

      case actionTypes.fetchSuccess:
        preparedRecords = fetchSuccess(config, modifiedState, action.records);

        if (action.meta) {
          let meta = action.meta;
          let pages = Math.ceil(parseInt(meta.totalResults)/meta.limit) || 1;
          let next = null;
          let prev = null;
          let page = 1;

          if (meta.offset) {
            page = Math.floor(meta.offset/meta.limit) + 1;
          }

          if (page !== 1) {
            prev = page - 1;
          }

          if (meta.totalResults > meta.offset + meta.limit) {
            next = page + 1;
          }

          meta.pagination = {
            page,
            next,
            prev,
            pages,
            total: meta.totalResults
          }
        }

        modifiedState = {
          ...modifiedState,
          ...preparedRecords,
          meta: action.meta
        };

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return Immutable(originalState);
        }

        return Immutable(modifiedState);
      case actionTypes.createStart:
        preparedRecords = createStart(config, modifiedState, record);

        modifiedState = {
          ...modifiedState,
          ...preparedRecords
        };

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return Immutable(originalState);
        }

        return Immutable(modifiedState);
      case actionTypes.createSuccess:
        preparedRecords = createSuccess(config, modifiedState, record, action.cid);
        
        modifiedState = {
          ...modifiedState,
          ...preparedRecords
        };

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return Immutable(originalState);
        }

        return Immutable(modifiedState);
      case actionTypes.createError:
        preparedRecords = createError(config, modifiedState, record);
        
        modifiedState = {
          ...modifiedState,
          ...preparedRecords
        };

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return Immutable(originalState);
        }

        return Immutable(modifiedState);
      case actionTypes.updateStart:
        preparedRecords = updateStart(config, modifiedState, record);
        
        modifiedState = {
          ...modifiedState,
          ...preparedRecords
        };

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return Immutable(originalState);
        }

        return Immutable(modifiedState);
      case actionTypes.updateSuccess:
        preparedRecords = updateSuccess(config, modifiedState, record);

        modifiedState = {
          ...modifiedState,
          ...preparedRecords
        };

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return Immutable(originalState);
        }

        return Immutable(modifiedState);
      case actionTypes.updateError:
        preparedRecords = updateError(config, modifiedState, record, error);
        
        modifiedState = {
          ...modifiedState,
          ...preparedRecords
        };

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return Immutable(originalState);
        }

        return Immutable(modifiedState);
      case actionTypes.deleteStart:
        preparedRecords = deleteStart(config, modifiedState, record);

        return Immutable({
          ...modifiedState,
          ...preparedRecords
        });

      case actionTypes.deleteSuccess:
        preparedRecords = deleteSuccess(config, modifiedState, record);

        modifiedState = {
          ...modifiedState,
          ...preparedRecords
        };

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return Immutable(originalState);
        }

        return Immutable(modifiedState);
      case actionTypes.deleteError:
        preparedRecords = deleteError(config, modifiedState, record);

        modifiedState = {
          ...modifiedState,
          ...preparedRecords
        };

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return Immutable(originalState);
        }

        return Immutable(modifiedState);
      default:
        return state;
    }

  }

}

export default reducersFor;
