import { publicProcedure, router} from "./trpc";

export const tpRoute = router({
    getTp:publicProcedure.query(()=>{
        return "hello world gigachad"
    })
})

