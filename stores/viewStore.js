import * as d3 from "d3";

export const useViewStore = defineStore('view', ()=>{
    const { scales } = useReferenceStore();
    const { handleNumeric,
            isNumber,
            isString,
            isArray,
            containsNumber,
            processDomain } = useUtils();

    // LIBRARY STATE OBJECT//
    const libraryData = ref({})

    const formattedLibrary = ref([])
    
    //Set-up objects which can be checked for display using 'include' 
    const viewCategory = {
        ordinal: ['Size', 'Place of publication']
    }

    // LIBRARY VIEW OBJECT//
    const libraryDisplay = reactive({
        //sub items in view and viewType are called the 'viewMode'.
        view: {
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
        },
        viewType: {
            id: 'Book',
            shelf: 'Book',
            bookend: 'Book',
            height: 'Book',
            colour: 'Book',
            label: 'Book',
            menuSubHeader: 'Book',
            subMenuCategory1: 'Book',
            subMenuCategory2: 'Book',
            subMenuCategory3: 'Book',
        },
        AgentLookUp: {
            Agent: '',
            Book: 'Marks.Books',
            Mark: 'Marks'
        },
        BookLookUp: {
            Agent: `Marks,0,Agents`,
            Book: '',
            Mark: 'Marks'
        },
        MarkLookUp: {
            Agent: 'Agents',
            Book: 'Books',
            Mark: ''
        },
    
    })

    // INTERNAL GETTERS //
    //Get item height bounds
    const getDomainIndex = computed (() => {
        return processDomain(libraryData.value, libraryDisplay.view.height)
    })

    //Get unique values in colour set
    const getColourSet = computed (() => {
    return processColourSet(libraryData.value)
    })
    
    // EXTERNAL GETTERS //
    //Library Structure
    watch([libraryData.value, libraryDisplay],() => {
        formattedLibrary.value =  formatLibrary(libraryData.value, libraryDisplay);
    })
    //Item Height - Returns d3 Scale Function
    const itemHeight =  computed (() => {
        return formatHeight(libraryData.value);
    })
    //Item Colour - Returns d3 Scale Function
    const itemColour =  computed (() => {
        return formatColour(libraryData.value);
    })

    // CREATE VIEW EDITOR //
    const viewHeightBounds = computed (() => {
        return [libraryData.value[getDomainIndex.value.min],
                libraryData.value[getDomainIndex.value.max]]
    })
    //Currently applies to Arrays only
    const viewColourSet = computed (() => {
        return processColourItems(libraryData.value, getColourSet.value)
    })


    // INTERNAL FUNCTIONS //
    // FORMAT LIBRARY //
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
    function formatLibrary(data, display) {
        //Shelves - Sort & Group Items by Shelf Category
        const shelfFormatData = display.view.useShelf 
        ? formatShelf(data, display.view.shelf) 
        : formatShelf(data, display.view.id); //Default
        //Bookends - Further Sort & Group Items by Bookend Category
        const shelfBookendFormatData = display.view.useBookend 
        ? formatBookend(shelfFormatData, display.view.bookend) 
        : formatBookend(shelfFormatData, display.view.id); //Default
        return shelfBookendFormatData
    }

    // HANDLE HEIGHT //
    function formatHeight(data) {
        return d3.scaleLinear()
                    .domain(chooseHeightDomain(data)) 
                    .unknown(scales.maxItemHeight) //Set all non-numeric values to max height
                    .range([scales.minItemHeight, scales.maxItemHeight])
                    .clamp(true);     
    }
    
    function chooseHeightDomain(data){   
            const viewSelection = libraryDisplay.view.height
            if(viewSelection.toLowerCase().includes('date')) {
                return [1450, 1750] //was - clamp(1450, longestNumber, 1750)
            }else{
                const domainIndex = getDomainIndex.value
                return [data[domainIndex.min][viewSelection], data[domainIndex.max][viewSelection]]
            }
    }

    // HANDLE COLOUR //
    function formatColour(data){
        const viewSelection = libraryDisplay.view.colour
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
                    return handleColour(d[viewSelection])})) 
        }

    function processColourSet(data){
        const viewSelection = libraryDisplay.view.colour
        return new Set(data.flatMap(d => d[viewSelection] ? handleColour(d) : 'No Value'))
    }

    function processColourItems(data, colourSet){
        const viewSelection = libraryDisplay.view.colour
        let tempColourSet = colourSet;
        const uniqueColours = data.filter((d) => {
            const value = d[viewSelection] ? handleColour(d) : "No Value"
            if(tempColourSet.has(value)){
                return tempColourSet.delete(value) //Returns true if deletion successful
            }else{
                return false
            }
        })
        console.log(uniqueColours)
        return uniqueColours
    }

    // EXTERNAL FUNCTIONS //
    //Parse Data Object from Supabase
    async function parseDatabase(tableData) {
            libraryData.value = await JSON.parse(JSON.stringify(tableData))
            formattedLibrary.value =  formatLibrary(libraryData.value, libraryDisplay);
    }
    //Update View Object from user input
    function handleViewSelection(viewMode, viewSelection, itemType){
        console.log('handleViewSelection', viewMode, viewSelection, itemType)
        libraryDisplay.view[viewMode] = viewSelection; //Future addition - updateView below (in database)
        libraryDisplay.viewType[viewMode] = itemType; //Future addition - updateViewType below (in database)
    }

    //Dynamic Path
    //Returns the path from the itemType (via the ID name) to the itemType of the viewMode (via viewType LookUp)
    //getIDP - getItemDisplayPath - Condensed for frequent use.
    function getIDP(item, viewMode) {
        if(!item) return null
        const viewSelection = libraryDisplay.view[viewMode]
        const viewModeType = libraryDisplay.viewType[viewMode]
        const itemType = item['FemaleAgentID'] ? 'Agent' :
                         item['BookID'] ? 'Book' :
                         item['MargID'] ? 'Mark' : ''
        //Agent Item paths
        if(itemType === 'Agent' && viewModeType === 'Agent') return item[viewSelection]
        if(itemType === 'Agent' && viewModeType === 'Mark') return item['Marks'][0][viewSelection]
        if(itemType === 'Agent' && viewModeType === 'Book') return item['Marks'][0]['Book'][viewSelection]
        //Book Item paths                 
        if(itemType === 'Book' && viewModeType === 'Book') return item[viewSelection]
        if(itemType === 'Book' && viewModeType === 'Mark') return item['Marks'][0][viewSelection]
        if(itemType === 'Book' && viewModeType === 'Agent') return item['Marks'][0]['Agent'][viewSelection]
        //Mark Item paths
        if(itemType === 'Mark' && viewModeType === 'Mark') return item[viewSelection]
        if(itemType === 'Mark' && viewModeType === 'Agent') return item['Agent'][viewSelection]
        if(itemType === 'Mark' && viewModeType === 'Book') return item['Book'][viewSelection]

        //Add editor for No Value - return "No Data"
        // var [marks, markIndex, agent]  = libraryDisplay.BookLookUp[libraryDisplay.viewType[viewMode]].split(',')
        //     return item[marks][markIndex][agent]
    }

    //Handles array, string, numeric and null values for colour
    function handleColour(item){
        const viewSelection = libraryDisplay.view.colour
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


      return {  libraryData,
                libraryDisplay,
                formattedLibrary, 
                itemHeight,
                itemColour, 
                viewHeightBounds, 
                viewColourSet,
                parseDatabase,
                handleViewSelection,
                getIDP,
                handleColour  }
  })
