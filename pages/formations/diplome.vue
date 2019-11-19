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
    <Help :content="help" />
  </div>
</template>

<script>
import helpLoaderMixin from '~/mixins/helpLoader.js';

export default {
  mixins: [helpLoaderMixin],
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