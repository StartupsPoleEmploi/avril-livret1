<template>
  <div class="form">

    <div class="form-fields">

        <h3 class="title is-5">Quelle classe avez vous suivi en dernier ?</h3>

        <nuxt-link v-on:click.native="addLatestCourseLevel('A')" to="formations/diplome" class="box">
          <input type="radio" name="answer"> &nbsp;Primaire, 6ème, 5ème, 4ème, 3ème ou 1ère année de CAP/BEP
        </nuxt-link>
        <nuxt-link v-on:click.native="addLatestCourseLevel('B')" to="formations/diplome" class="box">
          <input type="radio" name="answer"> &nbsp;2nde ou 1ère générale, 2ème année de CAP/BEP
        </nuxt-link>
        <nuxt-link v-on:click.native="addLatestCourseLevel('C')" to="formations/diplome" class="box">
          <input type="radio" name="answer"> &nbsp;Terminale
        </nuxt-link>
        <nuxt-link v-on:click.native="addLatestCourseLevel('D')" to="formations/diplome" class="box">
          <input type="radio" name="answer"> &nbsp;1ère ou 2ème année de l'enseignement supérieur
        </nuxt-link>

        <nuxt-link v-on:click.native="addLatestCourseLevel('E')" to="formations/diplome" class="box">
          <input type="radio" name="answer"> &nbsp;3ème année de l'enseignement supérieur
        </nuxt-link>
        <nuxt-link v-on:click.native="addLatestCourseLevel('F')" to="formations/diplome" class="box">
          <input type="radio" name="answer"> &nbsp;4ème ou 5ème année de l'enseignement supérieur
        </nuxt-link>
        <nuxt-link v-on:click.native="addLatestCourseLevel('G')" to="formations/diplome" class="box">
          <input type="radio" name="answer"> &nbsp;6ème année de l'enseignement supérieur
        </nuxt-link>

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
    </div>
</template>

<script>
export default {
  methods: {
    addLatestCourseLevel (e) {
      this.$store.commit('education/addLatestCourseLevel', e)
    },
  }
}
</script>
