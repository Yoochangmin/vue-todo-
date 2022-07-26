<template>
<div class="listContainer">
  <ul>
    <!-- 텍스트값만 중복되지 않으면 v-bind:key가 유일하기에 속도 가속화   -->
    <!-- index를 넣으면 해당 리스트의 순서를 부여   -->
    <li v-for= "(todoItem, index) in todoItems" v-bind:key="todoItem.item" class="shadow">
        <font-awesome-icon  icon="fa-solid fa-check" class="checkBtn"
        v-bind:class="{checkBtnCompleted: todoItem.completed}" v-on:click="toggleComplete(todoItem,index)"/>
    <!-- v-bind:class => 기존의 html속성에다가 동적인 값을 부여 true이면 속성 적용 false이면 속성적용 x    -->
      <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
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
    //list 제거
    removeTodo:function (todoItem, index){
      console.log(todoItem,index)
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index,1);
    },
    // list 체크
    toggleComplete: function (todoitem, index){
      console.log(todoitem, index)
      todoitem.completed = !todoitem.completed
      //removeItem 하는 이유 : 설정값을 바꾸고 다시 저장할려면 지웟다가 다시 추가해야함. => 로컬 스토리지의 데이터 갱신
      localStorage.removeItem(todoitem.item);
      localStorage.setItem(todoitem.item, JSON.stringify(todoitem))
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


}
</script>

<style scoped>
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
.listContainer{
  margin: 0 auto;

  width: 1200px;
}
.removeBtn{
  margin-left: auto;
  color: #de4343;
}
.checkBtn{
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted{
  color: red;

}
.textCompleted{
  color: red;
  text-decoration-line: line-through;
}
</style>
