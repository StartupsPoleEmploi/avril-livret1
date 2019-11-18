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

      <div class="form-help">
        <h3 class="title is-5">Besoin d'aide ?</h3>
        <div class="form-help-content content">
          <p>
            Dites nous simplement quelle a été la dernière classe que vous avez fréquentée.
          </p>
          <p>
            Ne vous inquiétez pas, il s'agit d'une simple information, cela ne sert pas à évaluer votre candidature à la VAE.
          </p>
          <p>
            Rappelez-vous, la seule condition pour demander votre diplôme en VAE est de justifier d'un an d'expérience.
          </p>
        </div>
        <p style="margin-top:1rem">
          <a href="#" class="is-text">J'ai besoin de plus d'aide pour répondre à cette question</a>
        </p>
      </div>
      <p style="margin-top:1rem">
        <a href="#" class="is-text">J'ai besoin de plus d'aide</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    latestCourseLevel() {
      return this.$store.state.education.latestCourseLevel;
    },
    possibleAnswers() {
      return [{
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
      }]
    }
  },
  methods: {
    addLatestCourseLevel (e) {
      this.$store.commit('education/addLatestCourseLevel', e)
    },
  }
}
</script>
