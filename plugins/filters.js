import Vue from 'vue'
import {pluralize} from '../utils/string';

Vue.filter('pluralize', (word, number) => pluralize(word, number));