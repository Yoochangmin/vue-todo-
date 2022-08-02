<template>
  <header>
    <h1>{{ this.$store.state.headerText }}</h1>
<!--    <font-awesome-icon icon="fa-solid fa-plus" />-->
  </header>

</template>

<script>
export default {
  name: 'TodoHeader'
}
</script>

<style>
h1{
  color: #2F3B52;
  font-weight: 900;
  margin: 2.5rem 0 1.5rem;

}
</style>
