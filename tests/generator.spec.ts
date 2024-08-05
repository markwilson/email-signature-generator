import { test, expect } from "@playwright/test";

test("full flow", async ({ page, browserName }) => {
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

  // playwright doesn't currently support clipboard access and this fails in webkit
  if (browserName !== "webkit") {
    // get the contents of the clipboard
    const clipboardValue = await (
      await page.evaluateHandle(() => navigator.clipboard.readText())
    ).jsonValue();

    // check the clipboard contains all of the form values
    expect(clipboardValue).toContain("Joe Bloggs");
    expect(clipboardValue).toContain("he/him/his");
    expect(clipboardValue).toContain("Head Tester");
    expect(clipboardValue).toContain("joe.bloggs@example.com");
  }

  // wait for the button to reset
  page.waitForTimeout(3000);

  // check the button reverts back to being enabled
  button = page.getByText("Copy signature");
  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
});
