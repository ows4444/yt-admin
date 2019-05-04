<template lang="pug">
    .container
        .card 
            .card-header 
                .card-header-title Create
                //.card-header-icon
                    button.button.is-primary
                        i.fas.fa-plus
            
            //img.card-image(style="width:200px; height:180")
            //.card-image
                figure.image.is-4by3
                    img(src='https://bulma.io/images/placeholders/1280x960.png', alt='Placeholder image')
            .card-content 
                .field.has-addons
                    p.control.is-expanded.has-icons-left.has-icons-right
                        input.input(type='text',v-model='videoId' placeholder='Video ID')
                        span.icon.is-small.is-left
                            i.fa.fa-play.has-text-danger
                        span.icon.is-small.is-right
                            i.fas.fa-check.has-text-success
                    p.control
                        button.button.is-info(@click="SearchByVideoId(videoId)")
                            | Search
                .field.has-addons
                    p.control.is-expanded.has-icons-left.has-icons-right
                        input.input(type='text' v-model='channelId' placeholder='Channel ID')
                        span.icon.is-small.is-left
                            i.fa.fa-tv.has-text-danger
                        span.icon.is-small.is-right
                            i.fas.fa-check.has-text-success
                            //i.fas.fa-times.has-text-danger
                    p.control
                        button.button.is-info(@click="SearchByChannelI(channelId)")
                            | Search
            .card-footer 
                .card-footer-item.button.is-info(@click="Reset") Reset
                .card-footer-item.button.is-primary(@click="Search") Search
                .card-footer-item.button.is-success(@click="Create") Create
        br
        .columns
            .column.is-one-third.is-offset-one-third
                .card
                    .card-header 
                        .card-header-title Create
                    .card-image
                        figure.image.is-square
                            img(src='https://yt3.ggpht.com/a/AGF-l7_gge57k2Ccvf5olvrsLhkpvIynXZ3dc5-6=s800-mo-c-c0xffffffff-rj-k-no', alt='Placeholder image')
                    .card-content



</template>
<script>
export default {
    name: 'CreateChannel',
    meta: { admin: true },
    data() {
        return {
            channelId:
                'https://www.youtube.com/channel/UC8aqhu3jY6Q8B9n0a8l1_Qg',
            videoId: 'https://www.youtube.com/watch?v=xQB0GDOIPYg',
            compId: '',
            data: {}
        }
    },
    methods: {
        Reset() {
            this.channelId = ''
            this.videoId = ''
        },
        Search() {
            alert('Searching')
        },
        Create() {
            alert('Creating')
        },
        SearchByVideoId(id) {
            let url
            try {
                url = new URL(id)
                const v = url.searchParams.get('v')
                this.compId = v
            } catch (e) {
                this.compId = e
            }
        },
        SearchByChannelI(id) {
            let url
            let data
            try {
                url = new URL(id)
                const v = url.pathname
                data = v.substr(v.indexOf('/') + 1).split('/')
                const type = data[0].toLowerCase()
                const key = data[1]
                switch (type) {
                    case 'channel':
                        this.$store
                            .dispatch('getChannelById', {
                                ChannelId: key,
                                axios: this.$axios
                            })
                            .then(responce => {
                                console.log(responce)
                            })
                        break
                    case 'user':
                        this.$axios
                            .post(
                                `${this.$store.state.api}/get_channel_by_user`,
                                {
                                    ChannelUser: key
                                }
                            )
                            .then(responce => {
                                console.log(responce)
                            })
                        break
                }
            } catch (e) {
                this.compId = e
            }
        }
    }
}
</script>
