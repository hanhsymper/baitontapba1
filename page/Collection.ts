import { Page } from "@playwright/test";
import { CommonPage } from "./Page";
import {ViewProduct} from "./ViewProduct"
export class Collection extends CommonPage{
    constructor(domain:string,page:Page){
        super(domain,page)
    }
    async gotoProductURL(path:string){
       // https://au-abandoned-prodtest.onshopbase.com/products/urban-girl-t-shirt

            await this.page.goto(`https://${this.domain}/${path}`);
            await this.page.waitForNavigation();
            return new ViewProduct(this.domain,this.page)

            
        }
    async gotoProductItem(name:string){
        await Promise.all([
            this.page.locator(`//span[text()='${name}']`).click(),
            this.page.waitForLoadState('load')

        ]);
        return new ViewProduct(this.domain,this.page)
    }
   
 
}