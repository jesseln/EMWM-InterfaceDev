<template>
    <div>
      <!-- <div class="home-header">
        <h2 class="home-header-title">The Library of Libraries</h2>
      </div> -->
      <ViewSidebar />
        <div v-if="libraryStore.libraryItems.length">
          <LibraryContainer :libraryItems="libraryStore.libraryItems" />
        </div>

    </div>
  </template>
  
  <script setup>
  const libraryStore = useLibraryStore();

  </script>
  
  <style scoped>
  
  </style>