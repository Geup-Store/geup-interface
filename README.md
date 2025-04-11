# geup-interface
interface in Geup

# How to test
🧪 Test 실행법
이 프로젝트의 테스트는 Playwright를 기반으로 작성되어 있으며, 전체 테스트 실행과 개별 테스트 블록 단위 실행이 가능하다. Vitest도 유사한 방식으로 실행 가능.

✅ 전체 테스트 실행
tests/ 폴더 내 모든 테스트 파일을 한 번에 실행:

npm run test:e2e:ci

테스트 실행 후, Playwright Test Report 창이 자동으로 열리며, 각 테스트의 실행 결과와 세부 정보를 확인 가능.

🎯 특정 테스트 파일 또는 블록 실행 (VSCode 기준)
Playwright 확장 프로그램 설치

개별 테스트 실행

테스트 파일을 열면 각 테스트 블록 옆에 ▶ 실행 버튼이 표시됩니다.

해당 버튼을 눌러 테스트 블록 단위로 개별 실행할 수 있습니다.

실행 결과는 VSCode 하단의 '테스트 결과' 패널에서 상세하게 확인할 수 있습니다.