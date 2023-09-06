<template>
    <div class="library-wrapper">
        <!-- Your Shelf -->
        <!-- v-if youShelf.length -->
        <!-- <div class="shelf" >
            <div class="shelf-title-box">
                <h2 class="shelf-title">Your Shelf</h2>
            </div>
            <div class="shelf-inner">
                <div class="section-wrapper" v-for="bookend in yourShelf[1]" >
                    <div class="section-outer">
                    <div class="section-title-box" :style="{ height: maxItemHeight + 'px'}">
                        <h3 class="section-category">Year Published </h3>
                        <h3 class="section-value">{{ bookend[0] }}</h3>
                    </div>
                        <div class="section-inner" :style="{ height: maxItemHeight + 'px'}">
                            <div class="section-item-box" v-for="item in bookend[1]">
                                <VMenu
                                    placement="top" 
                                    :delay="{ show: 50, hide: 200 }"
                                >
                                    <div class="item" v-on="itemHandlers" :style="{ height: itemHeight(regexNum(item['Date of publication'])) + 'px' , background: itemColour(item['Genre/Identity']),
                                    width: minItemWidth + 'px'}" :class="{lowlight: isHighlight}">
                                        <h3 class="item-value">{{ item.Title }}</h3>
                                    </div>
                                    <template #popper>
                                        <div>
                                        <div class="item-menu">
                                            <ul>
                                                <li>
                                                    <h4>Respository</h4>
                                                    <p>{{ item['Repository'] }}</p>
                                                </li>
                                                <li>
                                                    <h4>Year Published</h4>    
                                                    <p>{{ item['Date of publication'] }}</p>
                                                </li>
                                                <li>
                                                    <h4>Title</h4>    
                                                    <p>{{ item.Title }}</p>
                                                </li>
                                                <li>
                                                    <h4>Author</h4>    
                                                    <p>{{ item.Author }}</p>
                                                </li>
                                                <li>
                                                    <h4>Genre</h4>    
                                                    <template v-for="(genre, i) in item['Genre/Identity']">
                                                        <span>{{genre}}</span>{{ i < item['Genre/Identity'].length -1 ? ', ': '' }}
                                                    </template>
                                                </li>
                                                <li>
                                                    <h4>Number of Marks</h4>    
                                                        <p>{{item['Marginal Marks'].length}}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    </template>
                                </VMenu>
                            </div>
                        </div>
                    </div>
                    <div class="section-shelf-box"> -->
                    <!-- Shelf Box DO NOT DELETE -->
                    <!-- </div>
                </div>
            </div>
        </div> -->
        
        <!-- The Library -->
        <div class="shelf" v-for="shelf in mainLibrary">
            <div class="shelf-title-box">
                <h2 class="shelf-title">{{shelf[0]}}</h2>
            </div>
            <div class="shelf-inner">
                <div class="section-wrapper" v-for="bookend in shelf[1]" >
                    <!-- <div class="section-outer"> -->
                    <div class="section-title-box" :style="{ height: maxShelfHeight + 'px'}">
                        <h3 class="section-category">{{ libraryLabels[libraryView.itemType][libraryView.bookend] }}</h3>
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
                                    <div class="item" v-on="itemHandlers" :style="{ height: itemHeight(handleNumeric(item[libraryView.height], libraryView.height)) + 'px' , background: itemColour(handleNumeric(item[libraryView.colour], libraryView.colour)),
                                    width: minItemWidth + 'px'}" :class="{lowlight: isHighlight}">
                                        <h3 class="item-value">{{ item[libraryView.label] }}</h3>
                                    </div>
                                    <template #popper>
                                        <div>
                                        <div class="item-menu">
                                            <ul>
                                                <li>
                                                    <h4>{{libraryLabels[libraryView.itemType][libraryView.shelf]}}</h4>
                                                    <p>{{ item[libraryView.shelf] }}</p>
                                                </li>
                                                <li>
                                                    <h4>{{libraryLabels[libraryView.itemType][libraryView.bookend]}}</h4>    
                                                    <p>{{ item[libraryView.bookend] }}</p>
                                                </li>
                                                <li>
                                                    <h4>{{libraryLabels[libraryView.itemType][libraryView.title]}}</h4>    
                                                    <p>{{ item[libraryView.title] }}</p>
                                                </li>
                                                <li>
                                                    <h4>Author</h4>    
                                                    <p>{{ item.Author }}</p>
                                                </li>
                                                <li>
                                                    <h4>Genre</h4>    
                                                    <template v-for="(genre, i) in item['Genre/Identity']">
                                                        <span>{{genre}}</span>{{ i < item['Genre/Identity'].length -1 ? ', ': '' }}
                                                    </template>
                                                </li>
                                                <li>
                                                    <h4>Number of Marks</h4>    
                                                        <p>{{item['Marginal Marks'].length}}</p>
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


    ////////////////////////
    // LIBRARY VIEW OBJECT//
    ////////////////////////
    const libraryView = {
        itemType: "Book",
        id: 'BookID',
        shelf: 'Repository', //Primary sort
        useShelf: true,
        showShelf: true,
        bookend: 'Size', //Secondary sort
        useBookend: true,
        showBookend: true,
        height: 'Size',
        useHeight: true,
        colour: 'Size',
        useColour: true,
        label: 'Title',
        useLabel: true,
        subMenuHeader1: 'Author',
        subMenuHeader2: 'Genre/Identity',
        subMenuHeader3: 'Author',
    }

    ///////////////////////
    // LABEL CONVERSIONS //
    ///////////////////////
    const libraryLabels = {
        ['Book']:{
            ['BookID']: 'ID',
            ['Repository']: 'Repository', 
            ['Date of publication']: 'Year Published', 
            ['Genre/Identity']: 'Genre',
            ['Title']: 'Title',
            ['Author']: 'Auhtor',
            ['Place of publication']: 'Place of publication',
            ['Size']: 'Book Size',
            ['Book Notes']:'Book Notes',
            ['Print or manuscript']: 'Format',
            ['STC or Wing']: 'STC or Wing',
            ['Shelfmark']: 'Shelfmark',
            ['Marginal Marks']: 'Marginal Marks',
            ['Book image/s']: 'Images',
        },
        ['Agent']:{
            ['FemaleAgentID']: 'ID',
            ['Female agent name']: 'Agent name', 
            ['Female agent date']: 'Agent date', 
            ['Female agent bio']: 'Agent bio',
        },
        ['Mark']:{
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
           //Omitted exxisting relational columns such as Book title and Female agent 
           //Ideally to be picked up using relational database mechanisms
        }
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
    const minItemHeight = ref(25 * heightScale);
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
    //Returns the longest series of numbers in a string
    function handleNumeric(value, viewSelection){
        const longestNumber = coerceNumber(longestNumberString(value))
        if(viewSelection.toLowerCase().includes('date')) return clamp(1450, longestNumber, 1750)
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
    //This needs to be adjusted to be proportional. Perhaps even a bit more bespoke.


    //Check if any value in array is string
    const containsString = (data, viewSelection) => data.some(d => typeof(d[viewSelection])==='string')
    //Check if any value in array is array
    const containsArray = (data, viewSelection) => data.some(d => Array.isArray(d[viewSelection]))

    //////////////////////////
    // DATA TYPE FORMATTING //
    //////////////////////////
    function formatData(input) {
        console.log('input', input)
        // console.log('regex return', regexNum(input))
        // console.log('input type', typeof(regexNum(input)))
        return 
    }

    const test = d3.scaleOrdinal(d3.schemeSet3)
        .domain(JSON.parse(JSON.stringify(libraryItems)).map((d) => {
            // console.log(longestNumberString(d['Date of publication']))
            return d}))
    
        // console.log(containsStringOrArray(JSON.parse(JSON.stringify(libraryItems)), 'Genre/Identity'))
        //Date of publication
        //Genre/Identity

 
    //Set Height
    function formatHeight(data, viewSelection) {
        return d3.scaleLinear()
                    .domain(d3
                        .extent(data
                        .filter(d => handleNumeric(d[viewSelection], viewSelection))
                        .map(d => handleNumeric(d[viewSelection], viewSelection))))
                    .unknown(maxItemHeight.value) //Set all non-numeric values to max height
                    .range([minItemHeight.value, maxItemHeight.value]);     
    }
    
    //Set Colour
    function formatColour(data, viewSelection){
        if(containsNumber(data, viewSelection)){
            console.log('yes number')
            console.log((d3.extent(data.map(d => handleNumeric(d[viewSelection], viewSelection)))))
            return d3.scaleLinear()
                        .domain(d3
                            .extent(data
                            .filter(d => handleNumeric(d[viewSelection], viewSelection))
                            .map(d => {
                                console.log( handleNumeric(d[viewSelection], viewSelection))
                                return handleNumeric(d[viewSelection], viewSelection)})))
                        .range(['royalblue', 'pink'])
                        .clamp(true)
                        //Need to use ref for style on v-for loop. As the handler will need to change too.
        }
        ////handleString()
        // if(containsStringOrArray() === 'string'){
        //     return d3.scaleOrdinal(d3.schemeSet3)
        //             .domain(data.map((d) => {
        //                 return d[viewSelection.colour] ? d[viewSelection.colour] : ""}))
        // }
        
        //Current workaround. Need to set up function for this.
        //handleArray()
        console.log('nothing to see here')
        return d3.scaleOrdinal(d3.schemeSet3)
                    .domain(data.map((d) => {
                    return d[viewSelection.colour] ? d[viewSelection.colour][0] : ""})) 
        }
        //Note for dropdown - could use top select buttons?
        //Same functions for handle label
        
        const isHighlight = ref(false);
        
    ////////////////////
    // CREATE LIBRARY //
    ////////////////////
    //Parse Data
    const parsedData = computed (() => {
        return parseDatabase(libraryItems);
    }) 
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

</script>

<style lang="scss" scoped>

</style>