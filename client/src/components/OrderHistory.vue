<template>
    <div class="p-0">
        <ul class="list-group list-group-flush list-group--history rounded" v-if="data.length != 0">
            <li class="list-group-item order" v-for="order in data" :key="order.id" @click="collapseOrder($event)">
                <div>
                    <p class="mb-0">{{ order.order }}</p>
                    <p class="mb-0 opacity-75 order__detail">
                        besteld op 31 januari bij {{ order.shopDetails && order.shopDetails.fields.naam || order.otherShop }} 
                        door {{ order.orderer.firstName }}
                        <template v-if="order.users.length > 1">
                            en {{ order.users.length - 1 }} andere 
                            <template v-if="order.users.length == 2">persoon</template>
                            <template v-else>personen</template>
                        </template>
                    </p>
                </div>
                <div>
                    <p class="mb-0 order__shop text-muted">{{ order.shopDetails && order.shopDetails.fields.naam || order.otherShop }}</p>
                    <div class="order__show-details">
                        <router-link class="menu__item btn btn-primary" exact :to="'/history/' + order.id">Toon details</router-link>
                    </div>
                </div>
            </li>
        </ul>
        <div v-else>
            <LoaderVue />
        </div>
    </div>
</template>

<style lang="scss">
    .list-group--history {
        .list-group-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 1.4rem;
            margin-top: 0;
            padding: 1rem 1.4rem;
            border: none;
            border-top: 1px solid var(--border);
            overflow: hidden;
            
            &:first-child {
                border-top: none;
            }
            
            &.active {
                color: inherit;
                background-color: var(--primary-active);
                border-color: var(--primary-active);
                margin-top: 0;
                
                .order__detail {
                    max-height: 100vh;
                    opacity: .50;
                    transform: translateY(0%);
                }
                
                .order__shop {
                    transform: translateY(100%);
                    opacity: 0;
                    max-height: 0vh;
                }
                
                .order__show-details {
                    max-height: 100vh;
                    opacity: 1;
                    transform: translateY(0%);
                }
                
                & + .list-group-item {
                    border-top-color: #ced4da00;
                }
            }
            
            .order__detail {
                max-height: 0vh;
                overflow: hidden;
                opacity: 0;
                transform: translateY(100%);
                transition: opacity .3s ease, transform .3s ease;
            }
            
            .order__show-details {
                max-height: 0vh;
                opacity: 0;
                transform: translateY(-100%);
                overflow: hidden;
                transition: opacity .3s ease, transform .3s ease;
            }
            
            .order__shop {
                opacity: 1;
                transform: translateY(0%);
                max-height: 100vh;
                overflow: hidden;
                text-align: right;
                transition: opacity .3s ease, transform .3s ease;
            }
        }
    }
</style>

<script>
import { getNerds, getOrders } from '../utils/apiData';
import LoaderVue from './Loader.vue';

export default {
    name: 'OrderHistory',
    components: {
        LoaderVue
    },
    props: {
        data: {
            type: Array,
            required: true
        },
    },
    data: () => ({
        orders: [],
        nerds: []
    }),
    async mounted() {
        this.orders = await getOrders();
        this.nerds = await getNerds();
    },
    methods: {
        collapseOrder ({ target }) {
            const $btn = target.closest('.list-group-item')
            const isActive = $btn.classList.contains('active');
            const $currentActive = $btn.parentNode.querySelector('.active');
            
            $currentActive && $currentActive.classList.remove('active');
            
            if (!isActive) $btn.classList.add('active');
            else $btn.classList.remove('active');
        }
    }
}
</script>