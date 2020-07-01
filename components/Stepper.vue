<template>
  <div class="form-header">
    <div class="stepper-container">
      <NavBack/>
      <div class="stepper">
        <ul class="steps is-small is-centered has-content-centered">
          <li v-for="step in steps" class="steps-segment" :class="step.to === currentPathWithoutSlug ? 'is-active' : ''">
            <nuxt-link :to="step.to" class="steps-marker" :class="step.to === currentPathWithoutSlug ? 'is-hollow' : ''"></nuxt-link>
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
  import get from 'lodash.get';
  import NavBack from '~/components/NavBack.vue';
  import NuxtLink from '~/components/NuxtLink.vue';

  export default {
    components: {
      NavBack,
      NuxtLink,
    },
    computed: {
      currentPathWithoutSlug() {
        return this.$store.state.currentPath.replace(`/${get(this, '$route.params.slug')}`, '');
      },
      steps() {
        const stepObject = this.$store.state.steps.find(s => s.path === this.$store.getters.currentTab);
        if (stepObject) return stepObject.steps.filter(s => !s.hidden);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .stepper-container {
    display: flex;

    .stepper {
      flex: 1;
    }
  }
</style>