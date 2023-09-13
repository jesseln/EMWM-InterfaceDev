///////////////////////////////////////////////
//                  CONTSTANTS               //
///////////////////////////////////////////////
export const useReferenceStore = defineStore('reference', ()=>{
    const { invertObject } = useUtils();

    ///////////////////////
    // LABEL CONVERSIONS //
    ///////////////////////
    const categoryMap = reactive(new Map());
    categoryMap
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
    categoryMap
    .set('Agent', {
            ['FemaleAgentID']: 'ID',
            ['Female agent name']: 'Agent name', 
            ['Female agent date']: 'Agent date', 
            ['Female agent bio']: 'Agent bio',
    })
    categoryMap
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

    //Inverse Map - Created to reverse conversion as needed in one place only
    const invCategoryMap = reactive(new Map());
    invCategoryMap
    .set('Book', invertObject(categoryMap.get('Book')))
    invCategoryMap
    .set('Agent', invertObject(categoryMap.get('Agent')))
    invCategoryMap
    .set('Mark', invertObject(categoryMap.get('Mark')))

    ////////////
    // SCALES //
    ////////////
    const heightScale = 1.5;
    const widthScale = 2;

    const scales = reactive({
        maxItemHeight: 100 * heightScale,
        maxShelfHeight: 110 * heightScale,
        minItemHeight: 35 * heightScale,
        minItemWidth: 20 * widthScale     
    })

      return {categoryMap, invCategoryMap, scales}
  })