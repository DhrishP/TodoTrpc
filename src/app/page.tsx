import Image from 'next/image'
import GetHi from './(components)/getHi'
import { serverClient } from './(trpc)/server-client'

export default async function Home() {
  const getTodos =await serverClient.getTodos();
  return (
    <>
    <GetHi inititalTodos={getTodos}/>
    </>
  )
}
