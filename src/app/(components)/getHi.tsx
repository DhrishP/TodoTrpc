"use client"

import { trpc } from "../(trpc)/client"

export default function GetHi(){
    const getHi = trpc.sayHi.useQuery()
    const getTodo = trpc.getTodos.useQuery()
    const doComplete = trpc.setDone.useMutation({onSettled:()=>getTodo.refetch()})
    const addTodo = trpc.addTodo.useMutation({onSettled:()=>getTodo.refetch()})
    return(
        <div className="h-full">
            <h3 className="text-center font-semibold mt-10 ">{JSON.stringify(getHi)}</h3>
            
        </div>
    )
}