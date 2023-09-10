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
                    <div class="section-title-box" :style="{ height: maxShelfHeight + 'px'}">
                        <h3 class="yourShelf-section-category">Items on your shelf</h3>
                        <h3 class="yourShelf-section-value">{{ yourShelf.length }}</h3>
                        <div class="section-shelf-box">
                        <!-- Shelf Box DO NOT DELETE -->
                        </div>
                    </div>
                        <div class="section-inner" v-for="item in yourShelf" :style="{ height: maxShelfHeight + 'px'}">
                          
                                <VMenu
                                    placement="top" 
                                    :delay="{ show: 50, hide: 200 }"
                                >
                                    <div class="item" v-on="itemHandlers" :style="{ height: itemHeight(handleNumeric(item[libraryView.height])) + 'px' , background: itemColour(handleColour(item, libraryView.colour)),
                                    width: minItemWidth + 'px'}" :class="{lowlight: isHighlight}">
                                    <div class="item-value">
                                        <p >{{ item[libraryView.label] }}</p>
                                    </div>
                                    </div>
                                    <template #popper>
                                        <div>
                                        <div class="item-menu-header-container">
                                            <h2 class="item-menu-header">{{ libraryView.itemType }}</h2>
                                            <h2 class="item-menu-subheader"> 
                                                {{ libraryLabels.get(libraryView.itemType)[libraryView.menuSubHeader] }}
                                                {{ item[libraryView.menuSubHeader] }}
                                            </h2>
                                        </div>
                                        <div class="item-menu">
                                            <div class="shelf-button-wrapper">
                                                <button class="shelf-button" @click="yourShelfStore.removeFromShelf(item, item.itemType)">Remove from Shelf</button>
                                            </div>
                                            <ul>
                                                <li>
                                                    <h4>{{libraryLabels.get(libraryView.itemType)[libraryView.shelf]}}</h4>
                                                    <p>{{ item[libraryView.shelf] }}</p>
                                                </li>
                                                <li>
                                                    <h4>{{libraryLabels.get(libraryView.itemType)[libraryView.bookend]}}</h4>    
                                                    <p>{{ item[libraryView.bookend] }}</p>
                                                </li>
                                                <li>
                                                    <h4>{{libraryLabels.get(libraryView.itemType)[libraryView.label]}}</h4>    
                                                    <p>{{ item[libraryView.label] }}</p>
                                                </li>
                                                <li>
                                                    <h4>{{ libraryLabels.get(libraryView.itemType)[libraryView.subMenuCategory1] }}</h4>    
                                                    <p>{{ item[libraryView.subMenuCategory1] }}</p>
                                                </li>
                                                <li>
                                                    <h4>{{ libraryLabels.get(libraryView.itemType)[libraryView.subMenuCategory2] }}</h4>    
                                                    <template v-for="(genre, i) in item['Genre/Identity']">
                                                        <span>{{genre}}</span>{{ i < item['Genre/Identity'].length -1 ? ', ': '' }}
                                                    </template>
                                                </li>
                                                <li>
                                                    <h4>{{ libraryLabels.get(libraryView.itemType)[libraryView.subMenuCategory3] }}</h4>    
                                                        <p>{{item[libraryView.subMenuCategory3].length}}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    </template>
                                </VMenu>
                                <div class="section-shelf-box">
                                <!-- Shelf Box DO NOT DELETE -->
                                </div>
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
                    <VMenu
                        placement="bottom" 
                        :delay="{ show: 50, hide: 200 }"
                    > 
                        <div class="shelf-button-wrapper">
                                <button class="shelf-button">
                                    <p>{{libraryView.viewTableLookUp.label}}</p>
                                    <p>></p>
                                    <p>{{libraryLabels.get(libraryView.viewTableLookUp.label)[libraryView.label]}}</p>
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
                                    <li v-for=" itemType in libraryLabels.keys()">
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
                                                    <li v-for=" category in libraryLabels.get(itemType)"> 
                                                        <div class="item-menu">
                                                            <div class="shelf-button-wrapper">
                                                                <button class="shelf-button" @click="handleViewSelection('label', invLibraryLabels.get(itemType)[category], itemType)">
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
                </div>
            <div class="shelf-inner">
                <div class="view-section-wrapper" >
                        <div class="section-inner" v-for="item in viewHeightBounds" :style="{ height: maxShelfHeight + 'px'}">
                                    <div class="item" v-on="itemHandlers" :style="{ height: itemHeight(handleNumeric(item[libraryView.height])) + 'px' , background: itemColour(handleColour(item, libraryView.colour)),
                                    width: minItemWidth + 'px'}" :class="{lowlight: isHighlight}">
                                    <div class="item-value">
                                        <p >{{ item[libraryView.label] }}</p>
                                    </div>
                                    </div>
                                <div class="section-shelf-box">
                                <!-- Shelf Box DO NOT DELETE -->
                                </div>
                        </div>
                </div>
            </div>
        </div>
        <div class="view-wrapper">
            <div class="view-facet-title-box">
                <h2 class="view-facet-title">Item Height</h2>
                <p class="view-facet-description">Select the category which changes the height of each item.</p>
                <VMenu
                        placement="bottom" 
                        :delay="{ show: 50, hide: 200 }"
                    > 
                        <div class="shelf-button-wrapper">
                                <button class="shelf-button">
                                    <p>{{libraryView.viewTableLookUp.height}}</p>
                                    <p>></p>
                                    <p>{{libraryLabels.get(libraryView.viewTableLookUp.height)[libraryView.height]}}</p>
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
                                    <li v-for=" itemType in libraryLabels.keys()">
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
                                                    <li v-for=" category in libraryLabels.get(itemType)"> 
                                                        <div class="item-menu">
                                                            <div class="shelf-button-wrapper">
                                                                <button class="shelf-button" @click="handleViewSelection('height', invLibraryLabels.get(itemType)[category], itemType)">
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
            </div>
            <div class="shelf-inner">
                <div class="view-section-wrapper" >
                    <!-- <div class="section-outer"> -->
                    <div class="section-title-box" :style="{ height: maxShelfHeight + 'px'}">
                        <h3 class="view-section-category">Lowest Value </h3>
                        <h3 class="view-section-value">{{ `"${viewHeightBounds[0][libraryView.height]}"` }}</h3>
                        <div class="section-shelf-box">
                        <!-- Shelf Box DO NOT DELETE -->
                        </div>
                    </div>
                        <div class="section-inner" v-for="item in viewHeightBounds" :style="{ height: maxShelfHeight + 'px'}">
                                    <div class="item" v-on="itemHandlers" :style="{ height: itemHeight(handleNumeric(item[libraryView.height])) + 'px' , background: itemColour(handleColour(item, libraryView.colour)),
                                    width: minItemWidth + 'px'}" :class="{lowlight: isHighlight}">
                                    <div class="item-value">
                                        <p >{{ item[libraryView.label] }}</p>
                                    </div>
                                    </div>
                                <div class="section-shelf-box">
                                <!-- Shelf Box DO NOT DELETE -->
                                </div>
                        </div>
                        <div class="view-section-title-box-rhs" :style="{ height: maxShelfHeight + 'px'}">
                        <h3 class="view-section-category">Highest Value </h3>
                        <h3 class="view-section-value">{{ `"${viewHeightBounds[1][libraryView.height]}"` }}</h3>
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
                <VMenu
                        placement="bottom" 
                        :delay="{ show: 50, hide: 200 }"
                    > 
                        <div class="shelf-button-wrapper">
                                <button class="shelf-button">
                                    <p>{{libraryView.viewTableLookUp.bookend}}</p>
                                    <p>></p>
                                    <p>{{libraryLabels.get(libraryView.viewTableLookUp.bookend)[libraryView.bookend]}}</p>
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
                                    <li v-for=" itemType in libraryLabels.keys()">
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
                                                    <li v-for=" category in libraryLabels.get(itemType)"> 
                                                        <div class="item-menu">
                                                            <div class="shelf-button-wrapper">
                                                                <button class="shelf-button" @click="handleViewSelection('bookend', invLibraryLabels.get(itemType)[category], itemType)">
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
                    <p class="view-facet-description">Do you want to see the category titles on the shelf?</p>
            </div>
            <!-- Add bookend here afterwards, create array -->
            <div class="shelf-inner">
                <div class="view-section-wrapper" >
                        <div class="section-inner" v-for="item in viewHeightBounds" :style="{ height: maxShelfHeight + 'px'}">
                                    <div class="item" v-on="itemHandlers" :style="{ height: itemHeight(handleNumeric(item[libraryView.height])) + 'px' , background: itemColour(handleColour(item, libraryView.colour)),
                                    width: minItemWidth + 'px'}" :class="{lowlight: isHighlight}">
                                    <div class="item-value">
                                        <p >{{ item[libraryView.label] }}</p>
                                    </div>
                                    </div>
                                <div class="section-shelf-box">
                                <!-- Shelf Box DO NOT DELETE -->
                                </div>
                        </div>
                </div>
            </div>
            </div>
            <div class="view-wrapper">
            <div class="view-facet-title-box">
                <h2 class="view-facet-title">Item Colour</h2>
                <p class="view-facet-description">Select the category which sets the colours for each item.</p>
                <VMenu
                        placement="bottom" 
                        :delay="{ show: 50, hide: 200 }"
                    > 
                        <div class="shelf-button-wrapper">
                                <button class="shelf-button">
                                    <p>{{libraryView.viewTableLookUp.colour}}</p>
                                    <p>></p>
                                    <p>{{libraryLabels.get(libraryView.viewTableLookUp.colour)[libraryView.colour]}}</p>
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
                                    <li v-for=" itemType in libraryLabels.keys()">
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
                                                    <li v-for=" category in libraryLabels.get(itemType)"> 
                                                        <div class="item-menu">
                                                            <div class="shelf-button-wrapper">
                                                                <button class="shelf-button" @click="handleViewSelection('colour', invLibraryLabels.get(itemType)[category], itemType)">
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
            </div>
            <div class="shelf-inner">
                <div class="view-section-wrapper" >
                    <div class="section-title-box" :style="{ height: maxShelfHeight + 'px'}">
                        <h3 class="yourShelf-section-category">Unique Categories</h3>
                        <h3 class="yourShelf-section-value">{{ viewColourSet.length }}</h3>
                        <div class="section-shelf-box">
                        <!-- Shelf Box DO NOT DELETE -->
                        </div>
                    </div>
                        <div class="section-inner" v-for="item in  viewColourSet" :style="{ height: maxShelfHeight + 'px'}">
                                    <div class="item" v-on="itemHandlers" :style="{ height: itemHeight(handleNumeric(item[libraryView.height])) + 'px' , background: itemColour(handleColour(item, libraryView.colour)),
                                    width: minItemWidth + 'px'}" :class="{lowlight: isHighlight}">
                                    <div class="item-value">
                                        <p >{{ item[libraryView.colour] ? handleColour(item, libraryView.colour) : "No Value" }}</p>
                                    </div>
                                    </div>
                                <div class="section-shelf-box">
                                <!-- Shelf Box DO NOT DELETE -->
                                </div>
                        </div>
                </div>
            </div>
            </div>
            <div class="view-wrapper">
            <div class="view-facet-title-box">
                <h2 class="view-facet-title">Item Shelves</h2>
                <p class="view-facet-description">Select the category which divides the items into different shelves.</p>
                <VMenu
                        placement="bottom" 
                        :delay="{ show: 50, hide: 200 }"
                    > 
                        <div class="shelf-button-wrapper">
                                <button class="shelf-button">
                                    <p>{{libraryView.viewTableLookUp.shelf}}</p>
                                    <p>></p>
                                    <p>{{libraryLabels.get(libraryView.viewTableLookUp.shelf)[libraryView.shelf]}}</p>
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
                                    <li v-for=" itemType in libraryLabels.keys()">
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
                                                    <li v-for=" category in libraryLabels.get(itemType)"> 
                                                        <div class="item-menu">
                                                            <div class="shelf-button-wrapper">
                                                                <button class="shelf-button" @click="handleViewSelection('shelf', invLibraryLabels.get(itemType)[category], itemType)">
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
            </div>
            <div class="shelf-inner">
                <div class="view-section-wrapper" >
                        <div class="section-inner" v-for="item in viewHeightBounds" :style="{ height: maxShelfHeight + 'px'}">
                                    <div class="item" v-on="itemHandlers" :style="{ height: itemHeight(handleNumeric(item[libraryView.height])) + 'px' , background: itemColour(handleColour(item, libraryView.colour)),
                                    width: minItemWidth + 'px'}" :class="{lowlight: isHighlight}">
                                    <div class="item-value">
                                        <p >{{ item[libraryView.label] }}</p>
                                    </div>
                                    </div>
                                <div class="section-shelf-box">
                                <!-- Shelf Box DO NOT DELETE -->
                                </div>
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
        <div class="shelf" v-for="shelf in mainLibrary">
            <div class="shelf-title-box">
                <h2 class="shelf-title">{{shelf[0]}}</h2>
            </div>
            <div class="shelf-inner">
                <div class="section-wrapper" v-for="bookend in shelf[1]" >
                    <!-- <div class="section-outer"> -->
                    <div class="section-title-box" :style="{ height: maxShelfHeight + 'px'}">
                        <h3 class="section-category">{{ libraryLabels.get(libraryView.itemType)[libraryView.bookend] }}</h3>
                        <h3 class="section-value">{{ bookend[0] }}</h3>
                        <div class="section-shelf-box">
                        <!-- Shelf Box DO NOT DELETE -->
                        </div>
                    </div>
                        <div class="section-inner" v-for="item in bookend[1]" :style="{ height: maxShelfHeight + 'px'}">
                          
                                <VMenu
                                    placement="top" 
                                    :delay="{ show: 50, hide: 200 }"
                                >
                                    <div class="item" v-on="itemHandlers" :style="{ height: itemHeight(handleNumeric(item[libraryView.height])) + 'px' , background: itemColour(handleColour(item, libraryView.colour)),
                                    width: minItemWidth + 'px'}" :class="{lowlight: isHighlight}">
                                    <div class="item-value">
                                        <p >{{ item[libraryView.label] }}</p>
                                    </div>
                                    </div>
                                    <template #popper>
                                        <div>
                                        <div class="item-menu-header-container">
                                            <h2 class="item-menu-header">{{ libraryView.itemType }}</h2>
                                            <h2 class="item-menu-subheader"> 
                                                {{ libraryLabels.get(libraryView.itemType)[libraryView.menuSubHeader] }}
                                                {{ item[libraryView.menuSubHeader] }}
                                            </h2>
                                        </div>
                                        <div class="item-menu">
                                            <div class="shelf-button-wrapper">
                                                <button class="shelf-button" @click="yourShelfStore.addToShelf(item, item.itemType)">Add to Shelf</button>
                                            </div>
                                            <ul>
                                                <li>
                                                    <h4>{{libraryLabels.get(libraryView.itemType)[libraryView.shelf]}}</h4>
                                                    <p>{{ item[libraryView.shelf] }}</p>
                                                </li>
                                                <li>
                                                    <h4>{{libraryLabels.get(libraryView.itemType)[libraryView.bookend]}}</h4>    
                                                    <p>{{ item[libraryView.bookend] }}</p>
                                                </li>
                                                <li>
                                                    <h4>{{libraryLabels.get(libraryView.itemType)[libraryView.label]}}</h4>    
                                                    <p>{{ item[libraryView.label] }}</p>
                                                </li>
                                                <li>
                                                    <h4>{{ libraryLabels.get(libraryView.itemType)[libraryView.subMenuCategory1] }}</h4>    
                                                    <p>{{ item[libraryView.subMenuCategory1] }}</p>
                                                </li>
                                                <li>
                                                    <h4>{{ libraryLabels.get(libraryView.itemType)[libraryView.subMenuCategory2] }}</h4>    
                                                    <template v-for="(genre, i) in item['Genre/Identity']">
                                                        <span>{{genre}}</span>{{ i < item['Genre/Identity'].length -1 ? ', ': '' }}
                                                    </template>
                                                </li>
                                                <li>
                                                    <h4>{{ libraryLabels.get(libraryView.itemType)[libraryView.subMenuCategory3] }}</h4>    
                                                        <p>{{item[libraryView.subMenuCategory3].length}}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    </template>
                                </VMenu>
                                <div class="section-shelf-box">
                                <!-- Shelf Box DO NOT DELETE -->
                                </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import * as d3 from "d3";
    import FloatingVue from 'floating-vue'
    import 'floating-vue/dist/style.css'
    const {libraryItems} = defineProps(['libraryItems']);

    //Responsive SVG Window Size | VueUse https://vueuse.org/core/useWindowSize/
    const { width, height } = useWindowSize()
    const yourShelfStore = useYourShelfStore();

    const svgWidth = computed (() => {
        return width.value - 80
    })
    const svgHeight = computed (() => {
        return height.value + 10000
    })

    if(yourShelfStore.yourShelf.length){
        //Then apply filter functions below for grouping.
    }

    console.log(yourShelfStore.yourShelf)


    ////////////////////////
    // LIBRARY VIEW OBJECT//
    ////////////////////////
    const libraryView = reactive({
        itemType: "Book",
        id: 'BookID',
        shelf: 'Repository', //Primary sort
        useShelf: true,
        showShelf: true,
        bookend: 'Date of publication', //Secondary sort
        useBookend: true,
        showBookend: true,
        height: 'Date of publication',
        useHeight: true,
        colour: 'Genre/Identity',
        useColour: true,
        label: 'Title',
        useLabel: true,
        menuSubHeader: 'Shelfmark',
        subMenuCategory1: 'Author',
        subMenuCategory2: 'Genre/Identity',
        subMenuCategory3: 'Marginal Marks', //Need to add counter options here
        viewTableLookUp: {
            id: 'Book',
            shelf: 'Book',
            bookend: 'Book',
            height: 'Book',
            colour: 'Book',
            label:'Book',
            menuSubHeader: 'Book',
            subMenuCategory1: 'Book',
            subMenuCategory2: 'Book',
            subMenuCategory3: 'Book',
        }
    })

    ///////////////////////
    // LABEL CONVERSIONS //
    ///////////////////////
    const libraryLabels = new Map();
    libraryLabels
    .set('Book', {
            ['BookID']: 'ID',
            ['Repository']: 'Repository', 
            ['Date of publication']: 'Year Published', 
            ['Genre/Identity']: 'Genre',
            ['Title']: 'Title',
            ['Author']: 'Author',
            ['Place of publication']: 'Place of publication',
            ['Size']: 'Book Size',
            ['Book Notes']:'Book Notes',
            ['Print or manuscript']: 'Format',
            ['STC or Wing']: 'STC or Wing',
            ['Shelfmark']: 'Shelfmark',
            ['Marginal Marks']: 'Marginal Marks',
            ['Book image/s']: 'Images',
    })
    libraryLabels
    .set('Agent', {
            ['FemaleAgentID']: 'ID',
            ['Female agent name']: 'Agent name', 
            ['Female agent date']: 'Agent date', 
            ['Female agent bio']: 'Agent bio',
    })
    libraryLabels
    .set('Mark', {
            ['MargID']: 'ID',
            ['Notes']: 'Notes',
            ['Ownership type']: 'Ownership type',
            ['Distribution']: 'Distribution of marks',
            ['Female agent status']: 'Confidence in female authorship',
            ['Annotation type']: 'Annotation type',
            ['Location sig. ; p. ; pp.']: 'Location',
            ['Recording type']: 'Recording type',
            ['Transcription']: 'Transcription',
            ['Mark type (Mark of?)']: 'Type of mark',
            ['Images of marginal mark']: 'Images',
            ['Class']: 'Class',
            ['Position on page']: 'Position on page',
            ['Location other']: 'Location detail',
            ['Added text type']: 'Type of added text',
            ['Drawing type']: 'Type of drawing',
            ['Graffiti type']: 'Type of Graffiti',
            ['Agent role']: 'Agent role',
            ['Other notes']: 'Other notes',
    })

            //Omitted exxisting relational columns such as Book title and Female agent 
           //Ideally to be picked up using relational database mechanisms

    const invLibraryLabels = new Map();
    invLibraryLabels
    .set('Book', invertObject(libraryLabels.get('Book')))
    invLibraryLabels
    .set('Agent', invertObject(libraryLabels.get('Agent')))
    invLibraryLabels
    .set('Mark', invertObject(libraryLabels.get('Mark')))

    function invertObject (obj) {
        return Object.keys(obj).reduce((ret, key) => {
            ret[obj[key]] = key;
            return ret;
        }, {});
    }

    function handleViewSelection(viewType, viewSelection, itemType){
        console.log('handleViewSelection', viewType, viewSelection)
        libraryView[viewType] = viewSelection;
        libraryView.viewTableLookUp[viewType] = itemType;
    }


    ///////////////////
    // SCALE OBJECTS //
    ///////////////////
    //Set-up objects which can be checked for display using 'include' 
    const scaleCategory = {
        ordinal: ['Size', 'Place of publication']
    }


    ////////////
    // SCALES //
    ////////////
    const heightScale = 1.5;
    const widthScale = 2;
    const maxItemHeight = ref(100 * heightScale);
    const maxShelfHeight = ref(110 * heightScale);
    const minItemHeight = ref(35 * heightScale);
    const minItemWidth = ref(20 * widthScale)      

    ////////////////////
    // FORMAT LIBRARY //
    ////////////////////
    //Parse Data
    function parseDatabase(tableData) {
        return JSON.parse(JSON.stringify(tableData))
    }
    //Set Shelves
    function formatShelf(data, viewSelection){
        return d3.flatGroup(d3.sort(data, d=> d[viewSelection]), d => d[viewSelection]); 
    }
    //Set Bookends
    function formatBookend(data, viewSelection){
        return data
        .map(d => [d[0],d3.flatGroup(d3.sort(d[1], d=> d[viewSelection]), d=> d[viewSelection])]);  
    }
    //Combine Shelves & Bookend
    function formatLibrary(data, view) {
        //Shelves - Sort & Group Items by Shelf Category
        const shelfFormatData = view.useShelf 
        ? formatShelf(data, view.shelf) 
        : formatShelf(data, view.id); //Default
        //Bookends - Further Sort & Group Items by Bookend Category
        const shelfBookendFormatData = view.useBookend 
        ? formatBookend(shelfFormatData, view.bookend) 
        : formatBookend(shelfFormatData, view.id); //Default
        return shelfBookendFormatData
    }



    ///////////
    // UTILS //
    ///////////
    //Handles array, string, numeric and null values for colour
    function handleColour(item, viewSelection){
        if(item){
            if(item[viewSelection]){
                if(isNumber(item[viewSelection])) return handleNumeric(item[viewSelection])
                if(isString(item[viewSelection])) return item[viewSelection]
                if(isArray(item[viewSelection])) return item[viewSelection][0]
            }
            }else{
                return null
            }
        }

    //Returns the longest series of numbers in a string
    function handleNumeric(value){
        const longestNumber = coerceNumber(longestNumberString(value))
        return longestNumber
    }
    function longestNumberString(value){
        if(isString(value)){
            let longest = '';
            let i = 0;
            while (i < value.length) {
                while (i < value.length && !isNumber(value[i])) {
                    ++i;
                }
                let start = i;
                while (i < value.length && isNumber(value[i])) {
                    ++i;
                }
                if (i - start > longest.length) {
                    longest = value.slice(start, i);
                }
            }   
            return longest
        }else if(isNumber(value)){
            return value
        }else{
            return value
        }
    }
    //Find 4 digit number if exists in string - Originailly Designed for Year Column
    function regexNum(value){
        const regex = /(?=(\d{4}))/g;
        return regex.exec(value) ? coerceNumber(regex.exec(value)[1]) : null
    }
    //Clamp Function
    const clamp = (min, value, max) => value ? Math.min(Math.max(value, min), max) : value
    //Numeric coersion of single value
    const coerceNumber = (value) => isNumber(value) ? Number(value) : value
    //Numeric check of single value
    const isNumber = (value) => !isNaN(value) && !isNaN(parseFloat(value))
    //String check of single value
    const isString = (value) => typeof(value)==='string'
    //Array check of single value
    const isArray = (value) => Array.isArray(value)
    //Return type of value if String or Array
    function isStringOrArray(value){
        if(isArray(value)) return 'array'
        if(isString(value)) return 'string'
        return null
    }
    //Check if any value in array is a number
    function containsStringOrArray(data, viewSelection){
        const typeFound = data.find(d => isArray(d[viewSelection]) || isString(d[viewSelection]))
        return isStringOrArray(typeFound[viewSelection])
    }
    //Check if any value in array is a number
    const containsNumber = (data, viewSelection) => data.some(d => isNumber(d[viewSelection]))
    //Check if any value in array is string
    const containsString = (data, viewSelection) => data.some(d => typeof(d[viewSelection])==='string')
    //Check if any value in array is array
    const containsArray = (data, viewSelection) => data.some(d => Array.isArray(d[viewSelection]))
    //Return index of minimum element for given view selection
    const minItemIndex = (data, viewSelection) => d3.minIndex(data, d => handleNumeric(d[viewSelection]))
    //Return index of maximum element for given view selection
    const maxItemIndex = (data, viewSelection) => d3.maxIndex(data, d => handleNumeric(d[viewSelection]))
    //
    function processDomain(data, viewSelection){
        //More handler functions may be needed
        const domainIndex = {min: minItemIndex(data, viewSelection), max: maxItemIndex(data, viewSelection)}
        return domainIndex
    }


    //////////////////////////
    // DATA TYPE FORMATTING //
    //////////////////////////
    function formatData(data, viewSelection){
        // console.log('input', data)
        // console.log('colour items', processColourItems(data, viewSelection,getColourSet.value))
        return 
    }
 


 
    //Set Height
    function formatHeight(data, viewSelection) {
        return d3.scaleLinear()
                    .domain(chooseHeightDomain(data, viewSelection)) 
                    .unknown(maxItemHeight.value) //Set all non-numeric values to max height
                    .range([minItemHeight.value, maxItemHeight.value])
                    .clamp(true);     
    }
    
    function chooseHeightDomain(data, viewSelection){   
            if(viewSelection.toLowerCase().includes('date')) {
                return [1450, 1750] //was - clamp(1450, longestNumber, 1750)
            }else{
                const domainIndex = getDomainIndex.value
                return [data[domainIndex.min][viewSelection], data[domainIndex.max][viewSelection]]
                
                // d3.extent(data
                //     .filter(d => handleNumeric(d[viewSelection], viewSelection))
                //     .map(d => handleNumeric(d[viewSelection], viewSelection)))
            }
    }




    //Set Colour
    function formatColour(data, viewSelection){
        if(containsNumber(data, viewSelection)){
            console.log('Colour Continuous')
            return d3.scaleLinear()
                        .domain(d3
                            .extent(data
                            .filter(d => handleNumeric(d[viewSelection], viewSelection))
                            .map(d => {
                                return handleNumeric(d[viewSelection], viewSelection)})))
                        .range(['royalblue', 'pink'])
                        .clamp(true)
        }
        console.log('Colour Ordinal')
        return d3.scaleOrdinal(d3.schemeSet3)
                    .domain(data.map((d) => {
                    return handleColour(d[viewSelection], viewSelection)})) 
        }
        //Note for dropdown - could use top select buttons?
        //Same functions for handle label
        const isHighlight = ref(false);

    function processColourSet(data, viewSelection){
        console.log(new Set(data.flatMap(d => d[viewSelection] ? d[viewSelection] : 'No Value')))
        return new Set(data.flatMap(d => d[viewSelection] ? handleColour(d, viewSelection) : 'No Value'))
    }

    function processColourItems(data, viewSelection, colourSet){
        let tempColourSet = colourSet;
        const uniqueColours = data.filter((d) => {
            const value = d[viewSelection] ? handleColour(d, viewSelection) : "No Value"
            
            if(tempColourSet.has(value)){
                console.log(value)
                return tempColourSet.delete(value) //Returns true if deletion successful
            }else{
                return false
            }
        })
        console.log(uniqueColours)
        return uniqueColours
    }
   

    //////////////////
    // PROCESS DATA //
    //////////////////
    //Parse Data
    const parsedData = computed (() => {
        return parseDatabase(libraryItems);
    }) 
    //Get item height bounds
    const getDomainIndex = computed (() => {
        return processDomain(parsedData.value, libraryView.height)
    })

    //Get item height bounds
    const getColourSet = computed (() => {
    return processColourSet(parsedData.value, libraryView.colour)
    })



    ////////////////////
    // CREATE LIBRARY //
    ////////////////////
    //Library Structure
    const mainLibrary = computed (() => {
        return formatLibrary(parsedData.value, libraryView);
    })
    //Item Height
    const itemHeight =  computed (() => {
        return formatHeight(parsedData.value, libraryView.height);
    })
    //Item Colour
    const itemColour =  computed (() => {
        return formatColour(parsedData.value, libraryView.colour);
    })


    ///////////////////////
    // CREATE YOUR SHELF //
    ///////////////////////
    //Parse Data
    const parsedDataYS = computed (() => {
        return parseDatabase(yourShelfStore.yourShelf);
    }) 
    //Library Structure
    const yourShelf = computed (() => {
        if(null){ //In case shelfs and bookmarks are needed on 'Your Shelf'
        return formatLibrary(parsedDataYS.value, libraryView); //Shelves and Bookmarks included in 'YourShelf'
        }else{
            return parsedDataYS.value //Items only
        }
    })

    ////////////////////////
    // CREATE VIEW EDITOR //
    ////////////////////////
    const viewHeightBounds = computed (() => {
        return [parsedData.value[getDomainIndex.value.min],
                parsedData.value[getDomainIndex.value.max]]
    })

    //Currently applies to Arrays only
    const viewColourSet = computed (() => {
        return processColourItems(parsedData.value, libraryView.colour, getColourSet.value)
    })




    ////////////////////
    // EVENT HANDLERS //
    ////////////////////
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

    ///////////////////
    // TO TOP BUTTON //
    ///////////////////
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
    formatData(parsedData.value, libraryView.colour)
</script>

<style lang="scss" scoped>

</style>