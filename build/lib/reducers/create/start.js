'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function start(config, current, record) {
  var reducerName = 'createStart';

  var recordStatus = {
    busy: true,
    pendingCreate: true
  };

  if (!record[config.key]) throw new Error('Expected record to have client generated id attribute.');

  // Merge record with status
  record = [_lodash2.default.assign({}, record, recordStatus)];

  return {
    records: _lodash2.default.uniq(_lodash2.default.concat(current.records, _lodash2.default.map(record, config.key))),
    recordsById: _lodash2.default.merge(current.recordsById, _lodash2.default.keyBy(record, config.key))
  };
}

exports.default = start;