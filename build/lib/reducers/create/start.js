'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keyBy2 = require('lodash/keyBy');

var _keyBy3 = _interopRequireDefault(_keyBy2);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _concat2 = require('lodash/concat');

var _concat3 = _interopRequireDefault(_concat2);

var _uniq2 = require('lodash/uniq');

var _uniq3 = _interopRequireDefault(_uniq2);

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function start(config, current, record) {
  var reducerName = 'createStart';

  var recordStatus = {
    busy: true,
    pendingCreate: true
  };

  if (!record[config.key]) throw new Error('Expected record to have client generated id attribute.');

  // Merge record with status
  record = [(0, _assign3.default)({}, record, recordStatus)];

  return {
    records: (0, _uniq3.default)((0, _concat3.default)(current.records, (0, _map3.default)(record, config.key))),
    recordsById: (0, _merge3.default)(current.recordsById, (0, _keyBy3.default)(record, config.key))
  };
}

exports.default = start;