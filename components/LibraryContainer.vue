<template>
    <div class="library-wrapper">
        
        <div class="shelf" v-for="shelf in nestedGroupSortedItems">
            <div class="shelf-title-box">
                <h2 class="shelf-title">Repository {{shelf[0]}}</h2>
            </div>
            <div class="shelf-inner">

                <div class="section-wrapper" v-for="bookend in shelf[1]" >
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
                                    <div class="item" v-on="itemHandlers" :style="{ height: itemHeight(item['Date of publication']) + 'px' , background: colour(item['Genre/Identity']),
                                    width: minItemWidth + 'px'}" :class="{lowlight: isHighlight}">
                                        <h3 class="item-value">{{ item.Title }}</h3>
                                    </div>
                                    <template #popper>
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
                                    </template>
                                </VMenu>
                            </div>
                        </div>

                    </div>
                    <div class="section-shelf-box">
                            <!-- shelf box -->
                        </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="library-container">
        <svg class="library" :width="svgWidth" :height="svgHeight"></svg>
    </div> -->
</template>

<script setup>
    import * as d3 from "d3";
    import FloatingVue from 'floating-vue'
    import 'floating-vue/dist/style.css'
    const {libraryItems} = defineProps(['libraryItems']);


    //Responsive SVG Window Size | VueUse https://vueuse.org/core/useWindowSize/
    const { width, height } = useWindowSize()
    const svgWidth = computed (() => {
        return width.value - 80
    })
    const svgHeight = computed (() => {
        return height.value + 10000
    })



    ////////////
    // SCALES //
    ////////////
    const lastItemToDisplay = libraryItems[libraryItems.length-1]
    const heightScale = 1.5;
    const widthScale = 2;
    const maxShelfHeight = ref(125 * heightScale);
    const shelfGap = 200 * heightScale;
    const maxItemHeight = ref(100 * heightScale);
    const minItemHeight = ref(25 * heightScale);
    const minItemWidth = ref(20 * widthScale)
    const itemSpacing = 30 * widthScale;
    const valueCircleSize = 15;

    const isHighlight = ref(false);
    const colour = d3.scaleOrdinal(d3.schemeSet3)
        .domain(libraryItems.map(d => d['Genre/Identity']))

    //Item Height
    const itemHeight = d3.scaleLinear()
        .domain(d3.extent(libraryItems
            .filter(d => Number.isInteger(Number(d['Date of publication'])))
            .map(d => {
                return d['Date of publication']
            })))
        .unknown(minItemHeight.value) //Set 'NaN' values which have been filtered out above to lowest height.
        .range([minItemHeight.value, maxItemHeight.value]);           



    console.log('height', itemHeight.domain())
    console.log('height test', itemHeight(['1657']))

    const sortItems = d3.sort(libraryItems, d=> d['Repository'])
       
    


    const groupedItems = computed (() => {
        return d3.flatGroup(sortItems, (d) => d['Repository']);
    })


    console.log('Grouped Items', groupedItems.value)


    const groupSortedItems = groupedItems.value.map((d) => {
        
        return [d[0],d3.sort(d[1], d=> d['Date of publication'])]
       
    })

    console.log('Group Sorted Items', groupSortedItems)

    
    const nestedGroupSortedItems = groupSortedItems.map((d) => {
        
        return [d[0],d3.flatGroup(d[1], d=> d['Date of publication'])]
       
    })

    console.log('Nested Group Sorted Items', nestedGroupSortedItems)

    // Inner Library Margins & dimensions
    const margin = {top: 20, right: 20, bottom: 100, left: 100};
    const libWidth = computed (() => {
        return svgWidth.value - margin.left - margin.right;
    })
    const libHeight = computed (() => {
        return svgHeight.value - margin.top - margin.bottom;
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

    // onMounted(() => {
    //     const svgLibrary = d3.select('.library')
    //         .append('g')
    //         .classed("libraryGroup", true)
    //     //Watch reactive values
    //     watchEffect(() => {
    //         const itemsToDisplay = libraryItems.slice(0,1000)
    //         const lastItemToDisplay = itemsToDisplay[itemsToDisplay.length-1]
    //         const heightScale = 1.5;
    //         const widthScale = 2;
    //         const maxShelfHeight = 125 * heightScale;
    //         const shelfGap = 200 * heightScale;
    //         const maxItemHeight = 100 * heightScale;
    //         const minItemHeight = 25 * heightScale;
    //         const minItemWidth = 20 * widthScale;
    //         const itemSpacing = 30 * widthScale;
    //         const valueCircleSize = 15;

    //         ////////////
    //         // SCALES //
    //         ////////////
    //         const colour = d3.scaleOrdinal(d3.schemeSet3)
    //             .domain(itemsToDisplay.map(d => d['Genre/Identity'][0]))

    //         //Item Height
    //         const itemHeight = d3.scaleLinear()
    //             .domain(d3.extent(itemsToDisplay
    //                 .filter(d => Number.isInteger(Number(d['Date of publication'])))
    //                 .map(d => {
    //                     return d['Date of publication']
    //                 })))
    //             .unknown(maxShelfHeight) //Set 'NaN' values which have been filtered out above to lowest height.
    //             .range([maxItemHeight, minItemHeight]);              
            
    //         //Item Total Position
    //         const itemPosition = d3.scaleBand()
    //             .domain(itemsToDisplay.map(d => d.BookID))
    //             .range([0,itemsToDisplay.length * itemSpacing])
    //             .paddingInner(0.05)
    //         //Checks
    //         // console.log(itemPosition(lastItemToDisplay.BookID))
    //         // console.log(libWidth.value)
    //         // console.log(lastItemToDisplay.BookID)
    //         // console.log(itemsToDisplay.length * itemSpacing)
    //         // console.log(itemsToDisplay[itemsToDisplay.length-1].BookID)
    //         //Shelf Width
    //         const shelfWidthArray = useRange(Math.floor(libWidth.value/itemSpacing)+1)
    //         //Item Shelf Position
    //         const shelfPosition = d3.scaleBand()
    //                 .domain(shelfWidthArray)
    //                 .range([0, shelfWidthArray.length * itemSpacing])
    //                 console.log(shelfWidthArray)
    //         //Shelf Tier Levels
    //         const shelfLevelArray = useRange(Math.floor(itemPosition(lastItemToDisplay.BookID)/libWidth.value)+1)
    //         const shelvesTotal = shelfLevelArray.length
    //         const shelfLevel = d3.scaleBand()
    //             .domain(shelfLevelArray)
    //             .range([0, shelfGap * shelvesTotal])

    //         ///Sort option groupSort(iterable, comparator, key) - https://d3js.org/d3-array/group
    //         const arrangeGroups = d3.group(libraryItems, (d) => d['Date of publication']);
    //         // const arrangeGroupKeys = arrangeGroups.keys()

    //         console.log(arrangeGroups);
    //         // console.log(arrangeGroups.keys())
    //         // console.log(d3.zip(arrangeGroupKeys,arrangeGroups))




    //         ////////////////////
    //         // CREATE LIBRARY //
    //         ////////////////////
    //         const libraryGroup = d3.select('.libraryGroup') //Watch for changes in window size for group dimensions
    //             .attr('width', libWidth.value)
    //             .attr('height', libHeight.value)
    //             .attr('transform', `translate(${margin.left}, ${margin.top})`);

    //         /////////////////
    //         // TRANSITIONS //
    //         /////////////////
    //         const itemTrans = libraryGroup.transition()
    //             .duration(750);
    //         const textTrans = libraryGroup.transition()
    //             .duration(750);


    //         /////////////////////
    //         // LIBRARY OBJECTS //
    //         /////////////////////
    //         const libraryObjects = d3.select('.libraryGroup')
    //             .selectAll('g')
    //             .data(itemsToDisplay, d => d)
    //                 .join(
    //                     (enter) => {
    //                                 let g = enter
    //                                 .append('g')
    //                                     .attr('class', 'object-group')
    //                                     .attr('id', (d) => `book-${d.BookID}`)
    //                                     .style('cursor', 'default')
    //                                     .on('mouseover', handleMouseOver)
    //                                     .on('mouseout', handleMouseOut) 

    //                                 let object = d3.selectAll('.object-group')
    //                                 object.append('rect')
    //                                     .attr('fill', (d) => {
    //                                         return colour(d['Genre/Identity'][0]) 
    //                                     })
    //                                     .attr('width', minItemWidth)
    //                                     .attr('height', 0)
    //                                     .attr('x',  d => shelfPosition(Math.floor((itemPosition(d.BookID) % libWidth.value)/itemSpacing)))
    //                                     .attr('y', d => maxShelfHeight + shelfLevel(Math.floor(itemPosition(d.BookID)/libWidth.value)))

    //                                 .call(enter => enter.transition(itemTrans)
    //                                     .attr('height', d => maxShelfHeight - itemHeight( d['Date of publication']))
    //                                     .attr('y', d => itemHeight(d['Date of publication']) + shelfLevel(Math.floor(itemPosition(d.BookID)/libWidth.value)))
    //                                     )

    //                                 object.append('text')
    //                                     .attr("text-anchor", "start")
    //                                     .attr("transform", function(d) {
    //                                         var x = shelfPosition(Math.floor((itemPosition(d.BookID) % libWidth.value)/itemSpacing));
    //                                         var y = maxShelfHeight + shelfLevel(Math.floor(itemPosition(d.BookID)/libWidth.value))
    //                                         return  'translate(' + x + ','+ y +' ) rotate(-90)'    
    //                                     })
    //                                     .attr('dx',  5)
    //                                     .attr('dy', minItemWidth/1.25)
    //                                     .text(d => d['Genre/Identity'][0])
                            
    //                                     return g;
    //                                 },
    //                     update => {
    //                     console.log(update) //Leave this change until the data is also edited.
    //                     },
    //                     exit => exit
    //                         .call(exit => exit.transition(itemTrans)
    //                             .remove())
    //                 )
                    

    //                 console.log('watchEffect Ran')

    //     });


    // });
  


</script>

<style lang="scss" scoped>

</style>