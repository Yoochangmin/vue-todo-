<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <!-- v-bind를 사용하여 todoItems의 데이터를 하위 컴포넌트로 보냄   -->
    <TodoList v-bind:propsdata = "todoItems"
              v-on:removeItem="removeOneItem"
              v-on:toggleItem="toggleOneItem"></TodoList>
    <TodoFooter v-on:clearAll="clearAllItem"></TodoFooter>
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
      todoItems:[]
    }
  },
  methods:{
    //todoInput에 있는 addItem 함수의 일부를 App.vue로
    // 할일 추가 기능
    addOneItem: function (todoItem) {
      //객체 생성 -> 텍스트가 체크 되었는지 확인 하기 위해
      let obj = {completed: false, item: todoItem} //todoItem == this.newTodoItem
      //2. 저장 로직
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj)
    },
    removeOneItem: function (todoItem, index){
      //todoItem.item 특정 키값 삭제
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index,1);
    },
    toggleOneItem: function (todoItem, index){
      // todoItem.completed = !todoItem.completed
       this.todoItems[index].completed = !this.todoItems[index].completed;
      //removeItem 하는 이유 : 설정값을 바꾸고 다시 저장할려면 지웟다가 다시 추가해야함. => 로컬 스토리지의 데이터 갱신
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItem:function (){
      localStorage.clear()
      this.todoItems = [];
    }
  },
  // 생성된 리스트 목록 view
  created: function (){
    if(localStorage.length>0){
      for(let i=0 ; i<localStorage.length; i++){
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          //JSON.stringify로 문자열로 저장되어있는 로컬스토리지의 value값을 가져온다음 그 값을 다시 객체로 변환시켜 todoitems에 삽입
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
          // this.todoItems.push(localStorage.key(i)) //로컬스토리지의 키값을 todoItems에 삽입
        }
      }
    }
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
