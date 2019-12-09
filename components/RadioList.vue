<template>
  <div class="control">
    <div :class="inline ? 'columns' : null">
      <div :class="inline ? 'column' : null" v-for="{label, value} in defaultOptions" :key="value">
        <button @click="clickAndGo(value)" class="box" :class="isSelected(value) ? 'active' : ''">
          <input type="radio" :checked="isSelected(value) ? 'active' : ''"> &nbsp;{{capitalize(label)}}
        </button>
      </div>
    </div>
    <div v-if="otherOptions && otherOptions.length">
      <button v-if="!showExtras" @click="setUserShowExtras" class="button is-text">Autres propositions</button>
      <div v-if="showExtras"  :class="inline ? 'columns' : null">
        <div :class="inline ? 'column' : null" v-for="{label, value} in otherOptions" :key="value">
          <button @click="clickAndGo(value)" class="box" :class="isSelected(value) ? 'active' : ''">
            <input type="radio" :checked="isSelected(value) ? 'active' : ''"> &nbsp;{{capitalize(label)}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import {capitalize} from '~/utils/string';

  const booleanOptions = [{
    label: 'Oui',
    value: true,
  }, {
    label: 'Non',
    value: false,
  }]

  export default {
    computed: {
      showExtras() {
        const valueIsInExtras = this.otherOptions.find(o => o.value === this.value);
        return  this.userShowExtras || valueIsInExtras;
      }
    },
    data() {
      let defaultOptions, otherOptions;
      if (this.boolean) {
        defaultOptions = booleanOptions;
        otherOptions = [];
      }
      if (this.options) {
        [defaultOptions, otherOptions] = this.options.reduce(([d, o], a) => {
          return [
            d.concat(a.isOther ? [] : a),
            o.concat(a.isOther ? a : []),
          ]
        }, [[], []])
      }
      return {
        userShowExtras: false,
        defaultOptions,
        otherOptions,
      }
    },
    methods: {
      capitalize,
      isSelected(optionValue) {
        return optionValue === this.value;
      },
      setUserShowExtras() {
        this.userShowExtras = true;
      },
      clickAndGo(value) {
        this.click(value);
        if (this.to) {
          this.$router.push({
            path: this.to
          })
        }
      },
    },
    props: {
      value: {
        required: true,
      },
      options: {
        type: Array,
      },
      to: {
        type: String,
      },
      click: {
        type: Function,
      },
      inline: {
        type: Boolean,
        default: false,
      },
      boolean: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>