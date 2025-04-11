// tests/home.spec.ts
import { test, expect } from '@playwright/test'

test('홈화면에서 프로필 버튼 클릭 시 /profile 페이지로 이동', async ({ page }) => {
  // 홈(루트) 페이지 열기
  await page.goto('/'); // baseURL이 config에 설정되어 있다면 '/' 로 가능

  // "Account" 라는 접근성 이름(sr-only 텍스트)을 가진 버튼(프로필 버튼) 클릭
  await page.getByRole('button', { name: 'Account' }).click();

  // /profile 페이지로 잘 이동했는지 확인
  await expect(page).toHaveURL('/profile');
});

test('홈화면에서 cart 버튼 클릭 시 /cart 페이지로 이동', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Cart' }).click();
    await expect(page).toHaveURL('/cart');
});

test.describe('홈화면에서 상품을 클릭했을 때 /product/[id] 페이지로 이동하는지 확인', () => {
  test.beforeEach(async ({ page }) => {
    // 홈 페이지 진입
    await page.goto('/')
  })

  test('Featured Products 중 첫 번째 상품 (f1) 클릭 시 /product/f1로 이동', async ({ page }) => {
    // 'Premium Bluetooth Speaker' 라는 제품명 링크(또는 이미지)를 클릭
    // 1) 접근성 이름으로 찾기
    // await page.getByRole('link', { name: 'Premium Bluetooth Speaker' }).click()

    // 2) 텍스트(정규식)로 찾기
    await page.locator('a:has-text("Premium Bluetooth Speaker")').click()

    // 이동 확인
    await expect(page).toHaveURL('/product/f1')
  })

  test('Featured Products 중 두 번째 상품 (f2) 클릭 시 /product/f2로 이동', async ({ page }) => {
    // Wireless Earbuds (id: f2)
    await page.locator('a:has-text("Wireless Earbuds")').click()
    await expect(page).toHaveURL('/product/f2')
  })

  test('Popular Right Now 중 첫 번째 상품 (1) 클릭 시 /product/1로 이동', async ({ page }) => {
    // Wireless Headphones (id: 1)
    await page.locator('a:has-text("Wireless Headphones")').click()
    await expect(page).toHaveURL('/product/1')
  })
})