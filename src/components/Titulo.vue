<template>
    <div class="mt-4 text-center">
        <h1>{{ titulo }}</h1>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: "Titulo",
    props: {
        titulo: '',
    },
};
</script>
