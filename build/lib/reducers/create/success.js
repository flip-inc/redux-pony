'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function success(config, current, addedRecord, clientGenKey) {
  var reducerName = 'createSuccess';

  var currentRecordsById = _lodash2.default.clone(current.recordsById);
  var currentRecords = _lodash2.default.clone(current.records);

  var addedIndex = _lodash2.default.findIndex(currentRecords, function (r) {
    return r === addedRecord[config.key];
  });

  if (clientGenKey && currentRecordsById[clientGenKey]) {
    addedRecord.serverId = addedRecord[config.key];
    addedRecord[config.key] = clientGenKey;
    currentRecordsById[clientGenKey] = _lodash2.default.merge(currentRecordsById[clientGenKey], addedRecord);
  } else if (addedIndex !== -1) {
    currentRecordsById[addedRecord[config.key]] = _lodash2.default.merge(addedRecord, currentRecordsById[addedRecord[config.key]]);
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