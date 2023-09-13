<template>
        <VMenu
            placement="top" 
            :delay="{ show: 50, hide: 200 }"
        >
            <div class="item" v-on="itemHandlers" :style="{ height: itemHeight(handleNumeric(item[libraryDisplay.view.height])) + 'px' , background: itemColour(handleColour(item)),
            width:scales.minItemWidth + 'px'}" :class="{lowlight: isHighlight}">
            <div class="item-value">
                <p >{{ item[libraryDisplay.view.label] }}</p>
            </div>
            </div>
            <template #popper>
                <div>
                <div class="item-menu-header-container">
                    <h2 class="item-menu-header">{{ libraryDisplay.view.itemType }}</h2>
                    <h2 class="item-menu-subheader"> 
                        {{ categoryMap.get(libraryDisplay.view.itemType)[libraryDisplay.view.menuSubHeader] }}
                        {{ item[libraryDisplay.view.menuSubHeader] }}
                    </h2>
                </div>
                <div class="item-menu">
                    <div class="shelf-button-wrapper">
                        <button class="shelf-button" @click="itemBundle.yourShelfFunction(item)">{{itemBundle.yourShelfText}}</button>
                    </div>
                    <ul>
                        <li>
                            <h4>{{categoryMap.get(libraryDisplay.view.itemType)[libraryDisplay.view.shelf]}}</h4>
                            <p>{{ item[libraryDisplay.view.shelf] }}</p>
                        </li>
                        <li>
                            <h4>{{categoryMap.get(libraryDisplay.view.itemType)[libraryDisplay.view.bookend]}}</h4>    
                            <p>{{ item[libraryDisplay.view.bookend] }}</p>
                        </li>
                        <li>
                            <h4>{{categoryMap.get(libraryDisplay.view.itemType)[libraryDisplay.view.label]}}</h4>    
                            <p>{{ item[libraryDisplay.view.label] }}</p>
                        </li>
                        <li>
                            <h4>{{ categoryMap.get(libraryDisplay.view.itemType)[libraryDisplay.view.subMenuCategory1] }}</h4>    
                            <p>{{ item[libraryDisplay.view.subMenuCategory1] }}</p>
                        </li>
                        <li>
                            <h4>{{ categoryMap.get(libraryDisplay.view.itemType)[libraryDisplay.view.subMenuCategory2] }}</h4>    
                            <template v-for="(genre, i) in item['Genre/Identity']">
                                <span>{{genre}}</span>{{ i < item['Genre/Identity'].length -1 ? ', ': '' }}
                            </template>
                        </li>
                        <li>
                            <h4>{{ categoryMap.get(libraryDisplay.view.itemType)[libraryDisplay.view.subMenuCategory3] }}</h4>    
                                <p>{{item[libraryDisplay.view.subMenuCategory3].length}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            </template>
        </VMenu>
        <div class="section-shelf-box">
        <!-- Shelf Box DO NOT DELETE -->
        </div>


</template>

<script setup>
    import * as d3 from "d3";
    import FloatingVue from 'floating-vue'
    import 'floating-vue/dist/style.css'
    import { storeToRefs } from "pinia";

    //Props
    const {item, itemBundle} = defineProps(['item', 'itemBundle']);

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

    //Reference Constants
    const referenceStore = useReferenceStore();
    const { categoryMap, 
            invCategoryMap, 
            scales } = storeToRefs(referenceStore)


    // COMPOPSABLES
    //Utility Functions
    const { handleNumeric } = useUtils();


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