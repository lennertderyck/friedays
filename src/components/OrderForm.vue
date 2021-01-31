<template>
    <div class="container">
        <div class="shadow-sm rounded py-5">
            <div class="px-5">
                <h3 class="mb-4">Nieuwe bestelling</h3>
                <div>
                    <div class="form-label">Voor wie is deze bestelling</div>
                    <select class="form-select" aria-label="Default select example" @change="onChange($event)" required>
                        <option selected disabled>Selecteer een persoon</option>
                        <option v-for="nerd in this.$root.nerds" :key="nerd.id" :value="nerd.id">{{ nerd.firstName }} {{ nerd.lastName }}</option>
                    </select>
                </div>
                <div class="mt-3">
                    <div class="form-label">Voeg extra personen toe aan deze bestelling</div>
                    <div v-if="!selectedPerson">
                        <span class="text-muted">Selecteer eerst wie deze bestelling plaatst</span>
                    </div>
                    <div class="list-group" v-else>
                        <template v-for="nerd in this.$root.nerds">
                            <label class="list-group-item" v-if="selectedPerson !== nerd.id" :key="nerd.id">
                                <input class="form-check-input me-1" name="usersExtra" type="checkbox" :value="nerd.id">
                                {{ nerd.firstName }} {{ nerd.lastName }}
                            </label>
                        </template>
                    </div>
                </div>
            </div>
            <div v-if="latestOrders && latestOrders.length != 0" class="mt-4 bg-light px-5 py-4">
                <h5 class="mb-3">Recentste bestellingen</h5>
                <ul class="list-group">
                    <button v-for="order in latestOrders" :key="order.id" @click="selectPreviousOrder($event)" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                        <!-- <span class="badge rounded-pill bg-light text-dark">{{ order.time }}</span> -->
                        <p class="mb-0 d-flex align-items-center">
                            <span>{{ order.order }}</span>
                            <span>・</span>
                            <span class="opacity-75">besteld op {{ dayjs(order.time).format('DD MMMM') }} bij {{ order.shop.fields.naam }}</span>
                        </p>
                        <div class="d-flex align-items-center">
                            opnieuw bestellen
                            <box-icon name='redo' class="ms-1"></box-icon>
                        </div>
                    </button>
                </ul>
            </div>
            <div class="px-5">
                <div class="mt-3">
                    <div class="form-label d-flex align-items-center">
                        Restaurant 
                        <div class="ms-1" tabindex="0" data-bs-toggle="popover" data-bs-content="Data afkomstig van Stad Gent">
                            <box-icon name='info-circle' ></box-icon>
                        </div>
                    </div>
                    <div class="list-group">
                        <div class="list-group-item p-0 d-flex align-items-center justify-content-between position-relative">
                            <input type="text" name="order" class="form-control list-group-item w-100 border-0" placeholder="Waar wil je bestellen" autocomplete="off" @keyup="filterShopsChange($event)">
                            <label class="form-check mb-0 ms-3 position-absolute end-0 pe-3" style="z-index: 1" v-if="filteredShops && filteredShops.length == 0">
                                <span class="form-check-label text-nowrap">
                                    Hier toch bestellen
                                </span>
                                <input class="form-check-input" type="checkbox" value="restaurantOverride" checked>
                            </label>
                        </div>
                        <template v-if="filteredShops && filteredShops.length != 0">
                            <template v-for="shop in filteredShops.slice(0, 5)">
                                <label class="list-group-item" :key="shop.recordid">
                                    <input class="form-check-input me-1" name="usersExtra" type="radio" :value="shop.recordid">
                                    {{ shop.fields.naam }}
                                </label>
                            </template>
                        </template>
                        <template v-else-if="filteredShops && filteredShops.length == 0">
                            <div class="list-group-item d-flex align-items-center">
                                <p class="mb-0 text-muted">Geen restaurants gevonden met deze naam</p>
                                
                            </div>
                        </template>
                    </div>
                </div>
                <div class="mt-3">
                    <label class="w-100">
                        <div class="form-label">Je bestelling</div>
                        <input type="text" name="order" class="form-control w-100" autocomplete="off" :placeholder="this.latestOrder.id ? `bv. ${this.latestOrder.order}` : 'Wat wil je bestellen'">
                    </label>
                </div>
                <div class="mt-3">
                    <label class="w-100">
                        <div class="form-label">Opmerkingen / wensen</div>
                        <textarea class="form-control" rows="3" :placeholder="this.latestOrder.id && `bv. ${this.latestOrder.comment}`"></textarea>
                    </label>
                </div>
                <input type="hidden" name="reOrder" value="recMJnlY7LxYLtPIg">
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .btn {
        box-icon { 
            fill: white;
        }
    }
    
    .form-control.list-group-item:first-child {
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        z-index: 1;
    }
    
    .form-control.list-group-item:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
        z-index: 1;
    }
</style>

<script>
    import { filterShops, getShops, showLatestOrders } from '../utils'
    import dayjs from 'dayjs';
    
    export default {
        name: 'OrderForm',
        props: {
            msg: String
        },
        data: () => ({
            latestOrders: null,
            selectedPerson: null,
            latestOrder: {},
            currentOrder: null,
            shops: [],
            filteredShops: null
        }),
        async mounted() {
            this.shops = await getShops();
        },
        methods: {
            async onChange ({ target: { value: userID }}) {
                this.selectedPerson = userID;
                this.latestOrders = await showLatestOrders(userID);
                this.latestOrder = { ...this.latestOrders[0] }
            },
            dayjs,
            filterShopsChange ({ target: { value: query = null }}) {
                this.filteredShops = filterShops(this.shops, query)
            },
            selectPreviousOrder (event) {
                const $btn = event.target.closest('button');
                const $currentActive = $btn.parentNode.querySelector('.active');
                
                if ($btn.classList.contains('active')) $btn.classList.remove('active');
                else {
                    $currentActive && $currentActive.classList.remove('active');
                    $btn.classList.add('active');
                }
            }
        }
    }
</script>
