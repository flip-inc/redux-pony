'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keyBy2 = require('lodash/keyBy');

var _keyBy3 = _interopRequireDefault(_keyBy2);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function start(config, current, record) {
  var reducerName = 'deleteStart';

  // mark record as unsaved and busy
  var recordStatus = {
    deleted: true,
    busy: true
  };

  record = [(0, _merge3.default)(record, recordStatus)];

  return {
    records: current.records,
    recordsById: (0, _merge3.default)(current.recordsById, (0, _keyBy3.default)(record, config.key))
  };
}

exports.default = start;