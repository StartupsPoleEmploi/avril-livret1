<template>
  <div class="control">
    <input class="input" ref="itemInput" type="text" :placeholder="placeholder" @keyup.enter="doAddItem">
    <div class="has-text-right">
      Pour ajouter, appuyez sur <strong>Entrée</strong> ou
      <button class="button" :class="items.length ? 'is-default' : 'is-primary'" @click="doAddItem">
        + Ajouter
      </button>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    methods: {
      doAddItem: function() {
        const value = this.$refs.itemInput.value.trim();
        if(!value){
          return false;
        }
        this.addItem(value);
        this.$refs.itemInput.value = '';
      },
    },
    mounted() {
      this.$refs.itemInput.focus()
    },
    props: {
      placeholder: {
        type: String,
      },
      items: {
        type: Array,
        isRequired: true,
      },
      addItem: {
        type: Function,
        isRequired: true,
      }
    },
  }
</script>

<style lang="scss" scoped>
  input.input {
    margin-bottom: 0.5rem;
  }
  button {
    vertical-align: middle;
  }
</style>