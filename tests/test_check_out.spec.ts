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
    });
  });
});
