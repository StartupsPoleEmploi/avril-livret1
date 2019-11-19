<template>
  <div class="form">
    <div class="form-fields">
      <h3 class="title is-5">Quelle classe avez vous suivi en dernier ?</h3>
      <div v-for="{label, value} in possibleAnswers">
        <nuxt-link v-on:click.native="addLatestCourseLevel(value)" to="/formations/diplome" class="box" :class="latestCourseLevel == value ? 'active' : ''">
          <input type="radio" name="answer" :checked="latestCourseLevel == value ? 'active' : ''"> &nbsp;{{label}}
        </nuxt-link>
      </div>
    </div>
    <Help :content="help" />
  </div>
</template>

<script>
import helpLoaderMixin from '~/mixins/helpLoader.js';

export default {
  mixins: [helpLoaderMixin],
  computed: {
    latestCourseLevel() {
      return this.$store.state.education.latestCourseLevel;
    },
  },
  data() {
    return {
      possibleAnswers: [{
        label: 'Primaire, 6ème, 5ème, 4ème, 3ème, 1ère année de CAP/BEP',
        value: 'A',
      }, {
        label: '2nde ou 1ère générale, 2ème année de CAP/BEP',
        value: 'B',
      }, {
        label: 'Terminal',
        value: 'C',
      }, {
        label: '1ère ou 2ème année de l\'enseignement supérieur',
        value: 'D',
      }, {
        label: '3ème année de l\'enseignement supérieur',
        value: 'E',
      }, {
        label: '4ème ou 5ème année de l\'enseignement supérieur',
        value: 'F',
      }, {
        label: '6ème année de l\'enseignement supérieur',
        value: 'G',
      }],
      help: `
Dites nous simplement quelle a été la dernière classe que vous avez fréquentée.

Ne vous inquiétez pas, il s'agit d'une simple information, cela ne sert pas à évaluer votre candidature à la VAE.

Rappelez-vous, la seule condition pour demander votre diplôme en VAE est de justifier d'un an d'expérience.
      `,
    }
  },
  methods: {
    addLatestCourseLevel (e) {
      this.$store.commit('education/addLatestCourseLevel', e)
    },
  },
}
</script>
