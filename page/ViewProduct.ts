import { Page } from "@playwright/test";
import { CommonPage } from "./Page";
import { Cart } from "./Cart";
export class ViewProduct extends CommonPage{
    constructor(domain:string,page:Page){
        super(domain,page);
    }
    async getText(){
        return this.page.locator(`//h1[@class="h3 product__name is-uppercase mt0 mb12"]`).innerText();
     }
     async addProductToCart(){
        // this.page.locator("//span[contains(text(),'Add to cart')]").click();
       await Promise.all([ 
            this.page.locator("//button[@id='add-to-cart']//span[text()='Add to cart']").click(),
            this.page.waitForNavigation(),
          ]);
          return new Cart(this.domain,this.page)

     }
    }