'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trim2 = require('lodash/trim');

var _trim3 = _interopRequireDefault(_trim2);

var _snakeCase2 = require('lodash/snakeCase');

var _snakeCase3 = _interopRequireDefault(_snakeCase2);

exports.default = function (resource, config) {
  if (resource == null) throw new Error('Expected resource');
  config = config || {};
  if (config.addAlias == null) config.addAlias = true;

  resource = (0, _trim3.default)(resource);
  if (resource == '') throw new Error('Expected resource');
  var actionTypes = {};

  addGroup(resource, actionTypes, 'fetch', config);
  addGroup(resource, actionTypes, 'create', config);
  addGroup(resource, actionTypes, 'update', config);
  addGroup(resource, actionTypes, 'delete', config);

  return actionTypes;
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addGroup(resource, actionTypes, group, config) {
  var upperResource = (0, _snakeCase3.default)(resource).toUpperCase();
  var upperGroup = group.toUpperCase();

  var start = upperResource + '_' + upperGroup + '_START';
  var success = upperResource + '_' + upperGroup + '_SUCCESS';
  var error = upperResource + '_' + upperGroup + '_ERROR';
  var startAlias = group + 'Start';
  var successAlias = group + 'Success';
  var errorAlias = group + 'Error';

  actionTypes[start] = start;
  actionTypes[success] = success;
  actionTypes[error] = error;

  if (config.addAlias) {
    actionTypes[startAlias] = start;
    actionTypes[successAlias] = success;
    actionTypes[errorAlias] = error;
  }
}