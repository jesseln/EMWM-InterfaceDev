<template>
    <div class="library-wrapper">
 <!-- Your Shelf -->
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
        <div class="shelf-separator-container">
            <div class="shelf-separator">
                <!-- Your Shelf Separator -->
            </div>
        </div>
        <!-- View Designer Shelf -->
        <div class="yourShelf-title-box">
                <h2 class="yourShelf-title">Design Your Library View</h2>
                <p class="yourShelf-description">The library view can be altered to suit your queries.</p>
            </div>
            <div class="view-wrapper">
                <div class="view-facet-title-box">
                    <h2 class="view-facet-title">Item Labels</h2>
                    <p class="view-facet-description">Select the category to use as a label for each item.</p>
                    <EditSelection :viewMode="'label'"/>
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
                <EditSelection :viewMode="'height'"/>
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
                <EditSelection :viewMode="'bookend'"/>
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
                <EditSelection :viewMode="'colour'"/>
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
                <EditSelection :viewMode="'shelf'"/>
            </div>
            <div class="shelf-inner">
                <div class="view-section-wrapper" >
                        <div class="section-inner" v-for="item in viewHeightBounds" :style="{ height: scales.maxShelfHeight + 'px'}">
                            <ItemView :item="item" :itemBundle="viewEditItemBundle"/>
                        </div>
                </div>
            </div>
            </div>
        <div class="shelf-separator-container">
            <div class="shelf-separator">
                <!-- Your Shelf Separator -->
            </div>
        </div>
        <button ref="toTopButton" @click="scrollToTop" class="to-top-button">
            ☝️
        </button>
        <!-- The Library -->
        <div>
            <h1 class="library-title">The Library of Libraries</h1>
        </div>
        <div class="shelf" v-for="shelf in formattedLibrary">
            <div class="shelf-title-box">
                <h2 class="shelf-title">{{shelf[0]}}</h2>
            </div>
            <div class="shelf-inner">
                <div class="section-wrapper" v-for="bookend in shelf[1]" >
                    <!-- <div class="section-outer"> -->
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


    // COMPOPSABLES
    //Utility Functions
    const { handleNumeric } = useUtils();

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




    //Kept due to temporary use in template.
    const isHighlight = ref(false);

    // TESTERS
    // function testFunction(data, viewMode){
    //     console.log('testFunction', getIDP(data[0], viewMode))
    //     return 
    // }

    // TEST FUNCTION CALL  //
    // testFunction(parsedData.value, 'colour')
  


    // To Top Button
    const toTopButton = ref();
    const userScroll = () => {
      if (window.scrollY > 550) {
        toTopButton.value.classList.add("showButton");
        console.log('scrolled');
      } else {
        toTopButton.value.classList.remove("showButton");
        console.log('top');
      }
    };
    onMounted(() => {
      window.addEventListener("scroll", userScroll);
    });
    onBeforeMount(() => {
      window.removeEventListener("scroll", userScroll);
    });
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


</script>

<style lang="scss" scoped>

</style>