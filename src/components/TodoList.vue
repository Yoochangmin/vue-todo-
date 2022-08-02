<template>
<div class="listContainer">
  <transition-group name="list" tag="ul">
    <!-- 텍스트값만 중복되지 않으면 v-bind:key가 유일하기에 속도 가속화   -->
    <!-- index를 넣으면 해당 리스트의 순서를 부여   -->
    <li v-for= "(todoItem, index) in this.$store.state.todoItems" v-bind:key="todoItem.item" class="shadow">
        <font-awesome-icon  icon="fa-solid fa-check" class="checkBtn"
        v-bind:class="{checkBtnCompleted: todoItem.completed}" v-on:click="toggleComplete(todoItem,index)"/>
    <!-- v-bind:class => 기존의 html속성에다가 동적인 값을 부여 true이면 속성 적용 false이면 속성적용 x    -->
      <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
    <!-- todoItem과 index를 메서드로 넘길수 있음   -->
      <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
      <font-awesome-icon icon="fa-solid fa-trash-can" />
      </span>
    </li>
  </transition-group>
</div>
</template>

<script>
export default {
  name: 'TodoList',
  //App.vue에 있는 todoItems의 데이터를 받아옴

  methods:{
    //list 할일 제거
    removeTodo:function (todoItem, index){
      // "removeItem"이라는 이벤트가 발생하면
      // todoItem과 index 데이터를 상위 컴포넌트 App.vue로 보냄
      this.$emit('removeItem',todoItem,index)

    },
    // list 할일 완료 기능
    toggleComplete: function (todoItem, index){
      console.log(todoItem, index)
      this.$emit('toggleItem', todoItem)

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


.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
