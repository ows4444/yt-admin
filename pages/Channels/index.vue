<template lang="pug">
.card 
    .card-header 
        .card-header-title List
        .card-header-icon
            router-link.button.is-primary(to="Channels/Create" tag="button")
                i.fas.fa-plus
    .card-image 
    .card-content 
    //.card-footer 
        .card-footer-item
</template>
<script>
export default {
    name: 'Channels',
    meta: { admin: true }
}
</script>
