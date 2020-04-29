<template>
  <div id="app">
    <app-header></app-header>
    <app-drawer></app-drawer>
    <main class="pb-24">
      <router-view/>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<style lang="scss">
* {
    @apply font-body;
}
</style>
