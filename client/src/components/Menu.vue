<template>
    <div class="menu menu--main rounded rounded-3">
        <nav class="menu__list">
            <!-- <router-link class="menu__item" to="/"><box-icon name='dish'></box-icon></router-link> -->
            <router-link class="menu__item" exact to="/today"><box-icon name='dish'></box-icon><span>Vandaag</span></router-link>
            <router-link class="menu__item" exact to="/"><box-icon name='plus-circle'></box-icon><span>Bestel</span></router-link>
            <router-link class="menu__item" to="/history"><box-icon name='history'></box-icon><span>Geschiedenis</span></router-link>
            <router-link class="menu__item" exact to="/user"><box-icon name='user-circle'></box-icon><span>Gebruiker</span></router-link>
        </nav>
    </div>
</template>

<style lang="scss">
    .menu {
        &, * {
            transition: all 1s ease;
        }
        
        &--main {
            $spacing-around: 1.4rem;
            $spacing-around: 0rem;
            position: fixed;
            bottom: $spacing-around;
            left: $spacing-around; right: $spacing-around;
            background: white;
            box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
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
                max-width: 0vw;
                opacity: 0;
                overflow: hidden;
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
                    max-width: 100vw;
                    opacity: 1;
                    
                }
            }
        }
        
        // &:hover {
        //     .menu__item {
        //         span {
        //             max-width: 0vw;
        //             opacity: 0;
        //         }
                
        //         &:hover span {
        //             max-width: 100vw; 
        //             opacity: 1;
        //         }
        //     }
        // }
    }
    
    @media (min-width: 576px) {}
    
    @media (min-width: 768px) {
        .menu {
            &__item {
                span {
                    max-width: 100vw;
                    opacity: 1;
                }
            }
            
            &:hover {
                .menu__item span {
                    max-width: 100vw;
                    opacity: 1;
                }
            }
        }
    }
    
    @media (min-width: 992px) {
        .menu {
            &--main {
                position: relative;
                margin-bottom: 3rem;
                box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.041);
                // box-shadow: none;
                // background-color: #fdfdfd;
                // border: 2px solid #f8f8f8;
                // border: 2px solid #ecf4ff;
                // border: 2px solid #f8fbff;
            }
        }
    }
    
    @media (min-width: 1200px) {}
</style>

<script>
    export default {
       name: 'Menu' 
    }
</script>