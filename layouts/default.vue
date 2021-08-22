<template>
  <div class="body-container" id="body-container" data-theme="">
    <nuxt />
  </div>
</template>
<script>
import Authenticate from '~/mixins/authenticated';

export default {
  mixins: [Authenticate],
};

</script>
