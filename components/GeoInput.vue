<template>
  <autocomplete
    auto-select
    :placeholder="placeholder"
    :aria-label="placeholder"
    :get-result-value="getResultValue"
    :search="search"
    @submit="submit"
    :default-value="addressLabelify(value)"
  >
    <template v-slot:result="{ result, props }">
      <li v-bind="props" class="autocomplete-result">
        <span v-html="getHtmlResultValue(result)"></span>
      </li>
    </template>
  </autocomplete>
</template>

<script type="text/javascript">
  import debounce from 'debounce';
  import algoliasearch from 'algoliasearch';
  import Autocomplete from '@trevoreyre/autocomplete-vue';
  import '@trevoreyre/autocomplete-vue/dist/style.css';
  import {removeTags} from '~/utils/string';
  import {addressLabelify, algoliaToAddress} from '~/utils/geo';

  const places = algoliasearch.initPlaces(
    process.env.NUXT_ALGOLIA_PLACES_APP_ID,
    process.env.NUXT_ALGOLIA_PLACES_API_KEY
  );

  export default {
    components: {
      Autocomplete,
    },
    methods: {
      search: function(input) {
        if (input && input.replace(/[0-9/s]/g, '').length >= 3) {
          return new Promise((resolve, reject) => {
            places.search({
              language: 'fr',
              query: input,
              type: this.type,
            }, function(err, res) {
              if (err || !res) {
                reject(err);
              }
              resolve(res.hits);
            });
          });
        } else {
          return Promise.resolve([]);
        }
      },
      addressLabelify,
      getResultValue: function(result) {
        return addressLabelify(algoliaToAddress(this.type, result));
      },
      getHtmlResultValue: function(result) {
        return this.getResultValue(result).replace('\n', '<br />');
      },
      submit: function(result) {
        this.input(algoliaToAddress(this.type, result));
      },
    },
    props: {
      input: {
        type: Function,
        required: true,
      },
      value: {
        type: Object,
      },
      placeholder: {
        type: String,
        default: 'Entrez une adresse',
      },
      type: {
        type: String,
        default: 'address',
      }
    },
  }
</script>

<style type="text/css">
  .autocomplete-result {
    cursor: pointer;
  }
</style>