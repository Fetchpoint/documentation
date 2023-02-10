import type { loadDATA } from "src/interfaces"
import { convertmd } from "./mark"

export const load = (data:loadDATA)=>{
    if(data){
        return convertmd(data).then(html=>{
            return {
                html
            }
        }).catch(e=>{
            return {
                html:e
            }
        })
    }else{ return {html:undefined} }
}