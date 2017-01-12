import _ from 'lodash';

function start(config, current, record) {
  var reducerName = 'deleteStart';

  // mark record as unsaved and busy
  var recordStatus = {
    deleted: true,
    busy: true
  };

  record = [_.merge(record, recordStatus)];
      
  return {
    records: current.records,
    recordsById: _.merge(current.recordsById, _.keyBy(record, config.key))
  }
}

export default start;