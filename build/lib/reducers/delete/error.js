'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function error(config, current, record) {
  var reducerName = 'deleteError';

  record = _lodash2.default.omit(current.recordsById[record[config.key]], 'busy', 'deleted');

  return {
    records: current.records,
    recordsById: _lodash2.default.merge(current.recordsById, _lodash2.default.keyBy(record, config.key))
  };
}

exports.default = error;