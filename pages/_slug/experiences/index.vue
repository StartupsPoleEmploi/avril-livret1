<template>
  <div>
    <h1 class="title is-3">Mes expériences professionnelles</h1>

    <nuxt-link
      v-on:click.native="newExperience()"
      to="/experiences/fonction"
      class="button"
      :class="experiencesProgress < 100 ? 'is-primary' : 'is-default'"
    >
      <Plus />
      Ajouter une
      {{ experiences.length ? 'nouvelle ' : '' }}expérience
    </nuxt-link>
    <div class="section is-vertical">
      <div class="columns is-multiline">
        <div v-for="experience in experiences" class="column">
          <div class="box is-equal-height">
            <h3 class="title is-4">
              <CompanyDisplay :experience="experience" />
            </h3>
            <ul style="margin-bottom: 1rem;">
              <li v-for="period in experience.periods">
                <PeriodDisplay :period="period" />
              </li>
            </ul>
            <div v-if="incompleteFields(experience).length" class="notification is-danger">
              Champs à compléter: {{incompleteFields(experience).join(', ')}}
            </div>
            <div class="columns">
              <div class="column">
                <nuxt-link
                  @click="setCurrentExperience(experience.uuid)"
                  class="button is-text"
                  to="/experiences/fonction"
                  >{{incompleteFields(experience).length ? 'Compléter' : 'Modifier'}}</nuxt-link
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
    </div>
    <div v-if="experiencesProgress === 100">
      <div class="title is-5">
        Pas d'autre expérience professionnelle à ajouter ?
      </div>
      <nuxt-link
        :event="experiencesProgress < 100 ? '' : 'click'"
        to="/recapitulatif"
        class="button is-primary"
      >
        Enregistrer mon dossier de recevabilité
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import Plus from 'avril/images/icons/plus.svg';
  import { isBlank } from 'avril/js/utils/boolean.js';

  import PeriodDisplay from '~/components/PeriodDisplay.vue';
  import CompanyDisplay from '~/components/CompanyDisplay.vue';
  import NuxtLink from '~/components/NuxtLink.vue';

  const translateKey = k => {
    switch(k) {
      case 'title':
        return 'fonction';
      case 'companyName':
        return 'nom de l\'entreprise';
      case 'fullAddress':
        return 'adresse de l\'entreprise';
      case 'jobIndustry':
        return 'famille professionnelle';
      case 'employmentType':
        return 'statut';
      case 'skills':
        return 'compétences';
      case 'periods':
        return 'périodes d\'emploi';
      default:
        return '';
    }
  }

  export default {
    mounted() {
      this.$store.commit('experiences/removeCurrent');
    },
    components: {
      CompanyDisplay,
      NuxtLink,
      PeriodDisplay,
      Plus,
    },
    computed: {
      experiences() {
        return this.$store.state.experiences;
      },
      experiencesProgress() {
        return this.$store.getters['experiences/progress'];
      }
    },
    data: function() {
      return {
        noStepper: true,
      }
    },
    methods: {
      newExperience() {
        this.$store.dispatch('experiences/newExperience');
      },
      setCurrentExperience(uuid) {
        this.$store.commit('experiences/setCurrent', uuid);
      },
      removeExperience(uuid) {
        if(window.confirm('Je confirme vouloir supprimer cette expérience ?')){
          this.$store.commit('experiences/remove', uuid);
        }
      },
      incompleteFields(experience) {
        return Object.entries(experience).reduce((result, [k, v]) => {
          if (isBlank(v)) {
            return result.concat(translateKey(k))
          }
          return result
        }, [])
      },
    }
  };
</script>