<template>
    <div>
        <h1 class="library-title">The Library of Libraries</h1>
    </div>
    <div class="shelf" v-for="shelf in formattedLibrary">
        <div class="shelf-title-box">
            <h2 class="shelf-title">{{shelf[0]}}</h2>
        </div>
        <div class="shelf-inner">
            <div class="section-wrapper" v-for="bookend in shelf[1]" >
                <div class="section-title-box" :style="{ height: scales.maxShelfHeight + 'px'}">
                    <h3 class="section-category">{{ categoryMap.get(libraryDisplay.viewType.bookend)[libraryDisplay.view.bookend] }}</h3>
                    <h3 class="section-value">{{ bookend[0] }}</h3>
                    <div class="section-shelf-box">
                    <!-- Shelf Box DO NOT DELETE -->
                    </div>
                </div>
                    <div class="section-inner" v-for="item in bookend[1]" :style="{ height: scales.maxShelfHeight + 'px'}">
                        <ItemView :item="item" :itemBundle="libraryItemBundle"/>
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


    //Objects passed to Components 
    const libraryItemBundle = computed (() => {
        return {
            yourShelfFunction: addToShelf,
            yourShelfText: 'Add to Shelf',
            labelViewMode: 'label'
        }
    })

    const yourShelfItemBundle = computed (() => {
        return {
            yourShelfFunction: removeFromShelf,
            yourShelfText: 'Remove from Shelf',
            labelViewMode: 'label'
        }
    })


    //Kept due to temporary use in template.
    const isHighlight = ref(false);

</script>

<style lang="scss" scoped>

</style>