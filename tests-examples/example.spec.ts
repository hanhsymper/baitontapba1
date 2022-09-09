import { test, expect } from '@playwright/test';
test('test login', async ({ page }) => {
  await page.goto('https://accounts.shopbase.com/sign-up');

  await page.locator('//input[@id="email"]').fill("honghanh83848gmail.com");
  await page.locator('//input[@id="password"]').fill("Honghanh12@");
  await page.locator("//input[@id='shop_name']").fill("Hong_Hanh_shop_ahihi")

  await page.locator('//*[contains(text(),"Sign up")]').click();
  let text=await page.locator("//div[@class='s-form-item__error']").innerText();
  console.log(text)
  expect(text).toEqual("Please enter a valid email address");

});

