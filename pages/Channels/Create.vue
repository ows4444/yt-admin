<template lang="pug">

.card 
    .card-header 
        .card-header-title Create
        //.card-header-icon
            button.button.is-primary
                i.fas.fa-plus
    //.card-image 
    .card-content 
        .field
            p.control.has-icons-left.has-icons-right
                input.input(type='text' v-model='channelId' placeholder='Channel ID')
                span.icon.is-small.is-left
                    i.fa.fa-play.has-text-danger
                span.icon.is-small.is-right
                    //i.fas.fa-check.has-text-success
                    //i.fas.fa-times.has-text-danger
    .card-footer 
        .card-footer-item.button.is-info(@click="Reset") Reset
        .card-footer-item.button.is-primary(@click="Search") Search
        .card-footer-item.button.is-success(@click="Create") Create



</template>
<script>
export default {
    name: 'CreateChannel',
    meta: { admin: true },
    data() {
        return {
            channelId: '',
            data: {}
        }
    },
    methods: {
        Reset() {
            this.channelId = ''
        },
        Search() {
            alert('Searching')
        },
        Create() {
            alert('Creating')
        }
    }
}
</script>
