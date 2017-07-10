'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _findIndex2 = require('lodash/findIndex');

var _findIndex3 = _interopRequireDefault(_findIndex2);

var _clone2 = require('lodash/clone');

var _clone3 = _interopRequireDefault(_clone2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function success(config, current, addedRecord, clientGenKey) {
  var reducerName = 'createSuccess';

  var currentRecordsById = (0, _clone3.default)(current.recordsById);
  var currentRecords = (0, _clone3.default)(current.records);

  var addedIndex = (0, _findIndex3.default)(currentRecords, function (r) {
    return r === addedRecord[config.key];
  });

  if (clientGenKey && currentRecordsById[clientGenKey]) {
    addedRecord.serverId = addedRecord[config.key];
    addedRecord[config.key] = clientGenKey;
    currentRecordsById[clientGenKey] = (0, _merge3.default)(currentRecordsById[clientGenKey], addedRecord);
  } else if (addedIndex !== -1) {
    currentRecordsById[addedRecord[config.key]] = (0, _merge3.default)(addedRecord, currentRecordsById[addedRecord[config.key]]);
  } else {
    currentRecords.push(addedRecord[config.key]);
    currentRecordsById[addedRecord[config.key]] = addedRecord;
  }

  return {
    records: currentRecords,
    recordsById: currentRecordsById
  };
}

exports.default = success;