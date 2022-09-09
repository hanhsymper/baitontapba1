import {test,expect} from "@playwright/test";
import {DATA} from "../data/data_test_add_product"
const authorization = 'd181079644dcb15ec2208f696f9deb9e2e6ce8321bbecb5312bba4ee31904ea6';




test("test add product",async({request})=>{
    let handle:string;
    let id:number;
    let title:string;
    await test.step("add product",async()=>{
        const b=await request.post("https://shop-test-abc.onshopbase.com/admin/products.json?skip_package_checking=undefined",{
            data: DATA,
            headers:{
                'X-ShopBase-Access-Token':authorization
            }
        });
        let repon=await b.json();
        handle=repon.product.handle;
        id=repon.product.id;
        title=repon.product.title;
        await expect(b).toBeOK();
        await expect(b.status()).toBe(200);
        
    });
    await test.step("check storefront",async()=>{
        //https://shop-test-abc.onshopbase.com/admin/products/1000000406421124.json
        const data=await request.get(`https://shop-test-abc.onshopbase.com/api/catalog/next/product/${handle}.json?digest=5e96338fd3ff04431d2650bdad629d9c2dfd73cc28e268e1428d19084d50be5e`);
        let respon=await data.json();
        let respon_id=respon.result.id;  
        let respon_title=respon.result.title;      
        expect(respon_id).toEqual(id);
        expect(respon_title).toEqual(DATA.product.title);
        // expect(respon.result).toEqual(expect.objectContaining({
        //     title: DATA.product.title,
        //     description: DATA.product.body_html,
        //   }));
    })
})
