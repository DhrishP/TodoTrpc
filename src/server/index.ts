import { publicProcedure,router } from "./trpc";
import {z} from 'zod'
import prisma from "../../prisma/client";
export const appRouter = router({
    sayHi: publicProcedure.query(()=>{
        return "Hello World"
    }),
    addTodo:publicProcedure.input(z.string()).mutation(async(opts)=>{
        await prisma.todo.create({data:{task:opts.input}})
    }),
    getTodos:publicProcedure.query(async()=>{
       const res =  await prisma.todo.findMany({take:10})
       return res;
    }),
    setDone:publicProcedure.input(z.string()).mutation(async(opts)=>{
        const res = await prisma.todo.findFirst({
            where:{
                id:opts.input
            }
        })
        await prisma.todo.update({
            where:{
                id:opts.input,
            },
            data:{
                completed:res?.completed === true ? false : true
            }
        })
    })
})

export type AppRouter = typeof appRouter; //For typescript