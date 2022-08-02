import Vue from "vue";
import Vuex from 'vuex';

//Vue의 플러그인 Vue의 기능 추가시 사용
Vue.use(Vuex);

const storage = {
    fetch(){       // TodoInput에서 입력한 데이터들을 리스트 형식으로 출력하기 위한 함수       fetch: function (){  }
        const arr = [];
        if(localStorage.length>0){
                for(let i=0 ; i<localStorage.length; i++){
                    if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                        //JSON.stringify로 문자열로 저장되어있는 로컬스토리지의 value값을 가져온다음 그 값을 다시 객체로 변환시켜 todoitems에 삽입
                        arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                        // this.todoItems.push(localStorage.key(i)) //로컬스토리지의 키값을 todoItems에 삽입
                    }
                }
            }
        return arr;
    },
}

export const store = new Vuex.Store({
  state:{
    headerText: 'Todo it!!',
    todoItems: storage.fetch(),  //todo리스트를 담을 아이템
  },

  mutations:{
      // 할일 추가 기능, state와 TodoList.vue에서의 newTodoItem을 인자로 받아옴
      addOneItem: function (state,todoItem) {
          //객체 생성 -> 텍스트가 체크 되었는지 확인 하기 위해
          let obj = {completed: false, item: todoItem} //todoItem == this.newTodoItem
          //2. 저장 로직
          localStorage.setItem(todoItem, JSON.stringify(obj));
          state.todoItems.push(obj)
      },
        //할일 삭제 기능
      removeOneItem: function (state,payload){
          //todoItem.item 특정 키값 삭제
          localStorage.removeItem(payload.todoItem.item);
          state.todoItems.splice(payload.index,1);
      },
      // 할일 완료 체크 기능
      toggleOneItem: function (state,payload){
          // todoItem.completed = !todoItem.completed
          state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
          //removeItem 하는 이유 : 설정값을 바꾸고 다시 저장할려면 지웟다가 다시 추가해야함. => 로컬 스토리지의 데이터 갱신
          localStorage.removeItem(payload.todoItem.item);
          localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
      },
      //할일 전부 삭제 기능
      clearAllItem:function (state){
          localStorage.clear()
          state.todoItems = [];
      }
  }
});