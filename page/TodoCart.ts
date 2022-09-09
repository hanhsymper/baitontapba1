import { Page } from "@playwright/test";

export class TodoCart{
    page:Page;
    async goto(){
        return this.page.goto("");
    }
    async addToCart(item){
        
    }

}