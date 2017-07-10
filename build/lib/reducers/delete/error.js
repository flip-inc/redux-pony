'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keyBy2 = require('lodash/keyBy');

var _keyBy3 = _interopRequireDefault(_keyBy2);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function error(config, current, record) {
  var reducerName = 'deleteError';

  record = (0, _omit3.default)(current.recordsById[record[config.key]], 'busy', 'deleted');

  return {
    records: current.records,
    recordsById: (0, _merge3.default)(current.recordsById, (0, _keyBy3.default)(record, config.key))
  };
}

exports.default = error;