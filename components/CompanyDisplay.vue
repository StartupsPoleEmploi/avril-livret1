<template>
  <span>
    {{ experience.title || 'Fonction à compléter' }} chez {{ experience.companyName || 'Entreprise à compléter' }}
  </span>
</template>

<script type="text/javascript">
  export default {
    props: ['experience'],
  }
</script>