module.exports = {
  // Define el entorno para que ESLint sepa qué variables globales existen
  env: {
    browser: true, // Para código que se ejecuta en el navegador
    es2021: true,  // Habilita las últimas características de ECMAScript
    node: true,    // Para código de Node.js (necesario en Astro)
  },
  // Extiende las configuraciones base y de plugins
  extends: [
    'eslint:recommended',
    'plugin:astro/recommended',
    'plugin:astro/jsx-a11y-recommended',
    'plugin:@typescript-eslint/recommended',
    'standard', // La guía de estilo "Standard"
  ],
  // Define el parser principal para el proyecto
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  // Sobreescribe las reglas para archivos específicos (esencial para Astro)
  overrides: [
    {
      // Aplica estas reglas solo a los archivos .astro
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {
        // Reglas específicas para Astro si las necesitas
      }
    },
    {
      // Aplica reglas a archivos de código JavaScript, TypeScript y JSX
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      // Habilita las reglas de accesibilidad para JSX/TSX
      extends: [
        'plugin:jsx-a11y/recommended'
      ]
    },
  ],
  // Plugins que se usan en las configuraciones extendidas
  plugins: [
    '@typescript-eslint',
    'astro',
    'jsx-a11y'
  ],
  // Reglas personalizadas o para desactivar
  rules: {
    // Desactiva la regla 'no-unused-vars' de ESLint base para que no haya conflictos
    'no-unused-vars': 'off',
    // Usa la versión de TypeScript, que es más precisa
    '@typescript-eslint/no-unused-vars': 'error',
    // Desactiva la regla de punto y coma de TypeScript
    '@typescript-eslint/semi': 'off'
  },
};