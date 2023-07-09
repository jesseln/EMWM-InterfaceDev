<template>
    <div>
      <h2 class="text-white text-2xl text-center my-8">Your Basket</h2>
      
      <div v-if="cartStore.cart.length" class="card text-xl">
        <!-- book list -->
        <div v-for="book in cartStore.cart" class="flex gap-8 items center">
          <nuxt-img preset="bookImage" :src="`/img/${book.Size}.jpg`" :alt="book.Size" loading="lazy" />
          <p class="text-white"> {{ book.Title }}</p>
          <!-- book quantity -->
          <ItemQuantity :book="book"/>
          <p class="text-white"> {{ book.BookID * book.quantity }} dollars.</p>

          <!-- delete -->
          <button class="ml-auto" @click="cartStore.deleteFromCart(book)">
            <span class="material-symbols-outlined text-white">delete</span>
          </button>
        </div>

        <!-- cart total -->
        <div class="text-right pt-4 mt-4 border-t-2">
          <span class="text-white">Total amount: </span>
          <span class="text-secondary">{{ cartStore.cartTotal }}</span>

        </div>
      </div>


      <div v-else>
        <p class="text-white">Your cart is empty</p>
      </div>
      
    </div>
  </template>
  
  <script setup>
    import { useCartStore } from '@/stores/cartStore'

    const cartStore = useCartStore()

  </script>
  
  <style scoped>
  
  </style>