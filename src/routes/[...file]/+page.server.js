import { hcms } from '$lib/hcms.js';
import { dev } from '$app/environment';
import { PUBLIC_HCMS_URL } from '$env/static/public';
import { PUBLIC_HCMS_INDEX } from '$env/static/public';

export async function load(params){
    try{
        console.log('params', params)
        //return await hcms.getDocuments(dev, PUBLIC_HCMS_URL, params, PUBLIC_HCMS_INDEX)
        return await hcms.getDocuments(dev, 'http://website-hcms:8080/api/docs', params, 'index.md')
    }catch(err){
        console.log(err)
    }
}  