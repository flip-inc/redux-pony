'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function start(config, current, record) {
  var reducerName = 'deleteStart';

  // mark record as unsaved and busy
  var recordStatus = {
    deleted: true,
    busy: true
  };

  record = [_lodash2.default.merge(record, recordStatus)];

  return {
    records: current.records,
    recordsById: _lodash2.default.merge(current.recordsById, _lodash2.default.keyBy(record, config.key))
  };
}

exports.default = start;