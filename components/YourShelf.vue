<template>
    <div class="shelf yourShelf" >
        <div class="yourShelf-title-box">
            <h2 class="yourShelf-title">Your Shelf</h2>
            <p class="yourShelf-description">Items can be added to your shelf by selecting an item in the library, and clicking Add to Shelf.</p>
        </div>
        <div class="shelf-inner">
            <div class="section-wrapper" >
                <!-- <div class="section-outer"> -->
                <div class="section-title-box" :style="{ height: scales.maxShelfHeight + 'px'}">
                    <h3 class="yourShelf-section-category">Items on your shelf</h3>
                    <h3 class="yourShelf-section-value">{{ yourShelf ? yourShelf.length : 0 }}</h3>
                    <div class="section-shelf-box">
                    <!-- Shelf Box DO NOT DELETE -->
                    </div>
                </div>
                    <div class="section-inner" v-for="item in yourShelf" :style="{ height: scales.maxShelfHeight + 'px'}">
                        <ItemView :item="item" :itemBundle="yourShelfItemBundle"/>
                    </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { storeToRefs } from "pinia";
   
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
            getIDP } = useViewStore();
        
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

    //Bundle Object passed to Components
    const yourShelfItemBundle = computed (() => {
        return {
            yourShelfFunction: removeFromShelf,
            yourShelfText: 'Remove from Shelf',
            labelViewMode: 'label'
        }
    })


</script>

<style lang="scss" scoped>

</style>