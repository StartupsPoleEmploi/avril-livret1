<template>
  <div class="field" v-if="items.length">
    <ul v-for="item in items">
      <li class="box">
        {{item}}
        <button @click="removeItem(item)" class="delete is-pulled-right"></button>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: {
      items: {
        type: Array,
        isRequired: true,
      },
      removeItem: {
        type: Function,
        isRequired: true,
      }
    }
  }
</script>