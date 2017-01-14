'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function start(config, current, record) {
  var reducerName = 'updateStart';

  // mark record as unsaved and busy
  var recordStatus = {
    busy: true,
    pendingUpdate: true
  };

  record = _lodash2.default.merge(record, recordStatus);

  current.recordsById[record[config.key]] = _extends({}, current.recordsById[record[config.key]], record);

  return {
    records: current.records,
    recordsById: current.recordsById
  };
}

exports.default = start;