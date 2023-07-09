<template>
    <div>
      <h2 class="text-white text-2xl text-center my-8">Books {{ console.log(supabase) }}</h2>
  
      <div class="grid grid-cols-2 gap-7">
        <div v-for="book in books">
          <BookCard :book="book" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    // fetch all books
    // const { data: books } = await useFetch('http://localhost:4000/books')


    const supabase = useSupabaseClient()

  </script>
  
  <style scoped>
  
  </style>