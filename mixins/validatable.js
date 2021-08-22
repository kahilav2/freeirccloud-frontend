import validator from '~/utils/validation/validator';
import getErrorMessage from '~/utils/validation/get-error-messages';
import { no, deepEqual } from '~/utils/common';

export default {
  created() {
    if (this.name === undefined) {
      console.error('Validatable: name attribute must be defined');
    }
    if (this.targets === undefined) {
      console.error(`Validatable/${this.name}: targets attribute must be defined`);
    }
    if (this.validate === undefined) {
      console.error(`Validatable/${this.name}: validate function must be defined`);
    }

    this.targets.forEach((target) => {
      if (this[target] instanceof Array) {
        const tempInit = [];
        this[target].forEach((val) => tempInit.push({ ...val }));
        this.initialValues[target] = tempInit;
      } else if (typeof this[target] === 'object') {
        this.initialValues[target] = { ...this[target] };
      } else {
        this.initialValues[target] = this[target];
      }

      this.$watch(target, function watcher(newValue) {
        this.$nextTick(function executeAfterATick() {
          this.errorMessages = [];
          this.validate();
          this.computeIsValid();

          if (!this.isSame(this.initialValues[target], newValue)) {
            this.hasTargetChanged[target] = true;
            this.hasFormChanged = true;
            // this.$emit('update', { hasFormChanged: true });
          }
          this.$emit('update', { hasFormChanged: true });
          this.$forceUpdate();
        });
      }, {
        immediate: true,
        deep: true,
      });
    });
  },
  data() {
    return {
      extendsValidatable: true,
      isValid: false,
      hasUserTriedToSubmit: false,
      hasFormChanged: false,
      initialValues: {},
      isTargetValid: {},
      hasTargetChanged: {},
      errorMessages: [],
      errorMessagesDisplayed: [],
      isDisabled: false,
      targetHasFocus: {},
    };
  },
  methods: {
    addFocus(target) {
      this.targetHasFocus[target] = true;
      this.$forceUpdate();
    },

    removeFocus(target) {
      this.targetHasFocus[target] = false;
      this.$forceUpdate();
    },

    disableAll() {
      this.isDisabled = true;
      this.getValidatableChildren().forEach((child) => child.disableAll());
    },

    enableAll() {
      this.isDisabled = false;
      this.getValidatableChildren().forEach((child) => child.enableAll());
    },

    isSame(a, b) {
      if (typeof a === 'object') {
        return deepEqual(a, b);
      }
      return a === b;
    },

    childUpdated({ hasFormChanged = false } = {}) {
      this.errorMessages = [];
      this.validate();
      this.computeIsValid();

      this.hasFormChanged = true;
      this.$emit('update', { hasFormChanged });
    },

    set(formData) {
      for (const key of formData) {
        const val = formData[key];
        const subJSON = {};
        subJSON[key] = val;
        if (this.targets && this.targets.indexOf(key) > -1) {
          this[key] = val;
        }
        this.getValidatableChildren().filter((child) => child.getName() === key).forEach((child) => child.set(subJSON));
      }
    },

    reset() {
      this.hideAllErrorMessages();
      this.hasFormChanged = false;
      this.hasUserTriedToSubmit = false;

      if (this.targets) {
        this.targets.forEach((target) => {
          this.hasTargetChanged[target] = false;
          if (this.initialValues[target] instanceof Array) {
            const tempInit = [];
            this.initialValues[target].forEach((val) => tempInit.push({ ...val }));
            this[target] = tempInit;
          } else if (typeof this.initialValues[target] === 'object') {
            this[target] = { ...this.initialValues[target] };
          } else {
            this[target] = this.initialValues[target];
          }
        });
      }
      this.getValidatableChildren().forEach((child) => child.reset());
    },

    computeIsValid() {
      this.isValid = (this.errorMessages.length === 0);
    },

    getValidatableChildren() {
      return this.$children.filter((child) => child.extendsValidatable === true);
    },

    VALIDATE(target, predicate, constrictor) {
      const validationErrors = validator[predicate](this[target], constrictor);
      if (no(validationErrors)) {
        this.isTargetValid[target] = true;
        return;
      }
      this.isTargetValid[target] = false;

      validationErrors.forEach((validationError) => this.errorMessages.push(
        getErrorMessage('form', validationError, { name: this.name }),
      ));
    },

    VALIDATE_CHILDREN() {
      this.errorMessages.push(...this.getValidatableChildren()
        .map((child) => child.errorMessages[0] || null)
        .filter((errorMessage) => errorMessage !== null));
    },

    showAllErrorMessages() {
      this.errorMessagesDisplayed = this.errorMessages;
    },

    hideAllErrorMessages() {
      this.errorMessagesDisplayed = [];
    },

    getChildrenValues() {
      let result = {};
      this.getValidatableChildren().map((child) => child.getValue())
        .forEach((element) => {
          result = { ...result, ...element };
        });

      return result;
    },

    getChildrenValuesAsArray() {
      const result = {};
      result[this.name] = this.getValidatableChildren().map((child) => child.getValue());
      return result;
    },

    getValue() {
      const json = {};
      let value;
      if (this.targets.length > 1) {
        value = {};
        this.targets.forEach((target) => {
          value[target] = this[target];
        });
      } else {
        value = this[this.targets[0]];
      }
      json[this.name] = value;
      return json;
    },

    getName() {
      return this.name;
    },

    signalSubmitAttempt() {
      this.hasUserTriedToSubmit = true;
      this.getValidatableChildren().forEach((child) => child.signalSubmitAttempt());
    },

    submit() {
      if (this.isDisabled) return;

      this.signalSubmitAttempt();
      this.$emit('error', this.errorMessages);
      if (!this.isValid) {
        this.showAllErrorMessages();
        return;
      }

      this.disableAll();
      this.hideAllErrorMessages();

      const formData = this.getChildrenValues();
      if (this.afterSubmit) this.afterSubmit(formData);
      this.$emit('submitted', formData);
    },
  },
};
