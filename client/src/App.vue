<template>
    <div id="app" class="d-flex flex-column align-items-center py-5">
        <div class="container px-0 px-lg-3">
            <Menu />
            <div class="view-wrapper"> 
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
            transform-origin: center;
        }
    }
    
    .disable-transitions {
        &, * {
            &, &:hover, &:focus, &:focus-within, &::after, &::before {
                transition: none;
                transform-origin: unset;
            }
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
        white-space: nowrap;
    }
    
    .opacity-50 {opacity: .5;}
    .opacity-75 {opacity: .75;}
    
    .list-group-item-action.active {
        * { fill: white }
    }
    
    @media (min-width: 576px) {}
    
    @media (min-width: 768px) { 
        .view-wrapper {
            box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);
            box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
            box-shadow: 0 0rem 1rem rgb(0 0 0 / 4%);
            // border: 2px solid #ecf4ff;
            border-radius: .25rem;
        }
    }
    
    @media (min-width: 992px) {}
    
    @media (min-width: 1200px) {}
</style>

<script>
    import OrderForm from './components/OrderForm.vue';
    import appInfo from '../package.json';
    import Menu from './components/Menu.vue';
    
    self.addEventListener('activate', (event) => {
        var cacheKeeplist = ['v2'];

        event.waitUntil(
            caches.keys().then((keyList) => {
                return Promise.all(keyList.map((key) => {
                    if (cacheKeeplist.indexOf(key) === -1) {
                        return caches.delete(key);
                    }
                }));
            })
        );
    })
    
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
