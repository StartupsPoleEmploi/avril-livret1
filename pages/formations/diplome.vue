<template>
  <div class="form">
    <div class="form-fields">
      <h3 class="title is-5">Quel est le diplôme le plus élevé que vous ayez obtenu en France ?</h3>
      <div v-for="{label, value} in possibleAnswers">
        <nuxt-link v-on:click.native="addLatestDegree(value)" to="rncp" class="box" :class="latestDegree == value ? 'active' : ''">
          <input type="radio" name="answer" :checked="latestDegree == value ? 'active' : ''"> &nbsp;{{label}}
        </nuxt-link>
      </div>
      <div class="form-field-action field" style="margin-top: 20px">
        <div class="control">
          <nuxt-link v-on:click.native="addLatestDegree()" to="rncp" class="is-ok button is-text is-pulled-left">
            Remplir plus tard
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="form-help">
      <h3 class="title is-5">Besoin d'aide ?</h3>
      <div class="form-help-content">
        Indiquez le diplôme qui le plus haut niveau dans l'ensemble de vos diplômes.<br/>
        Il s'agit d'une simple information, cela ne sert pas à évaluer votre candidature à la VAE.<br/>
        Rappelez-vous, la seule condition pour demander votre diplôme en VAE est de justifier d'un an d'expérience.
        Et oui, que vous ayez déjà ou non un diplôme, vous pouvez vous lancer dans une démarche de VAE !
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
    latestDegree() {
      return this.$store.state.education.latestDegree;
    },
    possibleAnswers() {
      return [{
        label: 'Aucun diplôme',
        value: 'A',
      }, {
        label: 'Certificat d’étude primaire',
        value: 'B',
      }, {
        label: 'Brevet des collèges (BEPC, DNB), Certificat de Formation Générale (niveau V bis)',
        value: 'C',
      }, {
        label: 'CAP, BEP ou autre certification de niveau V (niveau CEC3 : 3)',
        value: 'D',
      }, {
        label: 'Baccalauréat général, technologique, professionnel, ESEU, DAEU, ou autre certification de niveau IV (niveau CEC : 4)',
        value: 'E',
      }, {
        label: 'DEUG, DUT, DEUST, BTS ou autre certification de niveau III (niveau. CEC : 5)',
        value: 'F',
      }, {
        label: 'Licence, licence professionnelle, Maîtrise ou autre certification de niveau II (niveau CEC : 6)',
        value: 'G',
      }, {
        label: 'DESS, Master, titre d’ingénieur ou autre certification de niveau I (niveau CEC : 7)',
        value: 'H',
      }, {
        label: 'Doctorat, DEA de niveau I (niveau CEC : 8)',
        value: 'I',
      }]
    }
  },
  methods: {
    addLatestDegree(e) {
      this.$store.commit('education/addLatestDegree', e)
    },
  }
}
</script>