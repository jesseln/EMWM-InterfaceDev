// import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', ()=>{
  const supabase = useSupabaseClient()
  const { getTable } = useDatabase();

  const cart = ref([])
  const cartTotal = computed(() => 
      cart.value.reduce((total, item) => {
        return total + (item.BookID * item.quantity)
      }, 0)
  )
  const numberOfItems = computed(() => 
      cart.value.reduce((total, item) => {
        return total + item.quantity
      }, 0)
  )
    async function getCart() {
      cart.value = await getTable('Book','BookID')
    }

    async function deleteFromCart(item) {
      cart.value = cart.value.filter(i => {
        return i.id !== item.id
      })

      await $fetch('http://localhost:4000/cart/' + item.id, {
        method: 'delete'
      })
    }
    //This could be refactored. These functions are nearly identical
    async function incQuantity(item) {
      let updatedItem
      cart.value = cart.value.map(i => {
        if (i.id === item.id) {
          i.quantity ++
          updatedItem = i
        }
        return i
      })

      // make put request
      await $fetch('http://localhost:4000/cart/' + item.id, { //this is wrong. This must reference the updated item. Change after tutorial finished.
        method: 'put',
        body: JSON.stringify(updatedItem)
      })
    }
    async function decQuantity(item) {
      let updatedItem
      cart.value = cart.value.map(i => {
        if (i.id === item.id && i.quantity > 1) {
          i.quantity --
          updatedItem = i
        }
        return i
      })
      if(updatedItem){
      // make put request
      await $fetch('http://localhost:4000/cart/' + item.id, { //this is wrong. This must reference the updated item. Change after tutorial finished.
        method: 'put',
        body: JSON.stringify(updatedItem)
      })
      }
    }
    async function addToCart(item) {
      const exists = cart.value.find(i => i.id === item.id) //I like this approach. Should probably be a function though.
      if(exists) {
        this.incQuantity(item)
      }

      if(!exists) {
        cart.value.push({...item, quantity: 1}) //This syntax is useful.  Note spread object, is then enclosed in an object.
        await $fetch('http://localhost:4000/cart', { 
          method: 'post',
          body: JSON.stringify({...item, quantity: 1})
        })
      }
    }

    return {cart, cartTotal, numberOfItems, getCart, 
            deleteFromCart, incQuantity, decQuantity, 
            addToCart}
})