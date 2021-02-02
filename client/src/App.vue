<template>
    <div id="app" class="d-flex flex-column align-items-center pt-5 pb-3">
        <Menu />
        <!-- {{ this.$root.apiBase }} -->
        <div class="container">
            <div class="shadow-sm rounded"> 
                <router-view></router-view>
            </div>
        </div>
        <footer class="mt-auto opacity-50">v{{ appInfo.version }} – <a :href="appInfo.homepage" target="_blank" rel="noopener noreferrer">GitHub</a></footer>
    </div>
</template>

<style lang="scss">   
    * {
        &, &:hover, &:focus, &:focus-within, &::after, &::before {
            transition: all .3s ease;
        }
    }
 
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
    import Menu from './components/Menu.vue';
    
    export default {
        name: 'App',
        components: {
            OrderForm,
            Menu
        },
        data: () => ({
            appInfo
        }),
        mounted() {
            document.title = 'Friedays'
        }
    }
</script>
