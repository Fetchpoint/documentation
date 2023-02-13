import type { getDATA } from "src/interfaces"
import { json } from '@sveltejs/kit';

export const GET = (data:getDATA)=>{
    return new Promise((resolve,reject)=>{
        let files = import.meta.glob(`/src/routes/docs/**/*.md`)
        let imported:{[name:string]:unknown} = {};
        let f = Object.entries(files);
        let flen = f.length;

        if(!flen) reject('No files');

        for(let [name,imp] of Object.entries(files)){
            imp().then((r)=>{
                imported[name] = r;
            }).catch(e=>{
                reject(e)
            }).finally(()=>{
                if(!--flen){
                    let list = parseImported(imported);
                    let files:{[name:string]:unknown} = {};
                    for(let [i,v] of Object.entries(imported)){
                        files[i.split('docs')[1]] = v;
                    }
                    resolve(json({
                        list,
                        files
                    }));
                };
            })
        }
    })
}

function parseImported(imported: {
    [name: string]: unknown;
}){
    let parsed:{
        [name: string]: unknown;
    } = {};

    for(let [name,module] of Object.entries(imported)){
        let n:string = name.split('/docs/md/')[1];
        let mdDirectory = n.split('/');
        addToParsed(parsed,mdDirectory,0,module)
        // generateTree(parsed,directory,module);
    }
    return parsed;
}

function addToParsed(parsed:{
    [name: string]: any;
},directory:string[],index:number,module:any):any{
    if(directory[index].includes('.md')) parsed[directory[index]] = {
        [directory[index]]:module
    };
    else if(directory[index+1]){ 
        if(!parsed[directory[index]]) parsed[directory[index]] = {nav_type:'_f'};
        addToParsed(parsed[directory[index]],directory,index+1,module)
    }
}

export interface mdtree{
    [name:string]:string|mdtree
}