import _ from 'lodash';

function success(config, current, record) {
  const reducerName = 'updateSuccess';

  current.recordsById[record[config.key]] = {
    ..._.omit(current.recordsById[record[config.key]], 'busy', 'pendingUpdate'),
    ...record
  };

  // mark record as unsaved and busy
  return {
    records: current.records,
    recordsById: current.recordsById
  };
}

export default success;