import _ from 'lodash';

function error(config, current, addedRecord) {
  const reducerName = 'createError';

  if (!addedRecord[config.key]) throw new Error('Expected record to have client generated id attribute.');

  let records = _.reject(current.records, function(record) {
    let recordKey = record;
    let isSameKey = addedRecord[config.key] === recordKey;
    return isSameKey;
  });

  records = _.uniq(records);

  let recordsById = _.map(records, function(record) {
    return current.recordsById[record];
  });

  return {
    records: records,
    recordsById: recordsById
  }
}

export default error;