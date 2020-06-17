<template>
  <div class="field">
    <div class="control">
      <nuxt-link :to="to" class="button is-text is-pulled-left">
        Remplir plus tard
      </nuxt-link>
      <nuxt-link v-if="value" :to="to" class="button is-pulled-right" :class="isEmptyArray ? 'is-default' : 'is-primary'" >
        {{isEmptyArray ? 'Aucun, continuer' : 'Continuer'}}
      </nuxt-link>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {isArray} from 'avril/js/utils/boolean';
  export default {
    computed: {
      isEmptyArray: function() {
        return isArray(this.value) && this.value.length === 0;
      },
    },
    props: {
      value: {},
      to: {
        type: String,
        isRequired: true,
      }
    }
  }
</script>