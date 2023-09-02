import {fetchRequestHandler} from '@trpc/server/adapters/fetch';

import {appRouter} from '@/server';
import {CreateNextContextOptions} from '@trpc/server/adapters/next';



const handler = (req:Request) =>
    fetchRequestHandler({
        endpoint:'/api/trpc',
        req,
        router:appRouter,
        createContext:()=>((opts:CreateNextContextOptions)=>{
            return {
                Admin:true
            }
        }),
    })

export {handler as GET,handler as POST};