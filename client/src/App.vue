<template>
    <div id="app" class="d-flex flex-column align-items-center pt-5 pb-3">
        <OrderForm msg="Welcome to Your Vue.js App"/>
        <!-- {{ this.$root.apiBase }} -->
        <footer class="mt-5">v{{ appInfo.version }}</footer>
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
    import OrderForm from './components/OrderForm.vue';
    import appInfo from '../package.json';

    export default {
        name: 'App',
        components: {
            OrderForm
        },
        data: () => ({
            appInfo
        }),
        mounted() {
            document.title = 'Friedays'
        }
    }
</script>
