import { defineConfig } from 'vite';

/*
Om ditt repo har adressen https://github.com/Medieinstitutet/fed22d-js-grundkurs-jenni-wumpus,
då ska "base" här nedan vara "/fed22d-js-grundkurs-jenni-wumpus/"
 */

export default defineConfig({
  server: { host: true },
  base: '/fed22d-js-grundkurs-2-webbplats-vera83/', // TODO - ändra till ditt repo-namn
  define: {
    'process.env': {},
  },
});
