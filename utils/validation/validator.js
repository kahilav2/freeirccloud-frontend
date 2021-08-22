/* Creates errorCode objects */
function $(truthful, errorCode, constrictor) {
  return (truthful) ? [] : [{ errorCode, constrictor }];
}

export default {
  isShorterThan(input, constrictor) {
    return $(input.length < constrictor, 'isShorterThan', constrictor);
  },
  isLongerThan(input, constrictor) {
    return $(input.length > constrictor, 'isLongerThan', constrictor);
  },
  isNotNull(input) {
    return $(input !== null, 'isNotNull');
  },
  isNotEmpty(input) {
    return $(input.length > 0, 'isNotEmpty');
  },
  hasNoDuplicates(array) {
    return $((new Set(array)).size === array.length, 'hasNoDuplicates');
  },
  isValidEmail(input) {
    // eslint-disable-next-line max-len
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return $(regexp.test(input.toLowerCase()), 'isValidEmail');
  },
  startsWith(input, constrictor) {
    return $(input.startsWith(constrictor), 'startsWith', constrictor);
  },
  // eslint-disable-next-line no-unused-vars
  hasNumerics(input) {
    return [];
  },
  // eslint-disable-next-line no-unused-vars
  hasUpperCaseLetters(input) {
    return [];
  },
  // eslint-disable-next-line no-unused-vars
  hasLowerCaseLetters(input) {
    return [];
  },
  isValidIRCChannel(input) {
    const validationErrors = [];
    validationErrors.push(...this.isNotEmpty(input));
    validationErrors.push(...this.isLongerThan(input, 1));
    const regexp = /^#([A-Za-z0-9[_^-])*$/;
    validationErrors.push(...$(regexp.test(input), 'isValidIRCChannel'));
    validationErrors.push(...this.isShorterThan(input, 40));
    return validationErrors;
  },
  isValidUserName(input) {
    const validationErrors = [];
    validationErrors.push(...this.isNotEmpty(input));
    validationErrors.push(...this.isLongerThan(input, 1));
    validationErrors.push(...this.isShorterThan(input, 15));
    // const regexp = /^([A-Za-z[_^-])*$/
    // validationErrors.push(...$(regexp.test(input), 'isValidUserName'));

    return validationErrors;
  },
  isValidPassword(input) {
    const validationErrors = [];
    validationErrors.push(...this.isLongerThan(input, 5));
    validationErrors.push(...this.hasUpperCaseLetters(input));
    validationErrors.push(...this.hasLowerCaseLetters(input));
    validationErrors.push(...this.hasNumerics(input));
    return validationErrors;
  },
  arePasswordsSame(input, constrictor) {
    return $(input === constrictor, 'arePasswordsSame', constrictor);
  },
};
