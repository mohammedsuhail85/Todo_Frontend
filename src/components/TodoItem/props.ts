import { Todo } from "../../utils/types/Todo.type";

export default interface TodoItemProps {
  
  todoData: Todo
  
  markTodo: Function

  markTodoRemoved: Function
  
}