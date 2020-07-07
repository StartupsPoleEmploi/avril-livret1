<template>
  <div>
    <div class="field">
      <h3 class="title is-5">{{label}}</h3>
      <ItemInput :items="skills" :addItem="addSkill" placeholder="Ex: Je pétris de la pâte à pain" />
    </div>

    <ItemList :items="skills" :removeItem="removeSkill" />

    <div class="field" v-if="skills.length === 0">
      <div class="notification is-danger">
        Je dois saisir au minimum une activité.
      </div>
    </div>

    <ContinueOrFillLater to="/experiences/periode" :value="skills" />
  </div>
</template>

<script>
  import get from 'lodash.get';
  import {isBlank} from 'avril/js/utils/boolean.js';
  import ContinueOrFillLater from '~/components/ContinueOrFillLater.vue';
  import ItemList from '~/components/ItemList.vue';
  import ItemInput from '~/components/ItemInput.vue';

  export default {
    beforeCreate() {
      if (!this.$store.getters['experiences/current']) {
        this.$router.push('../experiences');
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
        return `Quelles activités avez-vous pratiquées dans votre emploi ${roleString} ${companyString} ?`
      },
      skills() {
        return get(this.$store.getters['experiences/current'], 'skills', []).map(s => s.label);
      },
      experiencesProgress() {
        return this.$store.getters['experiences/progress'];
      },
    },
    methods: {
      addSkill(skill) {
        this.$store.dispatch('experiences/addSkill', skill)
      },
      removeSkill(skill) {
        if(window.confirm('Je confirme vouloir supprimer cette activité ?')){
          this.$store.dispatch('experiences/removeSkill', skill)
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
