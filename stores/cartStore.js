// import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: []
    
  }),
  getters: {
    cartTotal() {
      return this.cart.reduce((total, item) => {
        return total + (item.BookID * item.quantity)
      }, 0)
    },
    numberOfItems() {
      return this.cart.reduce((total, item) => {
        return total + item.quantity
      }, 0)
    }
  },
  actions: {
    //Supabase first set-up
    async getCart() {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
      .from('Book')
      .select()

      if(error) {
        console.log(error)
      }

      if (data){
        this.cart = data
      }
    },
    async deleteFromCart(item) {
      this.cart = this.cart.filter(i => {
        return i.id !== item.id
      })

      await $fetch('http://localhost:4000/cart/' + item.id, {
        method: 'delete'
      })
    },
    //This could be refactored. These functions are nearly identical
    async incQuantity(item) {
      let updatedItem
      this.cart = this.cart.map(i => {
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
    },
    async decQuantity(item) {
      let updatedItem
      this.cart = this.cart.map(i => {
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
    },
    async addToCart(item) {
      const exists = this.cart.find(i => i.id === item.id) //I like this approach. Should probably be a function though.
      if(exists) {
        this.incQuantity(item)
      }

      if(!exists) {
        this.cart.push({...item, quantity: 1}) //This syntax is useful.  Note spread object, is then enclosed in an object.
        await $fetch('http://localhost:4000/cart', { 
          method: 'post',
          body: JSON.stringify({...item, quantity: 1})
        })
      }
    }
  }
})