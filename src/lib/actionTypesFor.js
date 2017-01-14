import _ from 'lodash';

function addGroup(resource, actionTypes, group, config) {
  let upperResource = _.snakeCase(resource).toUpperCase();
  let upperGroup = group.toUpperCase();

  let start = upperResource + '_' + upperGroup + '_START';
  let success = upperResource + '_' + upperGroup + '_SUCCESS';
  let error = upperResource + '_' + upperGroup + '_ERROR';
  let startAlias = group + 'Start';
  let successAlias = group + 'Success';
  let errorAlias = group + 'Error';

  actionTypes[start]   = start;
  actionTypes[success] = success;
  actionTypes[error]   = error;
  
  if (config.addAlias) {
    actionTypes[startAlias] = start;
    actionTypes[successAlias] = success;
    actionTypes[errorAlias] = error;
  }
}

export default function(resource, config) {
  if (resource == null) throw new Error('Expected resource');
  config = config || {};
  if (config.addAlias == null) config.addAlias = true;

  resource = _.trim(resource);
  if (resource == '')   throw new Error('Expected resource');
  let actionTypes = {};

  addGroup(resource, actionTypes, 'fetch', config);
  addGroup(resource, actionTypes, 'create', config);
  addGroup(resource, actionTypes, 'update', config);
  addGroup(resource, actionTypes, 'delete', config);

  return actionTypes;
}
