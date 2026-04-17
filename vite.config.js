import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'VisualControllerForReact',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        switch (format) {
          case 'es':
            return 'visual-controller-for-react.esm.js'
          case 'cjs':
            return 'visual-controller-for-react.cjs'
          case 'umd':
            return 'visual-controller-for-react.umd.js'
          default:
            return 'visual-controller-for-react.js'
        }
      }
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
