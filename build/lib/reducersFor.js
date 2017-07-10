'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionTypesFor = require('./actionTypesFor');

var _actionTypesFor2 = _interopRequireDefault(_actionTypesFor);

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _success = require('./reducers/fetch/success');

var _success2 = _interopRequireDefault(_success);

var _start = require('./reducers/create/start');

var _start2 = _interopRequireDefault(_start);

var _success3 = require('./reducers/create/success');

var _success4 = _interopRequireDefault(_success3);

var _error = require('./reducers/create/error');

var _error2 = _interopRequireDefault(_error);

var _start3 = require('./reducers/update/start');

var _start4 = _interopRequireDefault(_start3);

var _success5 = require('./reducers/update/success');

var _success6 = _interopRequireDefault(_success5);

var _error3 = require('./reducers/update/error');

var _error4 = _interopRequireDefault(_error3);

var _start5 = require('./reducers/delete/start');

var _start6 = _interopRequireDefault(_start5);

var _success7 = require('./reducers/delete/success');

var _success8 = _interopRequireDefault(_success7);

var _error5 = require('./reducers/delete/error');

var _error6 = _interopRequireDefault(_error5);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function emptyState(config) {
  var state = {
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

  var defaults = {
    key: _constants.DEFAULT_KEY,
    resourceName: resourceName
  };

  var modifiedState = {};

  var config = (0, _assign3.default)(defaults, args);

  return function reducers(state, action) {
    var originalState = state.asMutable ? state.asMutable({ deep: true }) : state;
    originalState = originalState || emptyState(config);
    modifiedState = originalState;

    if (config.objectModifier) {
      modifiedState = originalState[config.objectModifier][config.keyModifier] || emptyState({});
    }

    if (action == null) throw new Error(resourceName + ' reducers: Expected action');

    var actionTypes = (0, _actionTypesFor2.default)(resourceName);
    var record = action.record;
    var error = action.error;
    var preparedRecords = {};

    switch (action.type) {

      case actionTypes.fetchSuccess:
        preparedRecords = (0, _success2.default)(config, modifiedState, action.records);

        if (action.meta) {
          var meta = action.meta;
          var pages = Math.ceil(parseInt(meta.totalResults) / meta.limit) || 1;
          var next = null;
          var prev = null;
          var page = 1;

          if (meta.offset) {
            page = Math.floor(meta.offset / meta.limit) + 1;
          }

          if (page !== 1) {
            prev = page - 1;
          }

          if (meta.totalResults > meta.offset + meta.limit) {
            next = page + 1;
          }

          meta.pagination = {
            page: page,
            next: next,
            prev: prev,
            pages: pages,
            total: meta.totalResults
          };
        }

        modifiedState = _extends({}, modifiedState, preparedRecords, {
          meta: action.meta
        });

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return (0, _seamlessImmutable2.default)(originalState);
        }

        return (0, _seamlessImmutable2.default)(modifiedState);
      case actionTypes.createStart:
        preparedRecords = (0, _start2.default)(config, modifiedState, record);

        modifiedState = _extends({}, modifiedState, preparedRecords);

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return (0, _seamlessImmutable2.default)(originalState);
        }

        return (0, _seamlessImmutable2.default)(modifiedState);
      case actionTypes.createSuccess:
        preparedRecords = (0, _success4.default)(config, modifiedState, record, action.cid);

        modifiedState = _extends({}, modifiedState, preparedRecords);

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return (0, _seamlessImmutable2.default)(originalState);
        }

        return (0, _seamlessImmutable2.default)(modifiedState);
      case actionTypes.createError:
        preparedRecords = (0, _error2.default)(config, modifiedState, record);

        modifiedState = _extends({}, modifiedState, preparedRecords);

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return (0, _seamlessImmutable2.default)(originalState);
        }

        return (0, _seamlessImmutable2.default)(modifiedState);
      case actionTypes.updateStart:
        preparedRecords = (0, _start4.default)(config, modifiedState, record);

        modifiedState = _extends({}, modifiedState, preparedRecords);

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return (0, _seamlessImmutable2.default)(originalState);
        }

        return (0, _seamlessImmutable2.default)(modifiedState);
      case actionTypes.updateSuccess:
        preparedRecords = (0, _success6.default)(config, modifiedState, record);

        modifiedState = _extends({}, modifiedState, preparedRecords);

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return (0, _seamlessImmutable2.default)(originalState);
        }

        return (0, _seamlessImmutable2.default)(modifiedState);
      case actionTypes.updateError:
        preparedRecords = (0, _error4.default)(config, modifiedState, record, error);

        modifiedState = _extends({}, modifiedState, preparedRecords);

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return (0, _seamlessImmutable2.default)(originalState);
        }

        return (0, _seamlessImmutable2.default)(modifiedState);
      case actionTypes.deleteStart:
        preparedRecords = (0, _start6.default)(config, modifiedState, record);

        return (0, _seamlessImmutable2.default)(_extends({}, modifiedState, preparedRecords));

      case actionTypes.deleteSuccess:
        preparedRecords = (0, _success8.default)(config, modifiedState, record);

        modifiedState = _extends({}, modifiedState, preparedRecords);

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return (0, _seamlessImmutable2.default)(originalState);
        }

        return (0, _seamlessImmutable2.default)(modifiedState);
      case actionTypes.deleteError:
        preparedRecords = (0, _error6.default)(config, modifiedState, record);

        modifiedState = _extends({}, modifiedState, preparedRecords);

        if (config.objectModifier) {
          originalState[config.objectModifier][config.keyModifier] = modifiedState;
          return (0, _seamlessImmutable2.default)(originalState);
        }

        return (0, _seamlessImmutable2.default)(modifiedState);
      default:
        return state;
    }
  };
}

exports.default = reducersFor;