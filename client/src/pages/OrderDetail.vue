<template>
    <div class="order-detail py-5">
        <div class="px-3 px-md-5" v-if="currentOrder">  
            <div class="mb-4">
                <h3 class="mb-0">Bestelling</h3>
                <p class="text-muted">door {{ currentOrder.orderer.firstName }} {{ currentOrder.orderer.lastName }}</p>
                <p class="mb-0">{{ currentOrder.order }}</p>
                <p class="text-muted">{{ currentOrder.comment }}</p>
            </div>
            <div class="row text-muted">
                <div class="col-12 col-md">
                    <p class="mb-0"><strong>Andere personen</strong></p>
                    <p class="mb-0">{{ extraUsers.length && extraUsers || 'Geen' }}</p>
                </div>
                <div class="col-12 col-md">
                    <p class="mb-0"><strong>Datum</strong></p>
                    <p class="mb-0">8 februari 2021</p>
                </div>
                <div class="col-12 col-md">
                    <p class="mb-0"><strong>Restaurant</strong></p>
                    <p class="mb-0">Domino's Pizza</p>
                </div>
            </div>
        </div>
        <div v-else>
            <LoaderVue />
        </div>
    </div>
</template>

<script>
    import LoaderVue from '../components/Loader.vue';
    import { getOrders } from '../utils/apiData'

    export default {
        components: {
            LoaderVue
        },
        data: () => ({
            currentOrder: null,
            extraUsers: []
        }),
        async mounted() {
            const [ requestedOrder ] = await getOrders('/id' + this.$route.params.id);
            this.currentOrder = await requestedOrder;
            const allNerds = this.$root.nerds;
            const [orderer, ...otherNerds] = await requestedOrder.users.map(user => ({
                ...allNerds.find(nerd => nerd.id === user)
            }))
            this.extraUsers = otherNerds;
        }
    }
</script>

