<template>
    <div id="app" class="d-flex align-items-center py-5">
        <OrderForm msg="Welcome to Your Vue.js App"/>
        <!-- {{ this.$root.apiBase }} -->
    </div>
</template>

<style lang="scss">    
    #app {
        min-width: 100vw;
        min-height: 100vh;
    }
    
    :focus, :active {
        outline: none !important;
    }
    
    box-icon {
        vertical-align: middle;
    }
    
    .btn {
        width: fit-content;
    }
    
    .opacity-50 {opacity: .5;}
    .opacity-75 {opacity: .75;}
    
    .list-group-item-action.active {
        * { fill: white }
    }
</style>

<script>
    import OrderForm from './components/OrderForm.vue'

    export default {
        name: 'App',
        components: {
            OrderForm
        }
    }
</script>
