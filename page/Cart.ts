import { Page } from "@playwright/test";
import { CommonPage } from "./Page";
// import {CheckO}
import { Checkout } from "./CheckOut";
export class Cart extends CommonPage{
    constructor(domain:string,page:Page){
        super(domain,page)
    }
    async getInforToCart(path:string){
        const rows = this.page.locator(path);
        const texts = await rows.allTextContents();
        return texts;
        // product-cart__details
        
    }
    async getTotal(){
        const text=await this.page.locator("//div[@class='h5 total-line__price cart__subtotal-price']").innerText();
        return text;
    }
    public async clickCheckOut(){
        await Promise.all([ 
            this.page.locator("//button[contains(text(),'Checkout')]").click(),
            this.page.waitForNavigation(),
          ]);
        return new Checkout(this.domain,this.page)
    }
}