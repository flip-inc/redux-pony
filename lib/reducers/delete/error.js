import _ from 'lodash';

function error(config, current, record) {
  var reducerName = 'deleteError';

  record = _.omit(current.recordsById[record[config.key]], 'busy', 'deleted');

  return {
    records: current.records,
    recordsById: _.merge(current.recordsById, _.keyBy(record, config.key))
  }
}

export default error;