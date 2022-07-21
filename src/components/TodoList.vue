<template>
<div>
  <ul>
    <!-- 텍스트값만 중복되지 않으면 v-bind:key가 유일하기에 속도 가속화   -->
    <!-- index를 넣으면 해당 리스트의 순서를 부여   -->
    <li v-for= "(todoItem, index) in todoItems" v-bind:key="todoItem" class="shadow">
      {{ todoItem }}
    <!-- todoItem과 index를 메서드로 넘길수 있음   -->
      <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
      <font-awesome-icon icon="fa-solid fa-trash-can" />
      </span>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'TodoList',
  data: function (){
    return{
      todoItems:[]
    }
  },
  methods:{
    removeTodo:function (todoItem, index){
      console.log(todoItem,index)
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index,1);
    }
  },

  created: function (){
    if(localStorage.length>0){
      for(let i=0 ; i<localStorage.length; i++){
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          this.todoItems.push(localStorage.key(i)) //로컬스토리지의 키값을 todoItems에 삽입
        }
      }
    }
  },


}
</script>

<style>
ul{
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li{
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.removeBtn{
  margin-left: auto;
  color: #de4343;
}
.checkBtn{
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted{
  color: #b3adad;
}
.textCompleted{
  color: #b3adad;
}
</style>
