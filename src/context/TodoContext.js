import { createContext, useContext } from 'react';

export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: 'Learn React',
      complete: false,
    },
  ],
  addTodo: () => {},
  deleteTodo: () => {},
  editTodo: () => {},
  toggleTodo: () => {},
});

export const TodoContextProvider = TodoContext.Provider;

export const useTodo = () => {
  return useContext(TodoContext);
};
