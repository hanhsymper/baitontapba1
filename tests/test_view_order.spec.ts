// import { expect,test,chromium } from "@playwright/test";
// import { Home } from "../page/Home";
// import { ViewProduct } from "../page/ViewProduct";
// import { Collection } from "../page/Collection";
// import { DATA } from "../data/product";
// import { Cart } from "../page/Cart";
// import converString from "../helper/string"
// // export const testViewOrder=(data)=>{
//     test.describe("test checkout",()=>{
//         let home:Home;
//         let collection:Collection;
//         let viewproduct:ViewProduct;
//         let browser;
//         let page;
//         let cart:Cart;
//         let listProduct:any[]=[];
//         let listPrice:any[]=[];
//         let sum=0;

//     test.beforeAll(async({ })=>{
//         browser = await chromium.launch();
//          page = await browser.newPage();
//          home=new Home("au-abandoned-prodtest.onshopbase.com",page);
//          await home.gotoHome();
//         collection= await home.gotoCollection("all");
//         for(let i=0;i<DATA.length;i++){
//             listProduct.push(DATA[i].name);
//             listPrice.push(DATA[i].price);
//             sum+=DATA[i].price;
//             let url=converString(DATA[i].name.toLowerCase())
//             viewproduct= await home.gotoProductURL(`products/${url}`)
//             cart= await viewproduct.addProductToCart();
//             // console.log()
//             // await page.waitForTimeout(1000);
//             // if(i!==data.length-1){
//             //     await page.goBack('load')
//             // }
           
//        }
//      })
//      test("test product in cart",async({page})=>{
//         let nameProduct=await cart.getInforToCart("//div[@class='product-cart__details']//div[@class='product-cart__name']");
//         expect(nameProduct).toEqual(listProduct)
//         // expect("abc").toEqual("abc")
//      })
//     test("total all product to cart",async({page})=>{
//         let totalProduct=await cart.getTotal();
//         let total="$"+sum.toFixed(2)
//         expect(total).toEqual(totalProduct)
//         console.log(totalProduct,total);
//     })   
//     })
//     // test.afterAll(())

// // }
// // testViewOrder(DATA);

import { test, expect } from "@playwright/test";
import { Checkout } from "../page/Checkout";
import { Collection } from "../page/Collection";
import { ViewProduct } from "../page/ViewProduct";
import { Cart } from "../page/Cart";
import { Home } from "../page/Home";

test.describe("Checkout function", () => {
  test("Checkout an order", async ({ page }) => {
    let shopCollection: Collection;
    let productDetail: ViewProduct;
    let cart: Cart;
    let checkout: Checkout;
    let homePage: Home;
    await test.step("Initialize env", async () => {
      homePage = new Home("au-abandoned-prodtest.onshopbase.com", page);
      await homePage.gotoHome();
    });

    await test.step("Verify if we are in the home page", async () => {
      await expect(homePage.page.locator("(//strong[@class='flex items-center m0 h1'])[1]")).toHaveText(
        "au-abandoned-prodtest"
      );
    });

    await test.step("Go to collection page", async () => {
      shopCollection = await homePage.gotoCollection("best-selling");
    });

    await test.step("Go to product and add to cart", async () => {
      productDetail = await shopCollection.gotoProductItem("Suit");
      cart = await productDetail.addProductToCart();
    });

    await test.step("Checkout the order", async () => {
    checkout = await cart.clickCheckOut();
      await checkout.enterUserInfo({
        email: "honghanh12011995@gmail.com",
        firstName: "Hồng",
        lastName: "Hạnh",
        address: "Ha Noi",
        country: "Viet Nam",
        state: "Ha Noi",
        city: "Ha Noi",
        zipcode: "100000",
        phoneNumber: "0344321906",
      });

      await checkout.clickContinuePayment();

      await checkout.enterCardInfo({
        holderName: "ĐỖ THỊ HỒNG HẠNH",
        number: "4242 4242 4242 4242",
        expireDate: "12/26",
        cvv: "111",
      });
      await checkout.clickCompleteOrder();
    });

    await test.step("Verify whether order to be completed", async () => {
     await expect(checkout.page).toHaveURL(/.*step=step=thank_you/);
     await expect(checkout.page.locator(".section__column.section__column--half .os-step__info").innerText()).toEqual("honghanh12011995@gmail.com")
    await expect(checkout.page.locator(".checkout-product__name").innerText()).toEqual("Suit")
  });
});
})

