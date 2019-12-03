<template>
  <autocomplete
  auto-select
    placeholder="Entrez une adresse"
    aria-label="Entrez une adresse"
    :get-result-value="getResultValue"
    :search="search"
    @submit="input"
  ></autocomplete>
</template>

<script type="text/javascript">
  import debounce from 'debounce';
  import algoliasearch from 'algoliasearch';
  import Autocomplete from '@trevoreyre/autocomplete-vue';
  import '@trevoreyre/autocomplete-vue/dist/style.css';
  import {removeTags} from '~/utils/string';

  const places = algoliasearch.initPlaces(
    process.env.NUXT_ALGOLIA_PLACES_APP_ID,
    process.env.NUXT_ALGOLIA_PLACES_API_KEY
  );

  export default {
    components: {
      Autocomplete,
    },
    methods: {
      search: input => {
        if (input && input.length >= 3) {
          return new Promise((resolve, reject) => {
            places.search({
              language: 'fr',
              query: input,
            }, function(err, res) {
              if (err) {
                reject(err);
              }
              resolve(res.hits);
            });
          });
        } else {
          return Promise.resolve([]);
        }
      },
      getResultValue: result => `${result.locale_names[0]}, ${result.postcode} ${result.city}, ${result.country}`
    },
    props: [
      'input',

    ],
  }
</script>
