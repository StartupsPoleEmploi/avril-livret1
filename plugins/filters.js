import Vue from 'vue'
import {pluralize} from 'avril/js/utils/string';

Vue.filter('pluralize', (word, number) => pluralize(word, number));