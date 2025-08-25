module.exports = {
    extends: ['eslint:recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/no-empty-function': 'warn',
        'no-console': 'off',
        'prefer-const': 'warn',
        'no-var': 'warn',
        semi: ['warn', 'always'],
        indent: ['warn', 4],
    },
    env: {
        node: true,
        es6: true,
        browser: true,
        es2020: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    globals: {
        React: 'readonly',
        JSX: 'readonly',
    },
    ignorePatterns: [
        'node_modules/',
        'dist/',
        '.next/',
        '.turbo/',
        '**/*.min.js',
        '**/*.bundle.js',
    ],
};
