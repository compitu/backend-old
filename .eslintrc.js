module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'import'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'array',
            },
        ],
        '@typescript-eslint/consistent-type-definitions': [
            'error',
            'interface',
        ],
        '@typescript-eslint/explicit-function-return-type': [
            'warn',
            {
                allowExpressions: true,
            },
        ],
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
                accessibility: 'explicit',
            },
        ],
        '@typescript-eslint/method-signature-style': ['error', 'method'],
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-inferrable-types': ['off'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
            },
        ],
        'default-case': 'warn',
        'no-template-curly-in-string': 'error',
        'prefer-template': 'error',
        'import/order': [
            'error',
            {
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                groups: [['external', 'builtin'], 'parent', 'sibling', 'index'],
            },
        ],
        'dot-notation': 'error',
    },
};
