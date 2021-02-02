<template>
    <div class="menu menu--main shadow rounded rounded-3">
        <nav class="menu__list">
            <!-- <router-link class="menu__item" to="/"><box-icon name='dish'></box-icon></router-link> -->
            <router-link class="menu__item" exact to="/today"><box-icon name='dish'></box-icon><span>Overzicht</span></router-link>
            <router-link class="menu__item" exact to="/"><box-icon name='plus-circle'></box-icon><span>Bestel</span></router-link>
            <router-link class="menu__item" exact to="/history"><box-icon name='history'></box-icon><span>Geschiedenis</span></router-link>
            <router-link class="menu__item" exact to="/user"><box-icon name='user-circle'></box-icon><span>Gebruiker</span></router-link>
        </nav>
    </div>
</template>

<style lang="scss">
    .menu {
        &--main {
            $spacing-around: 1.4rem;
            $spacing-around: 0rem;
            position: fixed;
            bottom: $spacing-around;
            left: $spacing-around; right: $spacing-around;
            background: white;
            z-index: 1;
        }
        
        &__list {
            display: flex;
        }
        
        &__item {
            flex-grow: 1;
            display: flex;
            gap: .6rem;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            text-decoration: none;
            color: unset;
            
            box-icon {
                fill: grey;
            }
            
            span {
                font-weight: 500;
                color: grey;
            }
            
            &:hover {
                background-color: #f8fbff;
                color: unset;
                
                box-icon {
                    fill: grey;
                }
                
                span {
                    font-weight: 500;
                }
            }
            
            &.router-link-active {
                background-color: #ecf4ff;
                
                box-icon {
                    fill: var(--bs-blue);
                }
                
                span {
                    color: var(--bs-blue);
                }
            }
        }
    }
</style>

<script>
    export default {
       name: 'Menu' 
    }
</script>