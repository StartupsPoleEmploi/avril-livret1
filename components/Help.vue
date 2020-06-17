<template>
  <div class="form-help">
    <div class="notification is-default" :class="isExpanded ? 'is-expanded' : ''">
      <button v-if="isExpanded" @click="toggleExpanded()" class="delete is-pulled-right"></button>
      <h3 class="title is-5" @click="toggleExpanded()">Besoin d'aide ?</h3>
      <div class="form-help-content content">
        <div v-html="content"></div>
        <client-only>
          <expandable-image class="no-stretch bg-click" :src="img" :close-on-background-click="true"></expandable-image>
        </client-only>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data: function() {
      return {
        isExpanded: false,
      }
    },
    methods: {
      toggleExpanded: function() {
        this.isExpanded = !this.isExpanded;
      },
    },
    props: [
      'content',
      'img',
    ],
  }
</script>
<style lang="scss">
  body > .expandable-image.expanded.no-stretch > img {
    width: auto;
    height: auto;
  }

  body > .expandable-image.expanded.bg-click {
    cursor: zoom-out;
    & > img {
      cursor: default;
    }
  }
</style>