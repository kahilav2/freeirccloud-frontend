export default {
  isShorterThan({ constrictor, name }) {
    return `${name} must be shorter than ${constrictor} characters`;
  },
  isLongerThan({ constrictor, name }) {
    return `${name} must be longer than ${constrictor} characters`;
  },
  isValidEmail() {
    return 'Email address is invalid';
  },
  isNotEmpty({ name }) {
    return `${name} can't be empty`;
  },
  hasNoDuplicates() {
    return 'Servers have duplicates';
  },
  isNotNull({ name }) {
    return `Please select ${name}`;
  },
  isValidIRCChannel() {
    return 'IRC channel contains illegal characters';
  },
  startsWith({ constrictor, name }) {
    return `${name} must begin with ${constrictor}`;
  },
  arePasswordsSame() {
    return 'Passwords are not the same';
  },
  isValidUserName() {
    return 'Username must only contain letters';
  },
};
