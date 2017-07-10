'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionTypesFor = require('./actionTypesFor');

var _actionTypesFor2 = _interopRequireDefault(_actionTypesFor);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function actionCreatorsFor(resourceName, config) {
  if (resourceName == null) throw new Error('actionCreatorsFor: Expected resourceName');

  config = config || {};
  var actionTypes = (0, _actionTypesFor2.default)(resourceName);
  var key = config.key || _constants.DEFAULT_KEY;

  function assertError(actionCreatorName, error) {
    (0, _invariant2.default)(error != null, 'Expected error in ' + actionCreatorName);
  }

  function assertOneRecord(actionCreatorName, record) {
    (0, _invariant2.default)(record != null, 'Expected record in ' + actionCreatorName);
    (0, _invariant2.default)(record[key] != null, 'Expected record.' + key + ' in ' + actionCreatorName);
  }

  function assertManyRecords(actionCreatorName, records) {
    (0, _invariant2.default)(records != null, 'Expected records ' + actionCreatorName);
  }

  return {
    fetchStart: function fetchStart(data) {
      return {
        data: data,
        type: actionTypes.fetchStart
      };
    },
    fetchSuccess: function fetchSuccess(resource, data) {
      var name = 'fetchSuccess';

      return {
        data: data,
        records: resource.objects || [],
        meta: resource.meta || {},
        type: actionTypes.fetchSuccess
      };
    },
    fetchError: function fetchError(error, data) {
      var name = 'fetchError';

      return {
        data: data,
        error: error,
        type: actionTypes.fetchError
      };
    },
    createStart: function createStart(record, data) {
      var name = 'createStart';

      return {
        data: data,
        record: record,
        type: actionTypes.createStart
      };
    },
    createSuccess: function createSuccess(record, data, clientGeneratedKey) {
      var name = 'createSuccess';

      return {
        cid: clientGeneratedKey,
        data: data,
        record: record,
        type: actionTypes.createSuccess
      };
    },
    createError: function createError(error, record, data) {
      var name = 'createError';

      return {
        data: data,
        error: error,
        record: record,
        type: actionTypes.createError
      };
    },
    updateStart: function updateStart(record, data) {
      var name = 'updateStart';

      return {
        data: data,
        record: record,
        type: actionTypes.updateStart
      };
    },
    updateSuccess: function updateSuccess(record, data) {
      var name = 'updateSuccess';

      return {
        data: data,
        record: record,
        type: actionTypes.updateSuccess
      };
    },
    updateError: function updateError(error, record, data) {
      var name = 'updateError';

      return {
        data: data,
        error: error,
        record: record,
        type: actionTypes.updateError
      };
    },
    deleteStart: function deleteStart(record, data) {
      var name = 'deleteStart';

      return {
        data: data,
        record: record,
        type: actionTypes.deleteStart
      };
    },
    deleteSuccess: function deleteSuccess(record, data) {
      var name = 'deleteSuccess';

      return {
        data: data,
        record: record,
        type: actionTypes.deleteSuccess
      };
    },
    deleteError: function deleteError(error, record, data) {
      var name = 'deleteError';

      return {
        data: data,
        error: error,
        record: record,
        type: actionTypes.deleteError
      };
    }
  };
}

exports.default = actionCreatorsFor;