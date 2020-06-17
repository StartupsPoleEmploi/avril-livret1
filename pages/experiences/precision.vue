<template>
  <div class="form">

    <div class="form-fields">
      <div class="field">
        <h3 class="title is-5">{{label}}</h3>
        <ItemInput :items="activities" :addItem="addActivity" placeholder="Ex: Je pétris de la pâte à pain" />
      </div>

      <ItemList :items="activities" :removeItem="removeActivity" />

      <div class="field" v-if="activities.length === 0">
        <div class="notification is-danger">
          Je dois saisir au minimum une activité.
        </div>
      </div>

      <ContinueOrFillLater to="/experiences/periode" :value="activities" />
    </div>
    <Help :content="help" img="help.png" />
  </div>
</template>

<script>
  import get from 'lodash.get';
  import helpLoaderMixin from '~/mixins/helpLoader.js';
  import {isBlank} from 'avril/js/utils/boolean.js';
  import ContinueOrFillLater from '~/components/ContinueOrFillLater.vue';
  import ItemList from '~/components/ItemList.vue';
  import ItemInput from '~/components/ItemInput.vue';

  export default {
    mixins: [helpLoaderMixin],
    beforeCreate() {
      if (!this.$store.getters['experiences/current']) {
        this.$router.push('/experiences');
      }
    },
    components: {
      ContinueOrFillLater,
      ItemInput,
      ItemList,
    },
    computed: {
      role() {
        return get(this.$store.getters['experiences/current'], 'role');
      },
      companyName() {
        return get(this.$store.getters['experiences/current'], 'companyName');
      },
      label() {
        const roleString = this.role ? `de ${this.role}` : ''
        const companyString = this.companyName ? `au sein de ${this.companyName}` : '';
        return `Quelles activités avez-vous pratiqué dans votre emploi ${roleString} ${companyString} ?`
      },
      activities() {
        return get(this.$store.getters['experiences/current'], 'activities') || [];
      },
      experiencesProgress() {
        return this.$store.getters['experiences/progress'];
      },
    },
    methods: {
      addActivity(value) {
        this.$store.dispatch('experiences/addActivity', value)
      },
      removeActivity(activity) {
        if(window.confirm('Je confirme vouloir supprimer cette activité ?')){
          this.$store.dispatch('experiences/removeActivity', activity)
        }
      }
    }
  }
</script>

<style>
  .push-enter {
    margin-top: 5px;
    margin-right: 8px;
  }
</style>
