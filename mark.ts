import {marked} from "marked";
import type { loadDATA } from "src/interfaces";
export const convertmd = (d:loadDATA)=>{
    let repo = '';
    let version = '';
    let focus = 'index';
    
    if(d.params.repo) repo = d.params.repo+'/';
    if(d.params.version) version = d.params.version+'/';
    if(d.params.focus) focus = d.params.focus;

    let files = import.meta.glob(`/src/routes/documentation/**/*.md`)
    console.log("E", files)
    
    for(let [name,imp] of Object.entries(files)){
        imp().then((r)=>{
            console.log(r);
            // return r.text().then(t=>{
            //     return marked.parse(t);
            // }).catch(e=>{console.log(e);throw 'Docs endpoint and markdown file found, though markdown file empty.'});
        }).catch(e=>{console.log(e);throw 'Docs endpoint viable, though markdown file not available.'});
    }
} 