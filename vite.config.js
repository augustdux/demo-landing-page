import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import path from 'path';
import fs from 'fs'; // Для работы с файловой системой

export default defineConfig({
    root: './src', // Папка с исходниками
    build: {
        outDir: '../dist', // Папка для сборки
        emptyOutDir: true, // Очистка перед сборкой
        cssCodeSplit: false, // Собираем весь CSS в один файл
        rollupOptions: {
            output: {
                assetFileNames: 'css/style.min.css', // Минифицированный CSS в dist
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./scss/style.scss";', // Главный SCSS файл
            },
        },
        postcss: {
            plugins: [
                autoprefixer(), // Автопрефиксы
                cssnano({ preset: 'default' }), // Минификация CSS
            ],
        },
    },
    plugins: [
        viteImagemin({
            gifsicle: { optimizationLevel: 7 },
            optipng: { optimizationLevel: 7 },
            mozjpeg: { quality: 80 },
            pngquant: { quality: [0.65, 0.9], speed: 4 },
            svgo: { plugins: [{ name: 'removeViewBox' }] },
        }),
        {
            // Плагин для копирования style.min.css в папку src
            name: 'copy-style-to-src',
            apply: 'serve',
            handleHotUpdate({ file }) {
                if (file.endsWith('.scss')) {
                    const outputPath = path.resolve(__dirname, './src/css/style.min.css');
                    const scssFilePath = path.resolve(__dirname, './src/scss/style.scss');

                    // Компиляция SCSS вручную
                    const sass = require('sass');
                    const result = sass.renderSync({
                        file: scssFilePath,
                        outputStyle: 'compressed',
                    });

                    // Записываем style.min.css в src
                    fs.writeFileSync(outputPath, result.css.toString());
                }
            },
        },
    ],
    server: {
        open: true, // Автоматическое открытие браузера
        port: 3000, // Порт разработки
        watch: {
            usePolling: true, // Обновление SCSS
        },
    },
});
