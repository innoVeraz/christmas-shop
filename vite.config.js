import { defineConfig } from 'vite';
import { resolve } from 'path';

/*
Om ditt repo har adressen https://github.com/Medieinstitutet/fed22d-js-grundkurs-jenni-wumpus,
då ska "base" här nedan vara "/fed22d-js-grundkurs-jenni-wumpus/"
 */

export default defineConfig({
  server: { host: true },
  base: '/christmas-shop/', // TODO - ändra till ditt repo-namn
  define: {
    'process.env': {},
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        productPage: resolve(__dirname, 'product-page.html'),
        checkout: resolve(__dirname, 'checkout.html'),
      },
    },
  },
});
