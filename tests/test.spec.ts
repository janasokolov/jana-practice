import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  /* Check list */
  await expect(page.locator(".content-list")).toBeVisible();
  await expect(page.locator(".content-details")).toBeVisible();
  const list = await page.$(".content-list");

  if (list) {
    const liElement = await list.$("li");
    expect(liElement).toBeTruthy();
  }
  let elements = await page.$$("li");
  const elementCount = elements.length;

  /* Add element */
  await page.getByRole("button", { name: "Clear" }).click();
  await page.locator("#field1").fill("Field 1");
  await page.locator("#field2").fill("Field 2");
  await page.locator("#field3").fill("Field 3");
  await page.locator("#field4").fill("4");
  await page.locator("#field5").fill("2023-07-01");
  await page.locator("#saveButton").click();
  elements = await page.$$("li");
  expect(elements.length).toEqual(elementCount + 1);
  expect(page.locator("li:last-child .field1")).toContainText("Field 1");
  expect(page.locator("li:last-child .field2")).toContainText("Field 2");
  expect(page.locator("li:last-child .field3")).toContainText("Field 3");
  expect(page.locator("li:last-child .field4")).toContainText("4");
  expect(page.locator("li:last-child .field5")).toContainText(
    "Sat Jul 01 2023 03:00:00 GMT+0300 (Eastern European Summer Time)"
  );

  /* Edit field 1 */
  await page.locator("li:last-child .field1").click();
  await page.locator("#field1").fill("Test 1");
  await page.locator("#saveButton").click();
  expect(page.locator("li:last-child .field1")).toContainText("Test 1");

  /* Edit field 2 */
  await page.locator("li:last-child .field2").click();
  await page.locator("#field2").fill("Test 2");
  await page.locator("#saveButton").click();
  expect(page.locator("li:last-child .field2")).toContainText("Test 2");

  /* Edit field 3 */
  await page.locator("li:last-child .field3").click();
  await page.locator("#field3").fill("Test 3");
  await page.locator("#saveButton").click();
  expect(page.locator("li:last-child .field3")).toContainText("Test 3");

  /* Edit field 4 */
  await page.locator("li:last-child .field4").click();
  await page.locator("#field4").fill("1");
  await page.locator("#saveButton").click();
  expect(page.locator("li:last-child .field4")).toContainText("1");

  /* Edit field 5 */
  await page.locator("li:last-child .field5").click();
  await page.locator("#field5").fill("2023-07-02");
  await page.locator("#saveButton").click();
  expect(page.locator("li:last-child .field5")).toContainText(
    "Sun Jul 02 2023 03:00:00 GMT+0300 (Eastern European Summer Time)"
  );

  /* Delete element */
  await page.locator("li:last-child .deleteButton").click();
  elements = await page.$$("li");
  expect(elements.length).toEqual(elementCount);

  /* Check field1 */
  await page.getByRole("button", { name: "Clear" }).click();
  await page.locator("#field2").fill("Field 2");
  await page.locator("#field3").fill("Field 3");
  await page.locator("#field4").fill("4");
  await page.locator("#field5").fill("2023-07-01");
  await page.locator("#saveButton").click();
  elements = await page.$$("li");
  expect(elements.length).toEqual(elementCount);

  /* Check field2 */
  await page.getByRole("button", { name: "Clear" }).click();
  await page.locator("#field1").fill("Field 1");
  await page.locator("#field3").fill("Field 3");
  await page.locator("#field4").fill("4");
  await page.locator("#field5").fill("2023-07-01");
  await page.locator("#saveButton").click();
  elements = await page.$$("li");
  expect(elements.length).toEqual(elementCount);

  /* Check field3 */
  await page.getByRole("button", { name: "Clear" }).click();
  await page.locator("#field1").fill("Field 1");
  await page.locator("#field2").fill("Field 2");
  await page.locator("#field4").fill("4");
  await page.locator("#field5").fill("2023-07-01");
  await page.locator("#saveButton").click();
  elements = await page.$$("li");
  expect(elements.length).toEqual(elementCount);

  /* Check field4 */
  await page.getByRole("button", { name: "Clear" }).click();
  await page.locator("#field1").fill("Field 1");
  await page.locator("#field2").fill("Field 2");
  await page.locator("#field3").fill("Field 3");
  await page.locator("#field4").fill("");
  await page.locator("#field5").fill("2023-07-01");
  await page.locator("#saveButton").click();
  elements = await page.$$("li");
  expect(elements.length).toEqual(elementCount);

  /* Check numbering */
  await page.locator("li:last-child .deleteButton").click();
  elements = await page.$$("li");
  expect(elements.length).toEqual(elementCount - 1);
  expect(page.locator("li:first-child .id")).toContainText("1");

  /* Delete all */
  let deleteButtons = await page.$$(".deleteButton");

  for (const button of deleteButtons) {
    await deleteButtons[0].click();
  }
  elements = await page.$$("li");
  expect(elements.length).toEqual(0);
});
