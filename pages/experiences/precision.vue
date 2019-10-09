<template>
  <div class="form">

    <div class="form-fields">

        <div class="field">
          <label class="label">Activités exercées en rapport direct avec la certification visée</label>
          <div class="control">
            <input class="input" ref="avril__name" type="text" placeholder="Exemple : Pétrissage du pain" @keyup.enter="addActivite">
            <div class="push-enter is-pulled-right">
              Appuyez sur <strong>Entrée</strong> pour ajouter cette activité
            </div>
          </div>
          <div class="activites">
            <div v-for="activite in activites">
              <span class="box">{{activite}}</span>
            </div>
          </div>

        </div>

        <div class="field">
          <div class="control">
            <nuxt-link to="/experiences" class="is-ok button is-dark is-rounded is-pulled-right">
              Enregistrer cette expérience
            </nuxt-link>
          </div>
        </div>

      </div>

      <div class="form-help">
        <p>
          Pour aider le certificateur à bien comprendre quel a été votre rôle au sein de [entreprise], vous devez indiquer une liste de tâche que vous avez
          effectué au quotidien.
        </p>
        <p>Voici une liste d'activité pour vous aider. Vous pouvez les ajouter ou en créer une nouvelle.</p>
        <br/>
        <div class="form-help-ativites">
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
        </div>
      </div>

    </div>
</template>

<script>
import _ from 'lodash';

export default {
  layout: 'experience',
  components: {},
  computed: {
    activites () {
      let act = _.cloneDeep(this.$store.state.experiences.activites)
      return act.reverse()
    },
    heures () {
      return this.$store.state.experiences.heures
    },
    pourcentage () {
      if( (this.$store.state.experiences.heures*100)/1607 > 100 )
        return 100
      else
        return (this.$store.state.experiences.heures*100)/1607
    }
  },

  created() {
    this.$store.commit('experiences/addHours')
  },

  mounted() {
    this.$refs.avril__name.focus()
    this.$store.commit('experiences/disableFormationStepper')
  },
  methods: {
    addPrecision (e) {
      this.$store.commit('experiences/addPrecision', e.target.value)
    },
    addActivite (e) {
      this.$store.commit('experiences/addActivite', e.target.value)
      this.$refs.avril__name.value = ''
    },
    addExp (e) {
      this.$store.commit('experiences/addActivite', e.target.outerText.trim());
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
  height: 300px;
  padding: 1rem;
  overflow: auto;
}
</style>
