<template>
  <div class="form">
    <div class="form-fields">

      <div class="field">
        <h3 class="title is-5">Quels diplômes avez-vous obtenu en rapport avec {{currentDegree || 'le diplôme que vous souhaitez obtenir'}} ?</h3>
      </div>

      <div class="field">
        <div class="control">
          <input class="input" ref="relatedDegree" type="text" placeholder="Exemple : Bac pro commerce" @keyup.enter="addRelatedDegree">
          <div class="has-text-right" style="margin-top:5px;">
            Pour ajouter, appuyez sur <strong>Entrée</strong> ou
            <button class="button" :class="relatedDegrees.length ? 'is-default' : 'is-dark'" @click="addRelatedDegree" style="margin-top:4px">
              + Ajouter
            </button>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="titres">
          <ul v-for="relatedDegree in relatedDegrees">
            <li class="box">
              {{relatedDegree}}
              <button @click="removeRelatedDegree(relatedDegree)" class="delete is-pulled-right"></button>
            </li>
          </ul>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <nuxt-link to="formations" class="is-ok button is-pulled-right" :class="relatedDegrees.length ? 'is-dark' : 'is-default'">
            {{relatedDegrees.length ? 'Continuer' : 'Aucun, continuer'}}
          </nuxt-link>
          <nuxt-link to="formations" class="is-ok button is-text is-pulled-left">
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
      currentDegree() {
        return this.$store.state.education.currentDegree;
      },
      relatedDegrees() {
        return this.$store.state.education.relatedDegrees;
      },
    },
    methods: {
      addRelatedDegree(e) {
        if( this.$refs.relatedDegree.value == '' || this.$refs.relatedDegree.value == ' ' ){
          return false;
        }
        this.$store.commit('education/addRelatedDegree', this.$refs.relatedDegree.value)
        this.$refs.relatedDegree.value = ''
      },
      removeRelatedDegree(value) {
        if(window.confirm('Je confirme vouloir supprimer ce diplôme ?')){
          this.$store.commit('education/removeRelatedDegree', value)
        }
      }
    }
  }
</script>