import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'public/**', 'lib/**', 'scripts/**'] },
  ...compat.extends('next/core-web-vitals', 'plugin:jsx-a11y/recommended').map(config => ({
    ...config,
    rules: {
      ...config.rules,
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off'
    }
  }))
];

export default eslintConfig;
