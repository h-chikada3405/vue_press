<template>
  <div id="app">
    <header>
      <h1>My Awesome Vue App</h1>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>&copy; 2025 My Awesome Vue App. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

header {
  background-color: #35495e;
  color: white;
  padding: 20px;
}

nav {
  margin-top: 10px;
}

footer {
  margin-top: 20px;
}
</style>
