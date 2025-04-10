import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        include: [
            '**/*.{test,spec}.?(c|m)[jt]s?(x)'//gohbc03 - 모두 실행
        ],
    },
})