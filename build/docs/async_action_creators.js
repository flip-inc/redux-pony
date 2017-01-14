'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxCrud = require('redux-crud');

var _reduxCrud2 = _interopRequireDefault(_reduxCrud);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cuid = require('cuid');

var _cuid2 = _interopRequireDefault(_cuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseActionCreators = _reduxCrud2.default.actionCreatorsFor('users');

var actionCreators = {
  fetchOne: function fetchOne(id) {
    return function (dispatch) {
      var action = baseActionCreators.fetchStart();
      dispatch(action);

      // send the request
      var url = '/users/' + id;
      var promise = someAjaxLibrary({
        url: url,
        method: 'GET'
      });

      promise.then(function (response) {
        var user = response.data.data;
        var action = baseActionCreators.fetchSuccess(user);
        dispatch(action);
      }, function (response) {
        // dispatch the error action
        // first param is the error
        var action = baseActionCreators.fetchError(response);
        dispatch(action);
      }).catch(function (err) {
        console.error(err.toString());
      });

      return promise;
    };
  },
  fetch: function fetch(page, limit) {
    return function (dispatch) {
      var action = baseActionCreators.fetchStart();
      dispatch(action);

      // send the request
      // e.g. /users?page=1&limit=20
      var url = '/users';
      var promise = someAjaxLibrary({
        url: url,
        method: 'GET',
        data: {
          page: page,
          limit: limit
        }
      });

      promise.then(function (response) {
        var users = response.data.data;
        var action = baseActionCreators.fetchSuccess(users);
        dispatch(action);
      }, function (response) {
        // dispatch the error action
        // first param is the error
        var action = baseActionCreators.fetchError(response);
        dispatch(action);
      }).catch(function (err) {
        console.error(err.toString());
      });

      return promise;
    };
  },
  create: function create(user) {
    return function (dispatch) {
      // Generate a cid so we can match the records
      var cid = (0, _cuid2.default)();
      user = user.merge({ id: cid });

      // optimistic creation
      var action = baseActionCreators.createStart(user);
      dispatch(action);

      // send the request
      var url = '/users/';
      var promise = someAjaxLibrary({
        url: url,
        method: 'POST',
        data: {
          user: user
        }
      });

      promise.then(function (response) {
        var returnedUser = response.data.data;
        var action = baseActionCreators.createSuccess(createdUser, cid);
        dispatch(action);
      }, function (response) {
        var action = baseActionCreators.createError(response, user);
        dispatch(action);
      }).catch(function (err) {
        console.error(err.toString());
      });

      return promise;
    };
  },
  update: function update(user) {
    return function (dispatch) {
      // optimistic update
      var action = baseActionCreators.updateStart(user);
      dispatch(action);

      // send the request
      var url = '/users/' + user.id;
      var promise = someAjaxLibrary({
        url: url,
        method: 'PATCH',
        data: {
          user: user
        }
      });

      promise.then(function (response) {
        var returnedUser = response.data.data;
        var action = baseActionCreators.updateSuccess(returnedUser);
        dispatch(action);
      }, function (response) {
        var action = baseActionCreators.updateError(response, user);
        dispatch(action);
      }).catch(function (err) {
        console.error(err.toString());
      });

      return promise;
    };
  },
  delete: function _delete(user) {
    return function (dispatch) {
      // optimistic delete
      var action = baseActionCreators.deleteStart(user);
      dispatch(action);

      // send the request
      var url = '/users/' + user.id;
      var promise = someAjaxLibrary({
        url: url,
        method: 'DELETE'
      });

      promise.then(function (response) {
        var returnedUser = response.data.data;
        var action = baseActionCreators.deleteSuccess(returnedUser);
        dispatch(action);
      }, function (response) {
        var action = baseActionCreators.deleteError(response, user);
        dispatch(action);
      }).catch(function (err) {
        console.error(err.toString());
      });

      return promise;
    };
  }
};

actionCreators = _lodash2.default.extend(baseActionCreators, actionCreators);

exports.default = actionCreators;