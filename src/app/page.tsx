
import TodoList from './(components)/get-todo';
import { serverClient } from './(trpc)/server-client'

export default async function Home() {
  const getTodos =await serverClient.getTodos();
  return (
    <>
    <TodoList inititalTodos={getTodos}/>
    </>
  )
}
