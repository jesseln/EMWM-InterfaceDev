// import { defineStore } from 'pinia'

export const useLibraryStore = defineStore('library', ()=>{
    const { getTable } = useDatabase();
  
    const libraryItems = ref([])
    // const itemsTotal = computed(() => 
    //     cart.value.reduce((total, item) => {
    //       return total + (item.BookID * item.quantity)
    //     }, 0)
    // )
    // const numberOfLibraryItems = computed(() => 
    //     cart.value.reduce((total, item) => {
    //       return total + item.quantity
    //     }, 0)
    // )
      async function getLibraryItems(tableName, orderColumn) {
        libraryItems.value = await getTable(tableName, orderColumn)
      }
  

      return {libraryItems, getLibraryItems}
  })