<template>
  <input
    @input="formatValue"
    type="text"
    :value="formattedValue"
  />
</template>

<script type="text/javascript">
  import {formatPhoneNumber} from '~/utils/string';

  export default {
    computed: {
      formattedValue: function(){
        return formatPhoneNumber(this.value)
      },
    },
    methods: {
      formatValue(e) {
        this.$emit('input', formatPhoneNumber(e.target.value))
      }
    }
  }
</script>