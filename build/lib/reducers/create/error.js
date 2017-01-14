'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function error(config, current, addedRecord) {
  var reducerName = 'createError';

  if (!addedRecord[config.key]) throw new Error('Expected record to have client generated id attribute.');

  var records = _lodash2.default.reject(current.records, function (record) {
    var recordKey = record;
    var isSameKey = addedRecord[config.key] === recordKey;
    return isSameKey;
  });

  records = _lodash2.default.uniq(records);

  var recordsById = _lodash2.default.map(records, function (record) {
    return current.recordsById[record];
  });

  return {
    records: records,
    recordsById: recordsById
  };
}

exports.default = error;