// import { defineStore } from 'pinia'

export const useYourShelfStore = defineStore('yourShelf', ()=>{

    const yourShelf = ref([]) 

    async function addToShelf(item, itemType) {
        let id; 
        switch(itemType){
            case 'Book':
                id = 'BookID'
                break
            case 'Agent':
                id = 'FemaleAgentID'
                break
            case 'Mark':
                id = 'MargID'
                break
            default:
                id = 'BookID'
        }

        // if(itemType === 'Book') id = 'BookID'
        // if(itemType === 'Agent') id = 'FemaleAgentID'
        // if(itemType === 'Mark') id = 'MargID'

        const exists = yourShelf.value.find(i => i[id] === item[id]) //I like this approach. Should probably be a function though.
        if(exists) {
          alert('Item already on shelf') //Placeholder for modal option
        }
        if(!exists) {
        yourShelf.value.push({...item}) //This syntax is useful.  Note spread object, is then enclosed in an object.
        //Update database or local memory here.
        }
      }

      async function removeFromShelf(item, itemType) {
        let id; 
        switch(itemType){
            case 'Book':
                id = 'BookID'
                break
            case 'Agent':
                id = 'FemaleAgentID'
                break
            case 'Mark':
                id = 'MargID'
                break
            default:
                id = 'BookID'
        }
        yourShelf.value = yourShelf.value.filter(d => d[id] !== item[id])
      }

      return {yourShelf, addToShelf, removeFromShelf}
  })