<template>
  <div>
    <div class="field">
      <h3 class="title is-5">Si vous avez suivi des formations courtes, effectué des stages ou obtenu des habilitations, indiquez les.</h3>
      <ItemInput :items="courses" :addItem="addCourse" placeholder="Ex: CACES, TOEIC, permis B, FIMO" />
    </div>
    <ItemList :items="courses" :removeItem="removeCourse" />
    <ContinueOrFillLater to="/experiences" :value="courses" />
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
      courses () {
        return this.$store.state.education.courses;
      },
    },
    methods: {
      addCourse(value) {
        this.$store.commit('education/addCourse', value)
      },
      removeCourse(value) {
        if(window.confirm('Je confirme vouloir supprimer cette formation ?')){
          this.$store.commit('education/removeCourse', value);
        }
      }
    }
  }
</script>

