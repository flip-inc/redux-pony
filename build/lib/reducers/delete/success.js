'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function success(config, current, record) {
  var reducerName = 'deleteSuccess';

  var currentRecordsById = _lodash2.default.clone(current.recordsById);

  delete currentRecordsById[record[config.key]];

  var currentRecords = _lodash2.default.keys(currentRecordsById);

  return {
    records: currentRecords,
    recordsById: currentRecordsById
  };
}

exports.default = success;