import _ from 'lodash';

function success(config, current, record) {
  const reducerName = 'deleteSuccess';

  let currentRecordsById = _.clone(current.recordsById);

  delete currentRecordsById[record[config.key]];

  let currentRecords = _.keys(currentRecordsById);

  return {
    records: currentRecords,
    recordsById: currentRecordsById
  }
}

export default success;