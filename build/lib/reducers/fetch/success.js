'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compact2 = require('lodash/compact');

var _compact3 = _interopRequireDefault(_compact2);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _keyBy2 = require('lodash/keyBy');

var _keyBy3 = _interopRequireDefault(_keyBy2);

var _concat2 = require('lodash/concat');

var _concat3 = _interopRequireDefault(_concat2);

var _uniq2 = require('lodash/uniq');

var _uniq3 = _interopRequireDefault(_uniq2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function success(config, current, records) {
  var reducerName = config.resourceName + '.fetchSuccess';

  if (!config.key) throw new Error(reducerName + ': Expected config.key');
  if (!records) throw new Error(reducerName + ': Expected records');

  // Merge an array of server keys
  var currentKeys = (0, _map3.default)(current.recordsById, function (record) {
    if (record.serverId) return record.serverId;
    return record[config.key];
  });
  var newKeys = (0, _map3.default)(records, config.key);
  var allKeys = (0, _uniq3.default)((0, _concat3.default)(currentKeys, newKeys));

  // Prepare keyed records
  var keyedNewRecords = (0, _keyBy3.default)(records, config.key);
  var keyedOldRecords = current.recordsById;

  // Merge old records with new ones, keeping in mind potential client created items
  var mergedOldRecords = (0, _keyBy3.default)((0, _map3.default)(keyedOldRecords, function (record) {
    if (keyedNewRecords[record.serverId]) {
      delete keyedNewRecords[record.serverId][config.key];
      return (0, _merge3.default)(record, keyedNewRecords[record.serverId]);
    }

    return (0, _merge3.default)(record, keyedNewRecords[record[config.key]]);
  }), config.key);

  // Create an array of all objects
  var allRecords = (0, _map3.default)(allKeys, function (key) {
    if (mergedOldRecords[key]) return mergedOldRecords[key];

    return keyedNewRecords[key];
  });

  allRecords = (0, _compact3.default)(allRecords);

  // Prepare new state
  return {
    isLoading: false,
    records: (0, _map3.default)(allRecords, config.key),
    recordsById: (0, _keyBy3.default)(allRecords, config.key)
  };
}

exports.default = success;