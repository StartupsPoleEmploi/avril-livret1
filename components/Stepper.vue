<template>
  <div class="form-header">
    <div class="avril-stepper-container">
      <NavBack/>
      <div class="avril-stepper">
        <ul class="steps is-small is-centered has-content-centered">
          <li v-for="step in steps" class="steps-segment" :class="step.to == currentPath ? 'is-active' : ''">
            <nuxt-link :to="step.to" class="steps-marker" :class="step.to == currentPath ? 'is-hollow' : ''"></nuxt-link>
            <div class="steps-content is-divider-content">
              <nuxt-link class="is-size-6" :to="step.to">{{step.label}}</nuxt-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>
<script>
  import NavBack from '~/components/NavBack.vue';

  export default {
    components: {
      NavBack
    },
    computed: {
      currentPath() {
        return this.$store.state.currentPath;
      },
      steps() {
        const stepObject = this.$store.state.steps.find(s => s.path === this.$store.getters.currentTab);
        if (stepObject) return stepObject.steps.filter(s => !s.hidden);
      },
    },
  }
</script>
