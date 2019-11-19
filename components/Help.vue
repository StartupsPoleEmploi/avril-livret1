<template>
  <div class="form-help">
    <h3 class="title is-5">Besoin d'aide ?</h3>
    <div class="form-help-content content">
      <div v-html="content"></div>
    </div>
    <p style="margin-top:1rem">
      <a href="#" class="is-text">J'ai besoin de plus d'aide pour répondre à cette question</a>
    </p>
  </div>
</template>
<script type="text/javascript">
  export default {
    props: ['content'],
  }
</script>