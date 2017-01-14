'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function success(config, current, records) {
  var reducerName = config.resourceName + '.fetchSuccess';

  if (!config.key) throw new Error(reducerName + ': Expected config.key');
  if (!records) throw new Error(reducerName + ': Expected records');

  // Merge an array of server keys
  var currentKeys = _lodash2.default.map(current.recordsById, function (record) {
    if (record.serverId) return record.serverId;
    return record[config.key];
  });
  var newKeys = _lodash2.default.map(records, config.key);
  var allKeys = _lodash2.default.uniq(_lodash2.default.concat(currentKeys, newKeys));

  // Prepare keyed records
  var keyedNewRecords = _lodash2.default.keyBy(records, config.key);
  var keyedOldRecords = current.recordsById;

  // Merge old records with new ones, keeping in mind potential client created items
  var mergedOldRecords = _lodash2.default.keyBy(_lodash2.default.map(keyedOldRecords, function (record) {
    if (keyedNewRecords[record.serverId]) {
      delete keyedNewRecords[record.serverId][config.key];
      return _lodash2.default.merge(keyedNewRecords[record.serverId], record);
    }

    return _lodash2.default.merge(keyedNewRecords[record[config.key]], record);
  }), config.key);

  // Create an array of all objects
  var allRecords = _lodash2.default.map(allKeys, function (key) {
    if (mergedOldRecords[key]) return mergedOldRecords[key];

    return keyedNewRecords[key];
  });

  allRecords = _lodash2.default.compact(allRecords);

  // Prepare new state
  return {
    isLoading: false,
    records: _lodash2.default.map(allRecords, config.key),
    recordsById: _lodash2.default.keyBy(allRecords, config.key)
  };
}

exports.default = success;