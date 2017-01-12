import _ from 'lodash';

function success(config, current, addedRecord, clientGenKey) {
  const reducerName = 'createSuccess';

  let currentRecordsById = _.clone(current.recordsById);
  let currentRecords = _.clone(current.records);

  let addedIndex = _.findIndex(currentRecords, r => { return r === addedRecord[config.key]; });

  if (clientGenKey && currentRecordsById[clientGenKey]) {
    addedRecord.serverId = addedRecord[config.key];
    addedRecord[config.key] = clientGenKey;
    currentRecordsById[clientGenKey] = _.merge(currentRecordsById[clientGenKey], addedRecord);
  } else if (addedIndex !== -1) {
    currentRecordsById[addedRecord[config.key]] = _.merge(addedRecord, currentRecordsById[addedRecord[config.key]])
  } else {
    currentRecords.push(addedRecord[config.key]);
    currentRecordsById[addedRecord[config.key]] = addedRecord;
  }

  return {
    records: currentRecords,
    recordsById: currentRecordsById
  }
}

export default success;