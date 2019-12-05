<template>
  <div>
    <button v-for="{label, value} in options" :key="value" @click="clickAndGo(value)" class="box" :class="isSelected(value) ? 'active' : ''">
      <input type="radio" name="answer" :checked="isSelected(value) ? 'active' : ''"> &nbsp;{{label}}
    </button>
    <div v-if="extras">
      <button v-if="!showExtras" @click="setUserShowExtras" class="button is-text">Autres propositions</button>
      <div v-if="showExtras">
        <button v-for="{label, value} in extras" :key="value" @click="clickAndGo(value)" class="box" :class="isSelected(value) ? 'active' : ''">
          <input type="radio" name="answer" :checked="isSelected(value) ? 'active' : ''"> &nbsp;{{label}}
        </button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    computed: {
      showExtras() {
        const valueIsInExtras = this.extras.find(o => o.value === this.value);
        return  this.userShowExtras || valueIsInExtras;
      }
    },
    data() {
      return {
        userShowExtras: false,
      }
    },
    methods: {
      isSelected(optionValue) {
        return optionValue === this.value;
      },
      setUserShowExtras() {
        this.userShowExtras = true;
      },
      clickAndGo(value) {
        this.click(value);
        this.$router.push({
            path: this.to
        })
      },
    },
    props: [
      'value',
      'options',
      'extras',
      'to',
      'click',
    ],
  }
</script>