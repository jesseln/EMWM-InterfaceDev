<template>
    <div class="yourShelf-title-box">
        <h2 class="yourShelf-title">Design Your Library View</h2>
        <p class="yourShelf-description">The library view can be altered to suit your queries.</p>
    </div>
    <div class="view-wrapper">
        <div class="view-facet-title-box">
            <h2 class="view-facet-title">Item Labels</h2>
            <p class="view-facet-description">Select the category to use as a label for each item.</p>
            <ViewSelector :viewMode="'label'"/>
        </div>
    <div class="shelf-inner">
        <div class="view-section-wrapper" >
                <div class="section-inner" v-for="item in viewHeightBounds" :style="{ height: scales.maxShelfHeight + 'px'}">
                    <ItemView :item="item" :itemBundle="viewEditItemBundle"/>
                </div>
        </div>
    </div>
</div>
<div class="view-wrapper">
    <div class="view-facet-title-box">
        <h2 class="view-facet-title">Item Height</h2>
        <p class="view-facet-description">Select the category which changes the height of each item.</p>
        <ViewSelector :viewMode="'height'"/>
    </div>
    <div class="shelf-inner">
        <div class="view-section-wrapper" >
            <!-- <div class="section-outer"> -->
            <div class="section-title-box" :style="{ height: scales.maxShelfHeight + 'px'}">
                <h3 class="view-section-category">Lowest Value </h3>
                <h3 class="view-section-value">{{ `"${getIDP(viewHeightBounds[0], 'height')}"` }}</h3>
                <div class="section-shelf-box">
                <!-- Shelf Box DO NOT DELETE -->
                </div>
            </div>
                <div class="section-inner" v-for="item in viewHeightBounds" :style="{ height: scales.maxShelfHeight + 'px'}">
                    <ItemView :item="item" :itemBundle="viewEditItemBundle"/>
                </div>
                <div class="view-section-title-box-rhs" :style="{ height: scales.maxShelfHeight + 'px'}">
                <h3 class="view-section-category">Highest Value </h3>
                <h3 class="view-section-value">{{ `"${getIDP(viewHeightBounds[1], 'height')}"` }}</h3>
                <div class="section-shelf-box">
                <!-- Shelf Box DO NOT DELETE -->
                </div>
            </div>
        </div>
    </div>
    </div>
    <div class="view-wrapper">
    <div class="view-facet-title-box">
        <h2 class="view-facet-title">Item Arrangement</h2>
        <p class="view-facet-description">Select the category which orders the items on the shelf.</p>
        <ViewSelector :viewMode="'bookend'"/>
            <p class="view-facet-description">Do you want to see the category titles on the shelf?</p>
    </div>
    <!-- Add bookend here afterwards, create array -->
    <div class="shelf-inner">
        <div class="view-section-wrapper" >
                <div class="section-inner" v-for="item in viewHeightBounds" :style="{ height: scales.maxShelfHeight + 'px'}">
                    <ItemView :item="item" :itemBundle="viewEditItemBundle"/>
                </div>
        </div>
    </div>
    </div>
    <div class="view-wrapper">
    <div class="view-facet-title-box">
        <h2 class="view-facet-title">Item Colour</h2>
        <p class="view-facet-description">Select the category which sets the colours for each item.</p>
        <ViewSelector :viewMode="'colour'"/>
    </div>
    <div class="shelf-inner">
        <div class="view-section-wrapper" >
            <div class="section-title-box" :style="{ height: scales.maxShelfHeight + 'px'}">
                <h3 class="yourShelf-section-category">Unique Categories</h3>
                <h3 class="yourShelf-section-value">{{ viewColourSet.length }}</h3>
                <div class="section-shelf-box">
                <!-- Shelf Box DO NOT DELETE -->
                </div>
            </div>
                <div class="section-inner" v-for="item in  viewColourSet" :style="{ height: scales.maxShelfHeight + 'px'}">
                    <ItemView :item="item" :itemBundle="viewColourItemBundle"/>
                </div>
        </div>
    </div>
    </div>
    <div class="view-wrapper">
    <div class="view-facet-title-box">
        <h2 class="view-facet-title">Item Shelves</h2>
        <p class="view-facet-description">Select the category which divides the items into different shelves.</p>
        <ViewSelector :viewMode="'shelf'"/>
    </div>
    <div class="shelf-inner">
        <div class="view-section-wrapper" >
                <div class="section-inner" v-for="item in viewHeightBounds" :style="{ height: scales.maxShelfHeight + 'px'}">
                    <ItemView :item="item" :itemBundle="viewEditItemBundle"/>
                </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

//Props
// const {viewMode} = defineProps(['viewMode']);

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

//Bundle Object passed to Components
const viewEditItemBundle = computed (() => {
        return {
            yourShelfFunction: addToShelf,
            yourShelfText: 'Add to Shelf',
            labelViewMode: 'label'
        }
    })

const viewColourItemBundle = computed (() => {
    return {
        yourShelfFunction: addToShelf,
        yourShelfText: 'Add to Shelf',
        labelViewMode: 'colour'
    }
})



</script>

<style scoped>

</style>