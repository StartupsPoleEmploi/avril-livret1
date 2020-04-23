<template>
  <div class="form">

    <div class="form-fields">
      <div class="field">
        <div class="control">
          <label class="label" v-if="role != ''">Quelles activités avez-vous pratiqué dans votre emploi {{ role ? `de ${role}`: ''}} {{companyName ? `au sein de ${companyName}` : ''}} ?</label>
          <label class="label" v-else>Quelles activités avez-vous fait dans votre emploi ?</label>
          <input class="input" ref="activity_input" type="text" placeholder="Exemple : Je pétris de la pâte à pain" @keyup.enter="addActivity">
          <div class="push-enter" style="margin-top:5px; margin-left:6px;">
            Appuyez sur <strong>Entrée</strong> pour ajouter cette activité ou
            <a class="button is-pulled-right" :class="activities.length ? 'is-default' : 'is-dark'" @click="addActivity" style="margin-top:4px">
              + Ajouter
            </a>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="titres">
          <ul v-for="activity in activities">
            <li class="box">
              {{activity}}
              <button @click="removeActivity(activity)" class="delete is-pulled-right"></button>
            </li>
          </ul>
          <div v-if="activities.length === 0" class="notification is-danger">
            Je dois saisir au minimum une activité.
          </div>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <nuxt-link to="/experiences/periode" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
          </nuxt-link>
          <nuxt-link to="/experiences/periode" class="is-ok button is-pulled-right" :class="activities.length ? 'is-dark' : 'is-default'">
            Continuer
          </nuxt-link>
        </div>
      </div>
    </div>
    <Help :content="help" img="help.png" />
  </div>
</template>

<script>
  import get from 'lodash.get';
  import helpLoaderMixin from '~/mixins/helpLoader.js';
  import {isBlank} from 'avril/js/utils/boolean.js';

  export default {
    mixins: [helpLoaderMixin],
    beforeCreate() {
      if (!this.$store.getters['experiences/current']) {
        this.$router.push('/experiences');
      }
    },
    computed: {
      role() {
        return get(this.$store.getters['experiences/current'], 'role');
      },
      companyName() {
        return get(this.$store.getters['experiences/current'], 'companyName');
      },
      activities() {
        return get(this.$store.getters['experiences/current'], 'activities') || [];
      },
      experiencesProgress() {
        return this.$store.getters['experiences/progress'];
      },
    },
    mounted() {
      this.$refs.activity_input.focus()
    },
    methods: {
      addActivity(e) {
        if (isBlank(this.$refs.activity_input.value)) return;
        this.$store.dispatch('experiences/addActivity', this.$refs.activity_input.value)
        this.$refs.activity_input.value = '';
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
  .activites{
    margin-top: 4rem;
  }
  .mx-datepicker-range {
    width: 100%;
  }
  .form-help-ativites{
    height: 60%;
    padding: 1rem;
    overflow: auto;
  }
</style>
