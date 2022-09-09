import { expect } from "@playwright/test";

const { request,test } = require('@playwright/test');
test("get_api",async({request})=>{
    let a=await request.get("https://monitor.onshopbase.com/api/catalog/next/product/ombre-jumbo-braids-hair-24inch-100g-synthetic-braiding-hair-crochet-braid-hair-extension-for-women-blond-brown-pink-purple.json");
    let b=await a.json()
    // console.log(await a.json().result.id);
    expect(b.result.id).toEqual(1000000072213752)

    const c=b.result.images;
    // console.log(c)
    // let d=c.find((e)=>{
    //     return e.id===561327771
    // });
    
    const e=c.findIndex((e)=>{
       return e.id===1000000072213752 
    })
    // expect(e)

    expect(e).not.toEqual(-1)
})





