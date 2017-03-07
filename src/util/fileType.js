/* global File */
import includes from 'lodash.includes';

/* Validation */
export default (types, message) => value => ({
  isValid: (value instanceof Array || value instanceof Object) &&
    value[0] instanceof File && includes(types, value[0].type),
  message: message || 'Invalid file type',
});
