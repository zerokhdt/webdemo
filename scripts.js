document.addEventListener('DOMContentLoaded', () => {
    const circles = document.querySelectorAll('.circle');
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const imageContainer = document.getElementById('carousel');
    const totalImages = 119; // Tổng số ảnh cho mỗi màu
    let currentImageIndex = 1;
    let direction = 1;
    let color_default = 'ABSOLUTE_BLACK';

    function updateImages(color, index) {
        img1.src = `COLORWAY_RENDER/ADV_BACKPACK_${color}_${index}.png`;
        img2.src = `COLORWAY_RENDER/ADV_BACKPACK_${color}_${((index % totalImages) + 1)}.png`; // Ảnh tiếp theo
    }

    function handleMouseMove(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left; // Vị trí x chuột trong thẻ chứa ảnh
        const imageIndex = Math.floor((x / rect.width) * totalImages) + 1;
        currentImageIndex = ((imageIndex - 1) % totalImages) + 1; // Quay vòng ảnh

        if (direction === 1) {
            if (currentImageIndex === totalImages) {
                direction = -1; // Chuyển hướng khi đến ảnh cuối cùng
            }
        } else if (direction === -1) {
            if (currentImageIndex === 1) {
                direction = 1; // Chuyển hướng khi đến ảnh đầu tiên
            }
        }
        updateImages(color_default, currentImageIndex);
        img1.classList.add('active');
        img2.classList.remove('active');
    }

    function handleMouseEnter() {
        img1.classList.add('active');
        img2.classList.add('active');
    }

    // Thêm và gỡ bỏ sự kiện di chuột khi con trỏ chuột di chuyển vào và ra khỏi thẻ chứa ảnh
    imageContainer.addEventListener('mousemove', handleMouseMove);
    imageContainer.addEventListener('mouseenter', handleMouseEnter);

    // Thay đổi ảnh khi chọn màu từ dropdown
    circles.forEach((circle, index) => {
        circle.addEventListener('click', function() {
            const color = this.getAttribute('data-value');
            color_default = color;
            updateImages(color, currentImageIndex); // Gọi hàm updateImages với màu và chỉ số là 1
        });
    });

    // Khởi tạo với màu đỏ và ảnh đầu tiên
    updateImages(color_default, currentImageIndex);

    const videoframe = document.getElementById("introduce-product");
    const videoMain = document.getElementById("video-main");
    const videoPrev = document.getElementById("video-prev");
    const videoNext = document.getElementById("video-next");
    const dots = document.querySelectorAll(".dot");
    const playPauseButton = document.getElementById("playPauseButton");
    
    let videos = [
        { src: "video/ren1.mp4", dot: dots[0] },
        { src: "video/ren2.mp4", dot: dots[1] },
        { src: "video/ren3.mp4", dot: dots[2] },
        { src: "video/ren4.mp4", dot: dots[3] }
    ];
    
    let currentIndex = 0;
    let playing = true;

    function handleMousevideo() {
        videoMain.play();
    }

    function handleMouseLeave() {
        videoMain.pause();
    }

    videoframe.addEventListener('mouseenter', handleMousevideo);
    videoframe.addEventListener('mouseleave', handleMouseLeave);

    function updateVideos() {
        videoMain.src = videos[currentIndex].src;
        
        if (currentIndex === 0) {
            videoPrev.style.visibility = "hidden";
        } else {
            videoPrev.style.visibility = "visible";
            videoPrev.src = videos[currentIndex - 1].src;
        }

        if (currentIndex === videos.length - 1) {
            videoNext.style.visibility = "hidden";
        } else {
            videoNext.style.visibility = "visible";
            videoNext.src = videos[currentIndex + 1].src;
        }

        dots.forEach(dot => dot.classList.remove("active"));
        videos[currentIndex].dot.classList.add("active");
    }

    videoMain.addEventListener("ended", function() {
        if (currentIndex < videos.length - 1) {
            currentIndex++;
            updateVideos();
            videoMain.play();
        } else {
            playPauseButton.innerText = "Play";
            playing = false;
        }
    });

    playPauseButton.addEventListener("click", function() {
        if (playing) {
            videoMain.pause();
            playPauseButton.innerText = "Play";
        } else if (currentIndex === videos.length - 1) {
            currentIndex = 0;
            updateVideos();
            videoMain.play();
        } else {
            videoMain.play();
            playPauseButton.innerText = "Pause";
        }
        playing = !playing;
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", function() {
            currentIndex = index;
            updateVideos();
            videoMain.play();
        });
    });

    updateVideos();

    const scrollContainer = document.getElementById('carousel-scroll');
    const img3 = document.getElementById('img3');
    const img4 = document.getElementById('img4');
    const totalImagesscroll = 127; // Tổng số ảnh cho mỗi màu
    let currentImageIndexscroll = 1;

    function updateImagessroll() {
        const widthimg = img3.naturalWidth;
        const heightimg = img3.naturalHeight;
        img3.style.width = 800*widthimg/heightimg +"px";
        img4.style.width = 800*widthimg/heightimg +"px";
        const img3src = `TROLLEYHANDLE/SCHOOL_BACKPACK_${currentImageIndexscroll}.png`;
        const img4src = `TROLLEYHANDLE/SCHOOL_BACKPACK_${currentImageIndexscroll+1}.png`;
        img3.src = img3src;
        img4,src = img4src;
    }

    function nextImages() {
        // Increment index and wrap around if necessary
        currentImageIndexscroll = (currentImageIndexscroll % totalImagesscroll) + 1;
        updateImagessroll();
    }

    function prevImages() {
        // Decrement index and wrap around if necessary
        currentImageIndexscroll = (currentImageIndexscroll - 2 + totalImages) % totalImages + 1;
        updateImagessroll();
    }

    scrollContainer.addEventListener('wheel', function(event) {
        event.preventDefault();
        if (event.deltaY > 0) {
            nextImages();
        } else if (event.deltaY < 0) {
            prevImages();
        }
    });

    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndexImage = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
        const slideWidth = slides[0].clientWidth;
        carousel.style.transform = `translateX(-${currentIndexImage * slideWidth}px)`;
    }

    nextBtn.addEventListener('click', function() {
        if (currentIndexImage < totalSlides - 1) {
            currentIndexImage++;
        } else {
            currentIndexImage = 0;
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', function() {
        if (currentIndexImage > 0) {
            currentIndexImage--;
        } else {
            currentIndexImage = totalSlides - 1;
        }
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
});
