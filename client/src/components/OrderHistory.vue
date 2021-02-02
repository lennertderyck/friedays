<template>
    <div class="p-0">
        <ul class="list-group list-group-flush list-group--history rounded">
            <li class="list-group-item" v-for="order in orders" :key="order.id" @click="collapseOrder($event)">
                <div>
                    <p class="mb-0">{{ order.order }}</p>
                    <p class="mb-0 opacity-75 order__detail">besteld op 31 januari bij {{ order.shop || order.otherShop }} door {{ order.users[0] }}</p>                
                </div>
                <div>
                    <p class="mb-0 order__shop">{{ order.order || order.otherShop }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss">
    .list-group--history {
        .list-group-item {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 1rem 1.4rem;
            border: none;
            
            &.active {
                color: inherit;
                background-color: #ecf4ff;
                border-color: #ecf4ff;
                
                .order__detail {
                    max-height: 100vh;
                    opacity: .50;
                    transform: translateY(0%);
                }
                
                .order__shop {
                    transform: translateY(100%);
                    opacity: 0;
                    transition: opacity transform 1s ease;
                }
            }
            
            .order__detail {
                max-height: 0vh;
                overflow: hidden;
                opacity: 0;
                transform: translateY(100%);
                transition: opacity transform 1s ease;
            }
            
            .order__shop {
                opacity: 1;
                transform: translateY(0%);
            }
        }
    }
</style>

<script>
import { getNerds, getOrders } from '../utils/apiData';

export default {
    name: 'OrderHistory',
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