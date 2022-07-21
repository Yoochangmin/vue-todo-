<template>
<div class="inputBox shadow">
  <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
  <!--  1.input에 입력된 텍스트 값을 동적으로 바로바로 vue instance 안에 매핑-->
  <span class="addContainer" v-on:click="addTodo"><font-awesome-icon class="addBtn" icon="hat-wizard" /></span>
</div>
</template>

<script>
export default {
  name: 'TodoInput',

  data: function (){
    return{
      newTodoItem: "",
    }
  },
  methods:{
    addTodo:function (){
      //2. 저장 로직
      localStorage.setItem(this.newTodoItem, this.newTodoItem);
      this.clearInput()  //this 사용시 데이터 안에 있는 속성과 메소드안에 선언한 메소드도 접근 가능 같은 인스턴스를 가리키기에
    },
    //3.초기화
    clearInput:function (){
      this.newTodoItem='';
    }
  }
}
</script>

<style scoped>
/*focus 해당 태그에 초점이 맞춰졌을때 css 발동*/
  input:focus{
    outline: none;
  }
  .inputBox{
    background-color: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
  }
  .inputBox input{
    border-style: none;
    font-size: 0.9rem;
  }
  .addContainer{
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
  }
  .addBtn{
    vertical-align: middle;
  }
</style>
