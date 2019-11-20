<template>
  <div class="form">

    <div class="form-fields">

      <div class="field">
        <div class="control">
          <label class="label" v-if="role != ''">Quelles activités avez-vous fait dans votre emploi de {{ role }} au sein de {{companyName}} ?</label>
          <label class="label" v-else>Quelles activités avez-vous fait dans votre emploi ?</label>
          <input class="input" ref="avril__name" type="text" placeholder="Exemple : Je pétris de la pâte à pain" @keyup.enter="addActivity">
          <a class="button is-default is-pulled-right" @click="addActivity" style="margin-top:4px">
            + Ajouter
          </a>
          <div class="push-enter is-pulled-right" style="margin-top:5px; margin-left:6px;">
            Appuyez sur <strong>Entrée</strong> pour ajouter cette activité ou
          </div>
        </div>
      </div>

      <div class="field">
        <div class="activites">
          <div v-for="activite in activites">
            <span class="box">{{activite}}</span>
          </div>
        </div>
      </div>

      <div class="field" v-if="experiencesProgress < 100">
        <div class="control">
          <nuxt-link to="/experiences" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
          </nuxt-link>
          <nuxt-link to="/experiences" class="is-ok button is-dark is-pulled-right">
            Continuer
          </nuxt-link>
        </div>
      </div>

      <div class="field" v-else>
        <div class="control">
          <nuxt-link to="/identite" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
          </nuxt-link>
          <nuxt-link to="/identite" class="is-ok button is-dark is-pulled-right">
            Continuer
          </nuxt-link>
        </div>
      </div>

    </div>

      <div class="form-help">
        <h3 class="title is-5">Besoin d'aide ?</h3>
        <div class="form-help-content content">
          <p>
            Pour aider le certificateur à bien comprendre quel a été votre rôle <span v-if="companyName != ''">au sein de {{companyName}}</span>, vous devez indiquer une liste de tâches que vous avez
            effectuées au quotidien.
          </p>
          <p>Voici un lien vers la fiche du métier pour trouver des exemples d'activités :
            <a href="https://rome.fr" target="_blank">ROME</a>
          </p>
          <p>Exemples: "J'utilise des tableaux croisés dynamiques dans le logiciel Excel" ou "J'aide des adultes et des personnes handicapées à prendre leurs repas"</p>

        </div>
        <!-- <div class="form-help-ativites">
          <a class="box" v-on:click="addExp">
            <input type="radio" name="answer"> &nbsp;Déterminer les mesures d’hygiène, de santé et de mise en sécurité
          </a>
          <a class="box" v-on:click="addExp">
            <input type="radio" name="answer"> &nbsp;Définir les besoins
          </a>
          <a class="box" v-on:click="addExp">
            <input type="radio" name="answer"> &nbsp;Collecter, traiter et organiser l’information – proposer et argumenter
          </a>
          <a class="box" v-on:click="addExp">
            <input type="radio" name="answer"> &nbsp;Préparer les espaces de travail
          </a>
          <a class="box" v-on:click="addExp">
            <input type="radio" name="answer"> &nbsp;Identifier les éléments de la qualité
          </a>
          <a class="box" v-on:click="addExp">
            <input type="radio" name="answer"> &nbsp;Détecter les anomalies
          </a>
          <a class="box" v-on:click="addExp">
            <input type="radio" name="answer"> &nbsp;Préparer les espaces de travail
          </a>
          <a class="box" v-on:click="addExp">
            <input type="radio" name="answer"> &nbsp;Mettre en oeuvre des mesures d’hygiène
          </a>
          <a class="box" v-on:click="addExp">
            <input type="radio" name="answer"> &nbsp;Réceptionner, stocker
          </a>
        </div> -->
        <p style="margin-top:1rem">
          <a href="#" class="is-text">J'ai besoin de plus d'aide pour répondre à cette question</a>
        </p>
      </div>

    </div>
</template>

<script>
import _ from 'lodash';

export default {
  beforeCreate() {
    if (!this.$store.getters['experiences/current']) {
      this.$store.dispatch('experiences/newExperience');
    }
  },
  components: {},
  computed: {
    role () {
      return this.$store.state.experiences[this.$store.state.experiences.length - 1].role
    },
    companyName () {
      return this.$store.state.experiences[this.$store.state.experiences.length - 1].companyName
    },
    activites () {
      console.log(this.$store.state)
      let act = _.cloneDeep(this.$store.state.experiences[this.$store.state.experiences.length - 1].activities)
      return act.reverse()
    },
    experiencesProgress () {
      return this.$store.getters['experiences/progress'];
    },
  },
  mounted() {
    this.$refs.avril__name.focus()
  },
  methods: {
    addPrecision (e) {
      this.$store.commit('experiences/addPrecision', e.target.value)
    },
    addActivity (e) {
      if( this.$refs.avril__name.value == '' || this.$refs.avril__name.value == ' ' ){
        return false;
      }
      this.$store.commit('experiences/addActivity', this.$refs.avril__name.value)
      this.$refs.avril__name.value = '';
      return false;
    },
    addExp (e) {
      this.$store.commit('experiences/addActivity', e.target.outerText.trim());
      e.target.remove()
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }
}
</script>

<style>
.activites{
  margin-top: 4rem;
}
.box{
  /* margin-top: 1rem; */
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
