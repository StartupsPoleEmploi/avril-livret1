<template>
  <RadioList v-bind="{...$props, ...$attrs}" :to="toWithPrefix">
    <slot></slot>
  </RadioList>
</template>

<script type="text/javascript">
  import get from 'lodash.get';
  import {prepend} from 'avril/js/utils/string';
  import RadioList from 'avril/js/components/RadioList.vue';

  export default {
    components: {
      RadioList,
    },
    computed: {
      toWithPrefix: function() {
        if (!this.to) return;
        return `${prepend(get(this, '$route.params.slug'), '/')}${this.to}`;
      },
    },
    props: [
      'to',
    ]
  }
</script>