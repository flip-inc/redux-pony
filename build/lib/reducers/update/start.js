'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function start(config, current, record) {
  var reducerName = 'updateStart';

  // mark record as unsaved and busy
  var recordStatus = {
    busy: true,
    pendingUpdate: true
  };

  record = (0, _merge3.default)(record, recordStatus);

  current.recordsById[record[config.key]] = _extends({}, current.recordsById[record[config.key]], record);

  return {
    records: current.records,
    recordsById: current.recordsById
  };
}

exports.default = start;