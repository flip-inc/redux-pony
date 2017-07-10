'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys2 = require('lodash/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _clone2 = require('lodash/clone');

var _clone3 = _interopRequireDefault(_clone2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function success(config, current, record) {
  var reducerName = 'deleteSuccess';

  var currentRecordsById = (0, _clone3.default)(current.recordsById);

  delete currentRecordsById[record[config.key]];

  var currentRecords = (0, _keys3.default)(currentRecordsById);

  return {
    records: currentRecords,
    recordsById: currentRecordsById
  };
}

exports.default = success;