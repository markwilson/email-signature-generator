import { test, expect } from "@playwright/test";

test("test", async ({ page, context }) => {
  // provide access to the clipboard to ensure the generator writes to it correctly
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);

  // go to the generator
  await page.goto("http://localhost:3000/email-signature-generator");

  // fill in the form
  await page.getByPlaceholder("Name").fill("Joe Bloggs");
  await page.getByPlaceholder("Pronouns").fill("he/him/his");
  await page.getByPlaceholder("Job Title").fill("Head Tester");
  await page.getByPlaceholder("Email").fill("joe.bloggs@example.com");

  // submit the form
  await page.click("button");

  // check that the disabled copied button is temporarily displayed
  let button = page.getByText("Copied");
  await expect(button).toBeVisible();
  await expect(button).toBeDisabled();

  // get the contents of the clipboard
  const clipboardValue = await (
    await page.evaluateHandle(() => navigator.clipboard.readText())
  ).jsonValue();

  // check the clipboard contains all of the form values
  expect(clipboardValue).toContain("Joe Bloggs");
  expect(clipboardValue).toContain("he/him/his");
  expect(clipboardValue).toContain("Head Tester");
  expect(clipboardValue).toContain("joe.bloggs@example.com");

  // check the button reverts back to being enabled
  button = page.getByText("Copy signature");
  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
});
