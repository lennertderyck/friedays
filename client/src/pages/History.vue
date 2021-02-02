<template>
    <div class="history">
        <OrderHistoryVue/>
    </div>
</template>

<script>
    import OrderHistoryVue from '../components/OrderHistory.vue'

    export default {
        name: 'History',
        components: {
            OrderHistoryVue
        }
    }
</script>
