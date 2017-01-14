import actionTypesFor from './actionTypesFor';
import invariant from 'invariant';
import _ from 'lodash';
import { DEFAULT_KEY } from '../constants';

function actionCreatorsFor(resourceName, config) {
  if (resourceName == null) throw new Error('actionCreatorsFor: Expected resourceName');

  config = config || {};
  let actionTypes = actionTypesFor(resourceName);
  let key = config.key || DEFAULT_KEY;

  function assertError(actionCreatorName, error) {
    invariant(error != null, 'Expected error in ' + actionCreatorName);
  }

  function assertOneRecord(actionCreatorName, record) {
    invariant(record != null, 'Expected record in ' + actionCreatorName);
    invariant(record[key] != null, 'Expected record.' + key + ' in ' + actionCreatorName);
  }

  function assertManyRecords(actionCreatorName, records) {
    invariant(records != null, 'Expected records ' + actionCreatorName);
  }

  return {
    fetchStart(data) {
      return {
        data: data,
        type: actionTypes.fetchStart,
      }
    },

    fetchSuccess(resource, data) {
      let name = 'fetchSuccess';

      return {
        data: data,
        records: resource.objects || [],
        meta: resource.meta || {},
        type: actionTypes.fetchSuccess,
      }
    },

    fetchError(error, data) {
      let name = 'fetchError';

      return {
        data:  data,
        error: error,
        type:  actionTypes.fetchError,
      }
    },

    createStart(record, data) {
      let name = 'createStart';

      return {
        data:    data,
        record:  record,
        type:    actionTypes.createStart,
      }
    },

    createSuccess(record, data, clientGeneratedKey) {
      let name = 'createSuccess';

      return {
        cid:     clientGeneratedKey,
        data:    data,
        record:  record,
        type:    actionTypes.createSuccess,
      }
    },

    createError(error, record, data) {
      let name = 'createError';

      return {
        data:    data,
        error:   error,
        record:  record,
        type:    actionTypes.createError,
      }
    },

    updateStart(record, data) {
      let name = 'updateStart';

      return {
        data:    data,
        record:  record,
        type:    actionTypes.updateStart,
      }
    },

    updateSuccess(record, data) {
      let name = 'updateSuccess';

      return {
        data:    data,
        record:  record,
        type:    actionTypes.updateSuccess,
      }
    },

    updateError(error, record, data) {
      let name = 'updateError';

      return {
        data:    data,
        error:   error,
        record:  record,
        type:    actionTypes.updateError,
      }
    },

    deleteStart(record, data) {
      let name = 'deleteStart';

      return {
        data:    data,
        record:  record,
        type:    actionTypes.deleteStart,
      }
    },

    deleteSuccess(record, data) {
      let name = 'deleteSuccess';

      return {
        data:    data,
        record:  record,
        type:    actionTypes.deleteSuccess,
      }
    },

    deleteError(error, record, data) {
      let name = 'deleteError';

      return {
        data:    data,
        error:   error,
        record:  record,
        type:    actionTypes.deleteError,
      }
    }
  }
}

export default actionCreatorsFor;
