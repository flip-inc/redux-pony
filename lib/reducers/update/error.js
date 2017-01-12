import _ from 'lodash';

function error(config, current, record, error) {
  // We don't want to rollback
  const reducerName = 'updateError';

  record = _.merge(record, { error });

  current.recordsById[record[config.key]] = {
    ..._.omit(current.recordsById[record[config.key]], 'busy', 'pendingUpdate'),
    ...record
  };

  return {
    records: current.records,
    recordsById: current.recordsById
  };

}

export default error;
