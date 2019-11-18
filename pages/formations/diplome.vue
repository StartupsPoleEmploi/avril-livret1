<template>
  <div class="form">

    <div class="form-fields">
        <h3 class="title is-5">Quel est le niveau de diplôme le plus élevé que vous avez obtenu en France ?</h3>

            <nuxt-link v-on:click.native="addLatestDegree('A')" to="rncp" class="box">
              <input type="radio" name="answer"> &nbsp;Aucun diplôme
            </nuxt-link>
            <nuxt-link v-on:click.native="addLatestDegree('B')" to="rncp" class="box">
                <input type="radio" name="answer"> &nbsp;Certificat d’étude primaire
            </nuxt-link>
            <nuxt-link v-on:click.native="addLatestDegree('C')" to="rncp" class="box">
              <input type="radio" name="answer"> &nbsp;Brevet des collèges (BEPC, DNB), Certificat de Formation Générale (niveau V bis)
            </nuxt-link>
            <nuxt-link v-on:click.native="addLatestDegree('D')" to="rncp" class="box">
              <input type="radio" name="answer"> &nbsp;CAP, BEP ou autre certification de niveau V (niveau CEC : 3)
            </nuxt-link>
            <nuxt-link v-on:click.native="addLatestDegree('E')" to="rncp" class="box">
              <input type="radio" name="answer"> &nbsp;Baccalauréat général, technologique, professionnel, ESEU, DAEU, ou autre certification de niveau IV (niveau CEC : 4)
            </nuxt-link>

            <nuxt-link v-on:click.native="addLatestDegree('F')" to="rncp" class="box">
              <input type="radio" name="answer"> &nbsp;DEUG, DUT, DEUST, BTS ou autre certification de niveau III (niveau. CEC : 5)
            </nuxt-link>
            <nuxt-link v-on:click.native="addLatestDegree('G')" to="rncp" class="box">
              <input type="radio" name="answer"> &nbsp;Licence, licence professionnelle, Maîtrise ou autre certification de niveau II (niveau CEC : 6)
            </nuxt-link>
            <nuxt-link v-on:click.native="addLatestDegree('H')" to="rncp" class="box">
              <input type="radio" name="answer"> &nbsp;DESS, Master, titre d’ingénieur ou autre certification de niveau I (niveau CEC : 7)
            </nuxt-link>
            <nuxt-link v-on:click.native="addLatestDegree('I')" to="rncp" class="box">
              <input type="radio" name="answer"> &nbsp;Doctorat, DEA de niveau I (niveau CEC : 8)
            </nuxt-link>

            <div class="form-field-action field" style="margin-top: 20px">
              <div class="control">
                <nuxt-link v-on:click.native="addLatestDegree('H')" to="rncp" class="is-ok button is-text is-pulled-left">
                  Remplir plus tard
                </nuxt-link>
              </div>
            </div>

      </div>


      <div class="form-help">
        <h3 class="title is-5">Besoin d'aide ?</h3>
        <div class="form-help-content content">
          <p>
            Indiquez le diplôme qui a le plus haut niveau dans l'ensemble de vos diplômes.
          </p>
          <p>
            Il s'agit d'une simple information, cela ne sert pas à évaluer votre candidature à la VAE.
          </p>
          <p>
            Rappelez-vous, la seule condition pour demander votre diplôme en VAE est de justifier d'un an d'expérience.
          </p>
          <p>
            Et oui, que vous ayez déjà ou non un diplôme, vous pouvez vous lancer dans une démarche de VAE !
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
  mounted() {
    // this.$store.commit('updateProgress', 50)
  },
  methods: {
    addLatestDegree (e) {
      this.$store.commit('education/addLatestDegree', e)
    },
  }
}
</script>

<style>

</style>
