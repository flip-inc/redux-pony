import _ from 'lodash';

function success(config, current, records) {
  const reducerName = config.resourceName + '.fetchSuccess';

  if (!config.key) throw new Error(reducerName + ': Expected config.key');
  if (!records) throw new Error(reducerName + ': Expected records');

  // Merge an array of server keys
  let currentKeys = _.map(current.recordsById, (record) => {
    if (record.serverId) return record.serverId;
    return record[config.key];
  });
  let newKeys = _.map(records, config.key);
  let allKeys = _.uniq(_.concat(currentKeys, newKeys));

  // Prepare keyed records
  let keyedNewRecords = _.keyBy(records, config.key);
  let keyedOldRecords = current.recordsById;

  // Merge old records with new ones, keeping in mind potential client created items
  let mergedOldRecords = _.keyBy(_.map(keyedOldRecords, (record) => {
    if (keyedNewRecords[record.serverId]) {
      delete keyedNewRecords[record.serverId][config.key];
      return _.merge(keyedNewRecords[record.serverId], record);
    }

    return _.merge(keyedNewRecords[record[config.key]], record);
  }), config.key);

  // Create an array of all objects
  let allRecords = _.map(allKeys, (key) => {
    if (mergedOldRecords[key]) return mergedOldRecords[key];

    return keyedNewRecords[key];
  });

  allRecords = _.compact(allRecords);

  // Prepare new state
  return {
    isLoading: false,
    records: _.map(allRecords, config.key),
    recordsById: _.keyBy(allRecords, config.key)
  }

}

export default success;
