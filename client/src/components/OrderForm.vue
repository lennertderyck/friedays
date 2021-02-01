<template>
    <div class="container">
        <div class="shadow-sm rounded py-3 py-md-4 py-lg-5">
            <form @submit="handleSubmit($event)" v-if="!orderFurfilled">
                <div class="px-3 px-md-4 px-lg-5">
                    <h3 class="mb-4">Nieuwe bestelling</h3>
                    <div>
                        <div class="form-label">Voor wie is deze bestelling</div>
                        <select class="form-select" name="user" @change="onChange($event)" required>
                            <option selected disabled>Selecteer een persoon</option>
                            <option v-for="nerd in this.$root.nerds" :key="nerd.id" :value="nerd.id">{{ nerd.firstName }} {{ nerd.lastName }}</option>
                        </select>
                    </div>
                    <div class="mt-4">
                        <div class="form-label">Voeg extra personen toe aan deze bestelling</div>
                        <div v-if="!selectedPerson">
                            <span class="text-muted">Selecteer eerst wie deze bestelling plaatst</span>
                        </div>
                        <div class="list-group" v-else>
                            <div class="list-group-item p-0 d-flex align-items-center justify-content-between position-relative">
                                <input type="text" name="restaurant" class="form-control list-group-item w-100 border-0" placeholder="Zoek een persoon" autocomplete="off" @keyup="filterUsersChange($event)">
                            </div>
                            <template v-for="nerd in filteredExtraUsers.slice(0, 4)">
                                <label class="list-group-item" v-if="selectedPerson !== nerd.id" :key="nerd.id">
                                    <input class="form-check-input me-1" name="usersExtra" type="checkbox" :value="nerd.id" @change="setExtraUser($event, nerd)">
                                    {{ nerd.firstName }} {{ nerd.lastName }}
                                </label>
                            </template>
                        </div>
                        <div class="mt-3" v-if="currentExtraUsers.length !== 0">
                            <div class="form-label text-muted">Extra personen voor deze bestelling</div>
                            <div class="list-group">
                                <template v-for="nerd in currentExtraUsers">
                                    <label class="list-group-item" v-if="selectedPerson !== nerd.id" :key="nerd.id">
                                        <input class="form-check-input me-1" name="usersExtra" type="checkbox" checked :value="nerd.id" @change="setExtraUser($event, nerd)">
                                        {{ nerd.firstName }} {{ nerd.lastName }}
                                    </label>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="latestOrders && latestOrders.length != 0" class="mt-4 bg-light px-3 px-md-4 px-lg-5 py-4">
                    <h5 class="mb-3">Recentste bestellingen</h5>
                    <ul class="list-group">
                        <button type="button" v-for="order in latestOrders.slice(0, 3)" :key="order.id" @click="selectPreviousOrder($event, order)" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                            <p class="mb-0 d-flex flex-column flex-lg-row align-items-lg-center">
                                <span>{{ order.order }}</span>
                                <span class="d-none d-lg-inline">・</span>
                                <span class="opacity-75">besteld op {{ dayjs(order.time).format('DD MMMM') }} bij {{ order.shop ? order.shop.fields.naam : order.otherShop }}</span>
                            </p>
                            <div class="d-flex align-items-center">
                                <span class="d-none d-lg-inline">opnieuw bestellen</span>
                                <box-icon name='redo' class="ms-1"></box-icon>
                            </div>
                        </button>
                    </ul>
                </div>
                <div class="px-3 px-md-4 px-lg-5">
                    <div class="mt-4">
                        <div class="form-label d-flex align-items-center">
                            Restaurant 
                            <div class="ms-1" tabindex="0" data-bs-toggle="popover" data-bs-content="Data afkomstig van Stad Gent">
                                <box-icon name='info-circle' ></box-icon>
                            </div>
                        </div>
                        <div class="list-group" v-if="!reOrderData">
                            <div class="list-group-item p-0 d-flex align-items-center justify-content-between position-relative">
                                <input type="text" name="restaurant" class="form-control list-group-item w-100 border-0" placeholder="Waar wil je bestellen" autocomplete="off" @keyup="filterShopsChange($event)">
                                <label class="form-check mb-0 ms-3 position-absolute end-0 pe-3" style="z-index: 1" v-if="filteredShops && filteredShops.length == 0">
                                    <span class="form-check-label text-nowrap">
                                        Hier toch bestellen
                                    </span>
                                    <input class="form-check-input" type="checkbox" name="restaurantOverride" checked>
                                </label>
                            </div>
                            <template v-if="filteredShops && filteredShops.length != 0">
                                <template v-for="shop in filteredShops.slice(0, 5)">
                                    <label class="list-group-item" :key="shop.recordid">
                                        <input class="form-check-input me-1" name="shop" type="radio" :value="shop.recordid">
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
                        <div v-else>
                            <strong v-if="reOrderData.shop">{{ reOrderData.shop.fields.naam }}</strong>
                            <strong v-else>{{ reOrderData.otherShop }}</strong>
                        </div>
                    </div>
                    <div class="mt-4">
                        <label class="w-100">
                            <div class="form-label">Je bestelling</div>
                            <input type="text" name="order" class="form-control w-100" autocomplete="off" required :value="reOrderData && reOrderData.order" :placeholder="this.latestOrder.id ? `bv. ${this.latestOrder.order}` : 'Wat wil je bestellen'">
                        </label>
                    </div>
                    <div class="mt-4">
                        <label class="w-100">
                            <div class="form-label">Opmerkingen / wensen</div>
                            <textarea class="form-control" rows="3" name="comment" :value="reOrderData && reOrderData.comment" :placeholder="this.latestOrder.id && `bv. ${this.latestOrder.comment}`"></textarea>
                        </label>
                    </div>
                </div>
                <input type="hidden" name="reOrder" :value="reOrderData.id" v-if="reOrderData">
                <div class="px-5">
                    <button type="submit" class="btn btn-primary mt-3 d-block">Bestellen</button>
                </div>
            </form>
            <div v-else>
                <h3 class="text-center">Bestelling is verstuurd!</h3>
                <a href="/" class="btn btn-primary d-block mx-auto">Nieuwe bestelling plaatsen</a>
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
 /* eslint-disable */
    import { filterShops, getShops, showLatestOrders, placeOrder, filterPersons, checkExtraUser, unCheckExtraUser } from '../utils'
    import dayjs from 'dayjs';
    import { getFormData } from 'cutleryjs';
    
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
            currentExtraUsers: [],
            shops: [],
            filteredShops: null,
            filteredExtraUsers: [],
            reOrderData: null,
            orderFurfilled: false
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
            filterUsersChange ({ target: { value: query = null }}) {
                if (query === '') this.filteredExtraUsers = [];
                else this.filteredExtraUsers = filterPersons(this.$root.nerds, query);
            },
            filterShopsChange ({ target: { value: query = null }}) {
                if (query === '') this.filteredShops = null;
                else this.filteredShops = filterShops(this.shops, query)
            },
            setExtraUser ({ target: { value: userID, checked }}, userData) {
                if (checked) {
                    this.filteredExtraUsers = this.filteredExtraUsers.filter(({ id }) => id !== userID);
                    this.$root.nerds = this.$root.nerds.filter(({ id }) => id !== userID);
                    this.currentExtraUsers.push(userData)
                } else {
                    this.$root.nerds.push(userData);
                    this.filteredExtraUsers.push(userData);
                    this.currentExtraUsers = this.currentExtraUsers.filter(({ id }) => id !== userID);
                }
            },
            selectPreviousOrder (event, orderID) {
                const $btn = event.target.closest('button');
                const $currentActive = $btn.parentNode.querySelector('.active');
                
                if ($btn.classList.contains('active')) {
                    $btn.classList.remove('active')
                    this.reOrderData = null;
                } else {
                    $currentActive && $currentActive.classList.remove('active');
                    $btn.classList.add('active');
                    this.reOrderData = orderID;
                }
            },
            async handleSubmit (event) {
                event.preventDefault();
                const formData = getFormData(event.target);
                
                const { 
                    user, usersExtra = [], restaurant, restaurantOverride, reOrder, 
                    shop = this.reOrderData && this.reOrderData.shop && this.reOrderData.shop.recordid,
                    ...otherValues 
                } = Object.fromEntries(formData)
                
                const result = {
                    users: [formData.get('user'), ...usersExtra],
                    shop,
                    otherShop: restaurantOverride && restaurant || this.reOrderData && !this.reOrderData.shop && this.reOrderData.otherShop || undefined,
                    ...otherValues
                }
                const orderStatus = await placeOrder(result);
                this.orderFurfilled = true;
            },
            resetForm () {
                this.latestOrders = null,
                this.selectedPerson = null,
                this.latestOrder = {},
                this.currentOrder = null,
                this.currentExtraUsers = [],
                this.shops = [],
                this.filteredShops = null,
                this.filteredExtraUsers = [],
                this.reOrderData = null,
                this.orderFurfilled = false
            }
        }
    }
</script>
