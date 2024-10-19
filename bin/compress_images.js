import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';

(async () => {
    await imagemin(['resources/img/*.{jpg,png}'], {
        destination: 'compressed',
        plugins: [
            imageminMozjpeg({ quality: 75 }),
            imageminPngquant({ quality: [0.6, 0.8] }),
            imageminWebp({ quality: 75 })
        ]
    });

    console.log('Basic Images optimized');
})();

(async () => {
    await imagemin(['resources/img/projects/*.{jpg,png}'], {
        destination: 'compressed/projects',
        plugins: [
            imageminMozjpeg({ quality: 75 }),
            imageminPngquant({ quality: [0.6, 0.8] }),
            imageminWebp({ quality: 75 })
        ]
    });

    console.log('Project Images optimized');
})();

(async () => {
    await imagemin(['resources/img/members/*.{jpg,png}'], {
        destination: 'compressed/members',
        plugins: [
            imageminMozjpeg({ quality: 75 }),
            imageminPngquant({ quality: [0.6, 0.8] }),
            imageminWebp({ quality: 75 })
        ]
    });

    console.log('Member Images optimized');
})();