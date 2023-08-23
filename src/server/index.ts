import { publicProcedure,router } from "./trpc";
import {z} from 'zod'
import prisma from "../../prisma/client";
export const appRouter = router({
    sayHi: publicProcedure.query(()=>{
        return {greeting:'Hello World!'}
    }),
    addTodo:publicProcedure.input(z.string()).mutation(async(opts)=>{
        await prisma.todo.create({data:{task:opts.input}})
    }),
    getTodos:publicProcedure.query(async()=>{
        await prisma.todo.findMany()
    }),
    setDone:publicProcedure.input(z.string()).mutation(async(opts)=>{
        await prisma.todo.update({
            where:{
                id:opts.input,
            },
            data:{
                completed:true
            }
        })
    })
})

export type AppRouter = typeof appRouter; //For typescript