import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://test470.nop-station.com/');
  await page.getByRole('button', { name: 'No' }).click();
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('fghfghhf');
  await page.getByLabel('Password:').click();
  await page.getByLabel('Password:').fill('hffghh');
  await page.locator('div').filter({ hasText: /^Log in$/ }).click();
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('fghfghhf@r');
  await page.getByText('Wrong email').click();
  await expect(page.getByText('Wrong email')).toBeVisible();
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('fghfghhf');
  await page.getByText('Please enter a valid email').click();
  await expect(page.getByText('Please enter a valid email')).toBeVisible();
  await page.getByLabel('Password:').click();
});