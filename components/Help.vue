<template>
  <div class="form-help">
    <div class="notification is-default" :class="isExpanded ? 'is-expanded' : ''">
      <button v-if="isExpanded" @click="toggleExpanded()" class="delete is-pulled-right"></button>
      <h3 class="title is-5" @click="toggleExpanded()">Besoin d'aide ?</h3>
      <div class="form-help-content content">
        <div v-html="contentNoImage"></div>
        <client-only v-if="img">
          <expandable-image class="no-stretch bg-click" :src="img" :close-on-background-click="true"></expandable-image>
        </client-only>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    computed: {
      img: function() {
        if (this.content) {
          const match = this.content.match(/<img.*?src="(.*?)".*?>/mi);
          return match && match[1];
        }
      },
      contentNoImage: function() {
        if (this.content) {
          return this.content.replace(/<p><img.*?<\/p>/, '');
        }
      },
    },
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
    ],
    watch: {
      content: function(newVal, oldVal) {
        this.isExpanded = false;
      },
    }
  }
</script>
<style lang="scss">
  .expandable-image {
    &:not(.expanded) img {
      cursor: pointer;
    }

    &.expanded {
      &.no-stretch > img {
        width: auto;
        height: auto;
      }
      &.bg-click {
        cursor: pointer;
        & > img {
          cursor: default;
        }
      }
    }
  }

</style>