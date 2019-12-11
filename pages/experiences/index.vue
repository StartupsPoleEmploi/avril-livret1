<template>
  <div class="form experience-index">
    <div class="form-fields">
      <h1 class="title is-3">Mes expériences professionnelles</h1>

      <nuxt-link
        v-on:click.native="newExperience()"
        to="/experiences/fonction"
        class="button"
        :class="experiencesProgress < 100 ? 'is-dark' : ''"
      >
        &nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>add</title>
          <path
            d="M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z"
          ></path></svg
        >&nbsp; Ajouter une
        {{ experiences.length ? "nouvelle " : "" }}expérience
      </nuxt-link>
      <div class="columns is-multiline">
        <div v-for="experience in experiences" class="column">
          <div class="box is-equal-height">
            <h3 class="title is-4">
              {{ experience.role }} chez {{ experience.companyName }}
            </h3>
            <ul style="margin-bottom: 1rem;">
              <li v-for="period in experience.periods">
                <strong>{{ periodTotalHours(period) }} heures</strong> du
                {{ formatDate(period.start) }}
                <span v-if="period.end">au {{ formatDate(period.end) }}</span>
                <span v-else>à aujourd'hui</span>
              </li>
            </ul>
            <div class="columns">
              <div class="column">
                <nuxt-link
                  v-on:click.native="setCurrentExperience(experience.uuid)"
                  class="button is-text"
                  to="/experiences/fonction"
                  >Modifier</nuxt-link
                >
              </div>
              <div class="column">
                <button
                  @click="removeExperience(experience.uuid)"
                  class="button is-text"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="experiencesProgress === 100" style="margin-top: 1rem;">
        <div class="title is-5">
          Pas d'autre expérience professionnelle à ajouter ?
        </div>
        <nuxt-link
          :event="experiencesProgress < 100 ? '' : 'click'"
          to="/identite"
          class="button is-dark"
        >
          Avancer vers mon identité
        </nuxt-link>
      </div>
    </div>
    <Help :content="help" />
  </div>
</template>

<script>
import helpLoaderMixin from "~/mixins/helpLoader.js";
import { periodTotalHours, formatDate } from "~/utils/time.js";

export default {
  mixins: [helpLoaderMixin],
  mounted() {
    this.$store.commit("experiences/removeNotFilled");
    this.$store.commit("experiences/removeCurrent");
  },
  computed: {
    experiences() {
      return this.$store.state.experiences;
    },
    experiencesProgress() {
      return this.$store.getters["experiences/progress"];
    }
  },
  methods: {
    newExperience() {
      this.$store.dispatch("experiences/newExperience");
    },
    setCurrentExperience(uuid) {
      this.$store.commit("experiences/setCurrent", uuid);
    },
    removeExperience(uuid) {
      if(window.confirm('Je confirme vouloir supprimer cette expérience ?')){
        this.$store.commit("experiences/remove", uuid);
      }
    },
    periodTotalHours,
    formatDate,
  }
};
</script>

<style>
.experience-index {
  padding-top: 5rem;
}
.avril-ou {
  margin-top: 8px;
  display: inline-block;
}
.columns.is-multiline {
  margin-top: 40px;
}
</style>
