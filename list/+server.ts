import type { getDATA } from "src/interfaces"
import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export const GET = (data:getDATA)=>{
    return walk('./src/routes/documentation/md/').then(j=>{
        return json(j);
    });
}

export interface mdtree{
    [name:string]:string|mdtree
}
function walk (dir:string) {
    return new Promise<mdtree>((resolve,reject)=>{
        let results:mdtree = {};
        fs.readdir(dir, (e, list) => {
            if (e) reject(e);
            let pending = list.length;
            if (!pending) reject('Nil doc files');
    
            list.forEach((file) => {
                file = path.resolve(dir, file);
                fs.stat(file, (e, stat) => {
                    if(e) reject(e);
                    if (stat && stat.isDirectory()) {
                        walk(file).then(j=>{
                            results[path.basename(file).split('.md')[0]] = j;
                            if (!--pending){
                                resolve(results);
                            }
                        });
                    } else {
                        results[path.basename(file).split('.md')[0]] = file.split('src\\routes\\documentation\\md\\')[1];
                        if (!--pending){
                            resolve(results);
                        }
                    }
                });
            });
        });
    })
};