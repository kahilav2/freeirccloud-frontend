import formErrorCodeGetters from './form';
import { capitalizeFirstLetter } from '~/utils/common';

const repositories = {
  form: formErrorCodeGetters,
};

export default function getErrorMessage(repositoryName, { errorCode, constrictor }, payload) {
  const extendedPayload = JSON.parse(JSON.stringify(payload));
  if (extendedPayload.name !== undefined) {
    extendedPayload.name = capitalizeFirstLetter(payload.name);
  }
  extendedPayload.errorCode = errorCode;
  extendedPayload.constrictor = constrictor;

  const errorCodeGetters = repositories[repositoryName];
  if (errorCode in errorCodeGetters) {
    return errorCodeGetters[errorCode](extendedPayload);
  }
  return `Default error message (${errorCode})`;
}
