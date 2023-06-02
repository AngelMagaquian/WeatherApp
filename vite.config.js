import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

const resolvePath = (str) => path.resolve(__dirname, str);

export default defineConfig(({ mode }) => {
  dotenv.config({ path: resolvePath('src/key.env') });

  return {
    plugins: [react()]
  };
});