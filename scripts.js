document.addEventListener('DOMContentLoaded', () => {
    const circles = document.querySelectorAll('.circle');
    const color3d = document.getElementById('color3d');
    const totalImages = 119; // Tổng số ảnh cho mỗi màu
    let color_default = 'ABSOLUTE BLACK';

    function updateImages(color) {
        color3d.innerHTML = color;
    }

    // Thay đổi ảnh khi chọn màu từ dropdown
    circles.forEach((circle, index) => {
        circle.addEventListener('click', function() {             
            const color = this.getAttribute('data-value');
            color_default = color;
            showSpin(`spin${index + 1}`)
            updateImages(color); // Gọi hàm updateImages với màu và chỉ số là 1
        });
    });

    function showSpin(selectedSpinId) {
        const spins = document.querySelectorAll('.Sirv');
        spins.forEach(spin => {
            if (spin.id === selectedSpinId) {
                spin.style.display = 'block';
            } else {
                spin.style.display = 'none';
            }
        });
    }
    showSpin('spin1')
    // Khởi tạo với màu đỏ và ảnh đầu tiên
    updateImages(color_default);

    const videoframe = document.getElementById("introduce-product");
    const videoMain = document.getElementById("video-main");
    const videoPrev = document.getElementById("video-prev");
    const videoNext = document.getElementById("video-next");
    const dots = document.querySelectorAll(".dot");
    const playPauseButton = document.getElementById("playPauseButton");
    var label = document.getElementById("textPopup");
    
    let videos = [
        { src: "https://zerokhdt.sirv.com/ren1.mp4", dot: dots[0] },
        { src: "https://zerokhdt.sirv.com/ren2.mp4", dot: dots[1] },
        { src: "https://zerokhdt.sirv.com/ren3.mp4", dot: dots[2] },
        { src: "https://zerokhdt.sirv.com/ren4.mp4", dot: dots[3] }
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
        label.innerText = color_default;
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

    // const carousel = document.getElementById('carousel');
    // const slides = document.querySelectorAll('.carousel-slide');
    // // const prevBtn = document.querySelector('.prev-btn');
    // // const nextBtn = document.querySelector('.next-btn');

    // slides.forEach((slide, index) => {
    //     slide.addEventListener('mouseover', function() {             
    //         updatecarousel(slide.id);
    //     });
    // });

    // slides.forEach((slide, index) => {
    //     slide.addEventListener('mouseout', function() {             
    //         slides.style.flex = '0 0 12.5%';
    //     });
    // });

    // function updatecarousel(sileid) {
    //     slides.forEach((slideimg, i) => {                      
    //         if (slideimg.id === sileid) {
    //             slideimg.style.width = 50/100*(window.innerWidth)+ "px";
    //         } else {
    //             slideimg.style.width = 50/100*(window.innerWidth)/7 + "px";
    //         }
    //     });
    // }

    // let currentIndexImage = 0;
    // const totalSlides = slides.length;

    // function updateCarousel() {
    //     const slideWidth = slides[0].clientWidth;
    //     carousel.style.transform = `translateX(-${currentIndexImage * slideWidth}px)`;
    // }

    // nextBtn.addEventListener('click', function() {
    //     if (currentIndexImage < totalSlides - 1) {
    //         currentIndexImage++;
    //     } else {
    //         currentIndexImage = 0;
    //     }
    //     updateCarousel();
    // });

    // prevBtn.addEventListener('click', function() {
    //     if (currentIndexImage > 0) {
    //         currentIndexImage--;
    //     } else {
    //         currentIndexImage = totalSlides - 1;
    //     }
    //     updateCarousel();
    // });

    // window.addEventListener('resize', updateCarousel);

    // Get all the carousel slides
    const slides = document.querySelectorAll('.carousel-slide');

    // Add event listeners for hover events
    slides.forEach((slide) => {
        slide.addEventListener('mouseover', () => {
            // When the mouse is over a slide, expand it
            slide.style.flex = '0 0 50%';
            slide.style.zIndex = '10'; // Bring the hovered slide on top

            // Shrink all the other slides
            slides.forEach((otherSlide) => {
                if (otherSlide !== slide) {
                    otherSlide.style.flex = '0 0 calc((100% - 50%) / 7)';
                }
            });
        });

        slide.addEventListener('mouseout', () => {
            // Reset all slides to their original size when the mouse leaves
            slides.forEach((otherSlide) => {
                otherSlide.style.flex = '0 0 12.5%';
                otherSlide.style.zIndex = '1'; // Reset z-index
            });
        });
    });

});

function openTextPopup() {
    var popup = document.getElementById("textPopup");
    popup.style.display = "block";
}

function closeTextPopup() {
    var popup = document.getElementById("textPopup");
    popup.style.display = "none";
}