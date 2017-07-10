'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function error(config, current, record, error) {
  // We don't want to rollback
  var reducerName = 'updateError';

  record = (0, _merge3.default)(record, { error: error });

  current.recordsById[record[config.key]] = _extends({}, (0, _omit3.default)(current.recordsById[record[config.key]], 'busy', 'pendingUpdate'), record);

  return {
    records: current.records,
    recordsById: current.recordsById
  };
}

exports.default = error;