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
            //.card-footer 
                .card-footer-item.button.is-info(@click="Reset") Reset
                .card-footer-item.button.is-primary(@click="Search") Search
                .card-footer-item.button.is-success(@click="Create") Create
        br
        .columns
            .column.is-one-third.is-offset-one-third
                .card.is-one-third.is-offset-one-third(v-if="channelData.snippet")
                    .card-image
                        figure.image.is-square
                            img(v-if="channelData.snippet" :src="channelData.snippet.thumbnails.high.url", alt='Placeholder image')
                    .card-content
                        .media
                            .media-left
                                figure.image.is-48x48
                                    img(v-if="channelData.snippet" :src="channelData.snippet.thumbnails.default.url", alt='Placeholder image')
                            .media-content
                                p.title.is-4(v-if="channelData.snippet") {{channelData.snippet.title}}
                                    p.subtitle.is-6(v-if="channelData.snippet") @{{channelData.snippet.customUrl}}
                        .content(v-if="channelData.snippet")
                            |{{channelData.snippet.description}}  
                            time {{FormatDate(channelData.snippet.publishedAt)}}
                    footer.card-footer(v-if="!hasSaved")
                        .field.has-addons.card-footer-item
                            .control
                                .select.is-fullwidth
                                    select(v-model='ChannelType' :disabled="IsSaving")
                                        option(value="") Select Type
                                        option(v-for='option,key in List', v-bind:value='key') {{ key }}
                            .control.is-expanded
                                .select.is-fullwidth
                                    select(v-model='ChannelOption' :disabled="IsSaving")
                                        option(value="") Select Type
                                        option(v-for='option in List[ChannelType]', v-bind:value='option') {{ option }}
                            .control
                                button.button(@click="Save" :class="IsSaving?'is-info is-loading':!ChannelType&&!ChannelOption ?'is-danger':'is-primary'" :disabled="!ChannelType") Save

</template>
<script>
import moment from 'moment'

export default {
    name: 'CreateChannel',
    meta: { admin: true },
    data() {
        return {
            channelId: 'https://www.youtube.com/user/geonews',
            videoId: 'https://www.youtube.com/watch?v=xQB0GDOIPYg',
            compId: '',
            data: { snippet: null },
            IsSaving: false,
            hasSaved: false,
            List: null,
            ChannelType: '',
            ChannelOption: ''
        }
    },

    computed: {
        channelData() {
            const data = this.$store.state.channelData
            if (data) {
                return data
            }
            return {}
        }
    },
    async created() {
        this.List = await this.$store.dispatch('getChannelTypes')
    },
    methods: {
        FormatDate(date) {
            return moment().format('DD MMM YYYY')
        },
        Reset() {
            this.channelId = ''
            this.videoId = ''
        },
        Save() {
            this.IsSaving = true
            this.$store
                .dispatch('SaveChannel', { Channel: this.ChannelType, Type: this.ChannelOption, data: this.channelData, axios: this.$axios })
                .then(() => {})
                .catch(e => {
                    console.log(e)
                })
        },

        SearchByVideoId(id) {
            let url
            try {
                url = new URL(id)
                const VideoId = url.searchParams.get('v')

                this.$store.dispatch('getChannelByVideoId', {
                    VideoId,
                    axios: this.$axios
                })
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
                        this.$store.dispatch('getChannelById', {
                            ChannelId: key,
                            axios: this.$axios
                        })
                        break
                    case 'user':
                        this.$store
                            .dispatch('getChannelByUser', {
                                ChannelUser: key,
                                axios: this.$axios
                            })
                            .catch(e => {
                                console.log(e)
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
