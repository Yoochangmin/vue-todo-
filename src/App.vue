<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput></TodoInput>
    <!-- v-bind를 사용하여 todoItems의 데이터를 하위 컴포넌트로 보냄   -->
    <TodoList>
<!--      vuex의 mutation사용으로 더이상 필요 없음-->
<!--        v-bind:propsdata = "todoItems"-->
<!--              v-on:removeItem="removeOneItem"-->
<!--              v-on:toggleItem="toggleOneItem">-->
    </TodoList>
    <TodoFooter></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoFooter from "./components/TodoFooter.vue";
import TodoList from "./components/TodoList.vue";
import TodoInput from "./components/TodoInput.vue";


export default {
  //로컬스토리지에 있는 데이터가 이제는 app.vue에서 관리

  data: function (){
    return{
    }
  },
  methods:{

  },

  components: {
    // /*컴포넌트 태그명 : 컴포넌트 내용*/
    TodoFooter,
    // eslint-disable-next-line
    TodoHeader,
    // eslint-disable-next-line
    TodoInput,
    // eslint-disable-next-line
    TodoList,
    // eslint-disable-next-line

  }
}

</script>

<style>
body{
  text-align: center;
  background-color: #F6F6F6;
}
input {
  border-style: groove;
  width: 200px;
}
button{
  border-style: groove;
}
.shadow{
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
