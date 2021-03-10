const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //звук
    const sounds = document.querySelectorAll('.sound-picker button');
    //дисплей времени
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //Получаем длину круга
    const outlineLength = outline.getTotalLength();
    //Duration
    let fakeDuration = 600;
    //Штрихи при воспроизведении
    outline.style.strokeDashoffset = outlineLength;
    outline.style.strokeDasharray = outlineLength;

    //Переключаемся между звуками
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            //Изменяем путь до музыки и видео
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            // checkPlaying(song);
        })
    })

    //Воспроизведение звука
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //Выбор времени воспроизведения
    timeSelect.forEach(item => {
        item.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration%60)}`;
        })
    });

    // Остановка звука и изменение кнопки 
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    // 
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //Анимация круга
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        //Анимация времени 
        timeDisplay.textContent = `${minutes}:${seconds}`;
        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };
};

app();