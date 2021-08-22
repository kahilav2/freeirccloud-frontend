import constants from '~/utils/constants';
import { getNestedProperty } from '~/utils/common';

export default (_, inject) => {
  inject('getConst', (path) => getNestedProperty(constants, path));
};
