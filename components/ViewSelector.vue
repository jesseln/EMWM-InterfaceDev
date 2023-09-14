<template>
    <VMenu
        placement="bottom" 
        :delay="{ show: 50, hide: 200 }"
    > 
        <div class="shelf-button-wrapper">
                <button class="shelf-button">
                    <p>{{libraryDisplay.viewType[viewMode]}}</p>
                    <p>></p>
                    <p>{{categoryMap.get(libraryDisplay.viewType[viewMode])[libraryDisplay.view[viewMode]]}}</p>
                </button>
        </div>
        <template #popper>
            <div>
            <div class="item-menu">
                <div class="item-menu-header-container">
                <h2 class="item-menu-header">Item Type</h2>
                <h2 class="item-menu-subheader"> 
                    <!--  -->
                </h2>
            </div>
                <ul>
                    <li v-for=" itemType in categoryMap.keys()">
                        <VMenu
                            placement="right" 
                            :delay="{ show: 50, hide: 200 }"
                        >  
                            <div class="item-menu">
                                <div class="shelf-button-wrapper">
                                    <button class="shelf-button" >
                                        <h4>{{itemType}}</h4>
                                    </button>
                                </div>
                            </div>
                            <template #popper>
                                <ul>
                                    <li v-for=" category in categoryMap.get(itemType)"> 
                                        <div class="item-menu">
                                            <div class="shelf-button-wrapper">
                                                <button class="shelf-button" @click="handleViewSelection(viewMode, invCategoryMap.get(itemType)[category], itemType)">
                                                    <h4>{{category}}</h4>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </template>
                        </VMenu>
                    </li>
                </ul>
            </div>
        </div>
        </template>
    </VMenu>
</template>

<script setup>
import * as d3 from "d3";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import { storeToRefs } from "pinia";

//Props
const {viewMode} = defineProps(['viewMode']);

// STATE MANAGERS IMPORT //    
//View State
const viewStore = useViewStore();
const { libraryData,
        libraryDisplay,
        formattedLibrary, 
        itemHeight,
        itemColour, 
        viewHeightBounds, 
        viewColourSet } = storeToRefs(viewStore)
const { parseDatabase,
        handleViewSelection,
        getIDP,
        handleColour } = useViewStore();
    
//Your Shelf State
const yourShelfStore = useYourShelfStore();
const { yourShelf }  = storeToRefs(yourShelfStore)
const { addToShelf, 
        removeFromShelf } = useYourShelfStore();

//Reference Constants
const referenceStore = useReferenceStore();
const { categoryMap, 
        invCategoryMap, 
        scales } = storeToRefs(referenceStore)


//Kept due to temporary use in template.
const isHighlight = ref(false);

// Event Handlers
const itemHandlers = {
  mouseover: handleMouseOver,
  mouseout: handleMouseOut
}

function handleMouseOver(d) {
    d3.select(d.currentTarget)
        .style('transform', getUpPos(d.currentTarget, true));
}

function handleMouseOut(d) {
    d3.select(d.currentTarget)
        .style('transform', getUpPos(d.currentTarget, false));
}

function getUpPos(elm, isUp) {
    if( elm.classList.contains('item')){
    return `translate(0, ${(isUp ? -10 : 0)}px)`
    }
}

</script>

<style scoped>

</style>