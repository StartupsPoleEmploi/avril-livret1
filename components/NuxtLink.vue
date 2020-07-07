<template>
  <nuxt-link v-on:click.native="$emit('click')" v-bind="{...$props, ...$attrs}" :to="toWithPrefix">
    <slot></slot>
  </nuxt-link>
</template>

<script type="text/javascript">
  import get from 'lodash.get';
  import {prepend} from 'avril/js/utils/string';
  export default {
    computed: {
      toWithPrefix: function() {
        return `${prepend(get(this, '$route.params.slug'), '/')}${this.to || ''}`;
      },
    },
    props: [
      'to',
    ]
  }
</script>