<template>
  <div>
    <div class="field">
      <h3 class="title is-5">Quels diplômes avez-vous obtenu en rapport avec le diplôme {{certification || ' que vous souhaitez obtenir'}} ?</h3>
      <ItemInput :items="relatedDegrees" :addItem="addRelatedDegree" placeholder="Ex: Bac pro commerce" />
    </div>
    <ItemList :items="relatedDegrees" :removeItem="removeRelatedDegree" />
    <ContinueOrFillLater to="/formations/formations" :value="relatedDegrees" />
  </div>
</template>

<script>
  import ContinueOrFillLater from '~/components/ContinueOrFillLater.vue';
  import ItemList from '~/components/ItemList.vue';
  import ItemInput from '~/components/ItemInput.vue';

  export default {
    components: {
      ContinueOrFillLater,
      ItemInput,
      ItemList,
    },
    computed: {
      certification() {
        return this.$store.state.certificationLabel;
      },
      relatedDegrees() {
        return this.$store.state.education.relatedDegrees;
      },
    },
    methods: {
      addRelatedDegree(value) {
        this.$store.commit('education/addRelatedDegree', value)
      },
      removeRelatedDegree(value) {
        if(window.confirm('Je confirme vouloir supprimer ce diplôme ?')){
          this.$store.commit('education/removeRelatedDegree', value)
        }
      }
    }
  }
</script>