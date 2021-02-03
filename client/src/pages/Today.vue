<template>
    <div class="history py-5">
        <div class="px-3 px-md-5">  
            <h3 class="mb-3">Bestellingen vandaag</h3>
        </div>
        <div class="px-0 px-md-5">
            <OrderHistoryVue :data="orders"/>
        </div>
    </div>
</template>

<script>
    import OrderHistoryVue from '../components/OrderHistory.vue'
    import { getOrders } from '../utils/apiData'

    export default {
        name: 'Today',
        components: {
            OrderHistoryVue
        },
        data: () => ({
            orders: [],
        }),
        async mounted() {
            this.orders = await getOrders('/time/today');
        },
    }
</script>
