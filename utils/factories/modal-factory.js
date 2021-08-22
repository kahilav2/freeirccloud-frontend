// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';

import ConfirmationModal from '~/components/shared/modals/confirmation-modal.vue';
import NoCanDoModal from '~/components/shared/modals/no-can-do-modal.vue';
import RadioButtonModal from '~/components/shared/modals/radio-button-modal.vue';
import SettingsModal from '~/components/shared/modals/settings-modal.vue';
import UserListModal from '~/components/shared/modals/user-list-modal.vue';
import HelpModal from '~/components/shared/modals/help-modal.vue';
import Toast from '~/components/shared/modals/toast.vue';

const THE_ID_OF_THE_ELEMENT_TO_APPEND_TO = 'body-container';

export default class ModalFactory {
  constructor(parent) {
    this.parent = parent;
  }

  createModal(className, props, eventHandlers) {
    const theElementToAppendTo = document.getElementById(THE_ID_OF_THE_ELEMENT_TO_APPEND_TO);
    const ComponentClass = Vue.extend(className);
    const instance = new ComponentClass({
      propsData: props,
      parent: this.parent.$root,
    });

    if ('success' in eventHandlers && eventHandlers.success !== undefined) {
      instance.$on('modal-success', eventHandlers.success.bind(this));
    }
    if ('cancel' in eventHandlers && eventHandlers.cancel !== undefined) {
      instance.$on('modal-cancel', eventHandlers.cancel.bind(this));
    }
    if ('error' in eventHandlers && eventHandlers.error !== undefined) {
      instance.$on('modal-error', eventHandlers.error.bind(this));
    }

    instance.$mount();
    theElementToAppendTo.appendChild(instance.$el);

    return instance;
  }

  createSettingsModal(props, success, cancel) {
    return this.createModal(SettingsModal, props, { success, cancel });
  }

  createUserListModal(props, success, cancel) {
    return this.createModal(UserListModal, props, { success, cancel });
  }

  createHelpModal(props, success, cancel) {
    return this.createModal(HelpModal, props, { success, cancel });
  }

  createConfirmationModal(props, success, cancel) {
    return this.createModal(ConfirmationModal, props, { success, cancel });
  }

  createNoCanDoModal(props) {
    return this.createModal(NoCanDoModal, props, {});
  }

  createToast(props, success) {
    return this.createModal(Toast, props, { success });
  }

  createRadioButtonModal(props, success) {
    return this.createModal(RadioButtonModal, props, { success });
  }
}
