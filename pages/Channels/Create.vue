s<template lang="pug">

.card 
    .card-header 
        .card-header-title Create
        //.card-header-icon
            button.button.is-primary
                i.fas.fa-plus
    //.card-image 
    .card-content 
        .field.has-addons
            p.control.has-icons-left.has-icons-right.is-expanded(:class="controls.video.isLoading?'is-loading':''")
                input.input(type='text' v-model='videoId' placeholder='Video ID')
                span.icon.is-small.is-left
                    i.fab.fa-youtube.has-text-danger
                span.icon.is-small.is-right 
                    i(:class="typeof(controls.video.status)==='boolean'? (controls.video.status?'fas fa-check has-text-success':'fas fa-times has-text-danger') :''")
            p.control
                a.button(@click="LoadByVideoId(videoId)") Search
        .field.has-addons
            p.control.has-icons-left.has-icons-right.is-expanded(:class="controls.channel.isLoading?'is-loading':''")
                input.input(type='text' v-model='channelId' placeholder='Channel ID')
                span.icon.is-small.is-left
                    i.fas.fa-tv.has-text-danger
                span.icon.is-small.is-right
                    i(:class="typeof(controls.channel.status)==='boolean'?controls.channel.status?'fas fa-check has-text-success':'fas fa-times has-text-danger':''")
            p.control
                a.button(@click="LoadById(channelId)") Search
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
            controls: {
                video: {
                    isLoading: false,
                    status: undefined
                },
                channel: {
                    isLoading: false,
                    status: undefined
                }
            },
            channelId: '',
            videoId: '',
            reset() {
                this.channelId = ''
                this.videoId = ''
                this.data = null
                this.controls.video = {
                    isLoading: false,
                    status: undefined
                }
                this.controls.channel = {
                    isLoading: false,
                    status: undefined
                }
            },
            data: {}
        }
    },
    methods: {
        Reset() {
            this.reset()
        },
        Search() {
            alert('Searching')
        },
        Create() {
            alert('Creating')
        },
        LoadById(id) {
            const me = this
            me.controls.channel.status = undefined
            me.controls.channel.isLoading = true
            setTimeout(() => {
                me.controls.channel.isLoading = false
                me.controls.channel.status = false
            }, 2000)
        },
        LoadByVideoId(id) {
            const me = this
            me.controls.video.isLoading = true
            me.controls.video.status = undefined
            me.controls.video.isLoading = true
            setTimeout(() => {
                me.controls.video.isLoading = false
                me.controls.video.status = false
            }, 2000)
        }
    }
}
</script>
