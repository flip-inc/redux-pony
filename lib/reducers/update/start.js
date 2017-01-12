import _ from 'lodash';

function start(config, current, record) {
  const reducerName = 'updateStart';

  // mark record as unsaved and busy
  let recordStatus = {
    busy: true,
    pendingUpdate: true,
  };

  record = _.merge(record, recordStatus);

  current.recordsById[record[config.key]] = {
    ...current.recordsById[record[config.key]],
    ...record
  };

  return {
    records: current.records,
    recordsById: current.recordsById
  }

}

export default start;