<template lang="pug">
p List
</template>
<script>
export default {
    name: 'Channels',
    meta: { admin: true },
    async created() {
        console.log('calling')
        const ip = await this.$axios.$get('http://localhost:5000/youtube-player-238012/us-central1/api')
        console.log(ip)
    }
}
</script>
