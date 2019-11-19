<template>
  <div class="form experience-index">
    <div class="form-fields">

      <h1 class="title is-3">Mes expériences professionnelles</h1>

      <nuxt-link to="experiences/fonction" class="button" :class="experiencesProgress < 100 ? 'is-dark' : ''">
        &nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>add</title>
            <path d="M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z"></path>
        </svg>&nbsp; Ajouter une expérience
      </nuxt-link>
      <span class="avril-ou" v-if="experiencesProgress == 100">&nbsp;ou&nbsp;</span>
      <nuxt-link v-if="experiencesProgress == 100" :event="experiencesProgress < 100 ? '' : 'click'" to="/formations" class="is-ok button is-dark">
        Avancer vers mes formations
      </nuxt-link>

      <div class="columns is-multiline">
        <div v-for="experience in experiences" class="column is-half">
          <div class="box is-equal-height">
            <h3 class="title is-4">{{ experience.role }}</h3>
            <h3 class="title is-6">{{ experience.duration }} heures</h3>
            <p>{{ experience.companyName }}</p>
            <span>{{ experience.period }}</span>
            <a href="#">éditer</a>
          </div>
        </div>
        <div class="column is-one-quarter">
          <div class="avril__box__experience is-equal-height">
          </div>
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
    experiences () {
      return this.$store.state.experiences
    },
    experiencesProgress () {
      return this.$store.getters['experiences/progress'];
    },
  },
  methods: {
    keymonitor: function(event) {
      if(event.key == "Enter")
      {
        this.$router.push('name')
      }
    }
  },
}
</script>

<style>
.experience-index{
  padding-top: 5rem;
}
.avril-ou{
  margin-top: 8px;
  display: inline-block;
}
.columns.is-multiline{
  margin-top: 40px;
}
.avril__ajouter__experience {
  display: block
}
.is-equal-height {
   display: flex;
   flex-direction: column;
   height: 100%;
}
</style>
