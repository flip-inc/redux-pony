'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _uniq2 = require('lodash/uniq');

var _uniq3 = _interopRequireDefault(_uniq2);

var _reject2 = require('lodash/reject');

var _reject3 = _interopRequireDefault(_reject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function error(config, current, addedRecord) {
  var reducerName = 'createError';

  if (!addedRecord[config.key]) throw new Error('Expected record to have client generated id attribute.');

  var records = (0, _reject3.default)(current.records, function (record) {
    var recordKey = record;
    var isSameKey = addedRecord[config.key] === recordKey;
    return isSameKey;
  });

  records = (0, _uniq3.default)(records);

  var recordsById = (0, _map3.default)(records, function (record) {
    return current.recordsById[record];
  });

  return {
    records: records,
    recordsById: recordsById
  };
}

exports.default = error;