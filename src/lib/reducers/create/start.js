import _ from 'lodash';

function start(config, current, record) {
  const reducerName = 'createStart';

  let recordStatus = {
    busy:          true,
    pendingCreate: true,
  };

  if (!record[config.key]) throw new Error('Expected record to have client generated id attribute.');

  // Merge record with status
  record = [_.assign({}, record, recordStatus)];

  return {
    records: _.uniq(_.concat(current.records, _.map(record, config.key))),
    recordsById: _.merge(current.recordsById, _.keyBy(record, config.key))
  }
}

export default start;