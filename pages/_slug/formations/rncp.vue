<template>
  <div>
    <div class="field">
      <h3 class="title is-5">Quels diplômes avez-vous obtenu en rapport avec le diplôme {{certificationName || ' que vous souhaitez obtenir'}} ?</h3>
      <ItemInput :items="diplomas" :addItem="addDiplomas" placeholder="Ex: Bac pro commerce" />
    </div>
    <ItemList :items="diplomas" :removeItem="removeRelatedDegree" />
    <ContinueOrFillLater to="/formations/formations" :value="diplomas" />
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
      certificationName() {
        return this.$store.state.certificationName;
      },
      diplomas() {
        return this.$store.state.education.diplomas;
      },
    },
    methods: {
      addDiplomas(value) {
        this.$store.commit('education/addDiplomas', value)
      },
      removeRelatedDegree(value) {
        if(window.confirm('Je confirme vouloir supprimer ce diplôme ?')){
          this.$store.commit('education/removeRelatedDegree', value)
        }
      }
    }
  }
</script>