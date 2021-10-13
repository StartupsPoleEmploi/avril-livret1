<template>
  <div>
    <div class="field">
      <h3 class="title is-5">{{label}}</h3>
      <ItemInput :items="skills" :addItem="addSkill" placeholder="Ex: Je pétris de la pâte à pain" />
    </div>

    <div class="field">
      <div class="notification is-info content">
        <p>
          <strong>Manque d'inspiration ?</strong>
          Ci-dessous les fiches métier correspondant à votre diplôme. Consultez-y la rubrique "Compétences" pour obtenir des suggestions :
        </p>
        <ul>
          <li v-for="rome in romes">
            <a :href="`https://candidat.pole-emploi.fr/marche-du-travail/fichemetierrome?codeRome=${rome.code}`" target="_blank">{{rome.label}}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="field" v-if="skills.length === 0">
      <div class="notification is-danger">
        Je dois saisir au minimum une activité.
      </div>
    </div>

    <div class="field" v-if="skills.length && skills.length < 5">
      <div class="notification is-warning">
        Nous vous invitons à renseigner plus d'activités pour permettre au certificateur de se prononcer sur votre dossier.
      </div>
    </div>

    <ItemList :items="skills" :removeItem="removeSkill" />

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
      romes() {
        return this.$store.state.certificationRomes;
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
