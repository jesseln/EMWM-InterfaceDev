<template>
    <div class="site-wrapper">
      
      <header class="site-header">
        <div class="site-header-title-wrapper">
          <h1 class="site-header-title">The Library of Libraries</h1>
          <p class="site-header-subtitle">Early Modern Women's Marginalia</p>
        </div>
      </header>
      <div class="main-navbar">
          <NuxtLink to="/" >
            <h2 class=main-navbar-link>The Library of Libraries</h2>
          </NuxtLink>
      </div>
      <div class="library-slot">
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
  //libraryStore call is placed in this layout file as this will initially update the store state from the database for all pages.
  const libraryStore = useLibraryStore();
  const yourShelfStore = useYourShelfStore();
  const { parseDatabase } = useViewStore();
  
  libraryStore.getAgents();
  libraryStore.getBooks();
  libraryStore.getMarks();
  watchEffect(()=>{
    // parseDatabase(libraryStore.agents)
    parseDatabase(libraryStore.books)
    // parseDatabase(libraryStore.marks)
  })
  

  </script>
  
  <style scoped>
    .badge{
      position: relative;
      left: -15px;
    }
  </style>