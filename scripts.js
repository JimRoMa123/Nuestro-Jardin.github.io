document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('modal');
    const btn = document.getElementById('showMore');
    const closeBtn = document.getElementsByClassName('close')[0];
    
    btn.onclick = function() {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }
    
    closeBtn.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
    
    // Create yellow flower particles
    const particles = document.querySelector('.particles');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        
        // Randomize particle appearance
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Different yellow flower particle styles
        const styles = [
            'radial-gradient(circle, #ffec80, #ffda00)',
            'radial-gradient(circle, #fff6a9, #ffcc00)',
            'radial-gradient(circle, #fffacd, #ffd700)'
        ];
        
        particle.style.background = styles[Math.floor(Math.random() * styles.length)];
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.3)';
        
        // Randomize position
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Animation
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s ease-in-out infinite`;
        
        // Add to DOM
        particles.appendChild(particle);
        
        // Remove after animation to avoid memory issues
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 800);
    
    // Create initial particles
    for (let i = 0; i < 20; i++) {
        createParticle();
    }
    
    // Flower hover effect
    const flowerCards = document.querySelectorAll('.flower-card');
    
    flowerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add parallax effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const header = document.querySelector('header');
        
        header.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        
        const flowers = document.querySelectorAll('.flower');
        flowers.forEach((flower, index) => {
            flower.style.transform = `translateY(${scrollPosition * (0.1 * (index + 1))}px)`;
        });
    });

    // Music player functionality
    const playButton = document.getElementById('playButton');
    const audioElement = document.getElementById('backgroundMusic');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    let isPlaying = false;

    playButton.addEventListener('click', function() {
        if (isPlaying) {
            audioElement.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audioElement.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    audioElement.addEventListener('timeupdate', function() {
        const percentage = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.style.width = `${percentage}%`;
        
        // Update current time display
        const minutes = Math.floor(audioElement.currentTime / 60);
        const seconds = Math.floor(audioElement.currentTime % 60).toString().padStart(2, '0');
        currentTimeDisplay.textContent = `${minutes}:${seconds}`;
    });

    audioElement.addEventListener('loadedmetadata', function() {
        const minutes = Math.floor(audioElement.duration / 60);
        const seconds = Math.floor(audioElement.duration % 60).toString().padStart(2, '0');
        durationDisplay.textContent = `${minutes}:${seconds}`;
    });

    // Memory gallery functionality
    const memoryCards = document.querySelectorAll('.memory-card');
    const memoryModal = document.getElementById('memoryModal');
    const memoryClose = document.querySelector('.memory-close');
    const memoryDetailImage = document.getElementById('memoryDetailImage');
    const memoryDetailTitle = document.getElementById('memoryDetailTitle');
    const memoryDetailDescription = document.getElementById('memoryDetailDescription');
    const memoryDetailDate = document.getElementById('memoryDetailDate');

    // Memory data
    const memories = [
        {
            id: 'memory1',
            title: 'Tu primer regalo',
            description: 'Recuerdo con gran amor ese aquel primer regalo que me llego de la mano de alguien mas',
            date: '15 de Junio, 2020',
            fullImageUrl: 'images/memoria1.png'
        },
        {
            id: 'memory2',
            title: 'Nuestro primer Jardin',
            description: 'Durante todo el mes de septiempre dibujaste para mi, lo cual ha sido y siempre sera el mejor regalo que alguien pueda dar',
            date: '3 de septiembre, 2021',
            fullImageUrl: 'images/memoria2.png'
        },
        {
            id: 'memory3',
            title: 'Nuestras peleas',
            description: 'te amo, no te amo mas no te amo mas, yo te amo mas, cada vez adoro mas esas peleas.',
            date: 'Siempre',
            fullImageUrl: 'images/memoria3.png'
        },
        {
            id: 'memory4',
            title: 'Nuestro lugar favorito',
            description: 'Este rincón especial que se ha convertido en testigo de nuestras conversaciones, risas y planes para el futuro, ese pequeño servidor de discord que si se filtra estariamos acabados, aquel lugar donde cada noche espero el momento de dormir para escuchar tu respiracion y saber que estas bien a mi lado.',
            date: 'y para siempre',
            fullImageUrl: 'images/memoria4.png'
        }
    ];

    memoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const memoryId = this.id;
            const memory = memories.find(m => m.id === memoryId);
            
            if (memory) {
                memoryDetailImage.src = memory.fullImageUrl;
                memoryDetailTitle.textContent = memory.title;
                memoryDetailDescription.textContent = memory.description;
                memoryDetailDate.textContent = memory.date;
                
                memoryModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    memoryClose.addEventListener('click', function() {
        memoryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(event) {
        if (event.target === memoryModal) {
            memoryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Interactive garden functionality
    const gardenContainer = document.getElementById('interactiveGarden');
    const plantButton = document.getElementById('plantFlower');
    const wishInput = document.getElementById('wishInput');
    const submitWish = document.getElementById('submitWish');
    const wishesContainer = document.getElementById('wishesContainer');

    // Flower types and colors
    const flowerTypes = [
        { type: 'sunflower', size: { min: 40, max: 70 } },
        { type: 'tulip', size: { min: 30, max: 50 } },
        { type: 'daisy', size: { min: 25, max: 40 } }
    ];

    const yellowShades = [
        '#FFD700', // Gold
        '#FFEC80', // Light yellow
        '#FFE666', // Medium yellow
        '#FFCC00', // Strong yellow
        '#F4BB44'  // Amber
    ];

    // Plant a random flower
    function plantRandomFlower(x, y) {
        const flower = document.createElement('div');
        const flowerType = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        const size = Math.random() * (flowerType.size.max - flowerType.size.min) + flowerType.size.min;
        const color = yellowShades[Math.floor(Math.random() * yellowShades.length)];
        
        flower.className = `garden-flower ${flowerType.type}`;
        flower.style.width = `${size}px`;
        flower.style.height = `${size}px`;
        flower.style.left = `${x - size/2}px`;
        flower.style.top = `${y - size/2}px`;
        flower.style.backgroundColor = color;
        
        // Create flower parts based on type
        if (flowerType.type === 'sunflower') {
            const center = document.createElement('div');
            center.className = 'flower-center';
            center.style.width = `${size * 0.5}px`;
            center.style.height = `${size * 0.5}px`;
            flower.appendChild(center);
            
            const petalCount = Math.floor(Math.random() * 5) + 10;
            for (let i = 0; i < petalCount; i++) {
                const petal = document.createElement('div');
                petal.className = 'flower-petal';
                petal.style.transform = `rotate(${360 / petalCount * i}deg)`;
                flower.appendChild(petal);
            }
        } else if (flowerType.type === 'tulip') {
            const tulipTop = document.createElement('div');
            tulipTop.className = 'tulip-top';
            flower.appendChild(tulipTop);
            
            const stem = document.createElement('div');
            stem.className = 'flower-stem';
            flower.appendChild(stem);
        } else {
            // Daisy
            const center = document.createElement('div');
            center.className = 'daisy-center';
            flower.appendChild(center);
            
            const petalCount = 8;
            for (let i = 0; i < petalCount; i++) {
                const petal = document.createElement('div');
                petal.className = 'daisy-petal';
                petal.style.transform = `rotate(${360 / petalCount * i}deg)`;
                flower.appendChild(petal);
            }
        }
        
        // Animation for new flower
        flower.style.transform = 'scale(0)';
        gardenContainer.appendChild(flower);
        
        setTimeout(() => {
            flower.style.transform = 'scale(1)';
        }, 10);
    }

    plantButton.addEventListener('click', function() {
        const gardenRect = gardenContainer.getBoundingClientRect();
        const x = Math.random() * (gardenRect.width - 80) + 40;
        const y = Math.random() * (gardenRect.height - 80) + 40;
        
        plantRandomFlower(x, y);
    });

    // Add CSS styles for interactive garden flowers
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .garden-flower {
            position: absolute;
            transition: transform 0.5s ease;
        }
        
        .sunflower {
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }
        
        .flower-center {
            background-color: #704214;
            border-radius: 50%;
            z-index: 2;
        }
        
        .flower-petal {
            position: absolute;
            width: 40%;
            height: 40%;
            background-color: #FFD700;
            border-radius: 50% 50% 0 50%;
            top: 0;
            left: 50%;
            transform-origin: bottom left;
            z-index: 1;
        }
        
        .tulip-top {
            width: 100%;
            height: 60%;
            background-color: #FFD700;
            border-radius: 50% 50% 0 0;
            position: absolute;
            top: 0;
        }
        
        .flower-stem {
            width: 10%;
            height: 70%;
            background-color: #4CAF50;
            position: absolute;
            bottom: -40%;
            left: 45%;
            z-index: -1;
        }
        
        .daisy-center {
            width: 30%;
            height: 30%;
            background-color: #FFA500;
            border-radius: 50%;
            position: absolute;
            top: 35%;
            left: 35%;
            z-index: 2;
        }
        
        .daisy-petal {
            position: absolute;
            width: 40%;
            height: 40%;
            background-color: #FFFFFF;
            border-radius: 50% 50% 50% 50%;
            top: 30%;
            left: 30%;
            transform-origin: center;
            z-index: 1;
        }
    `;
    document.head.appendChild(styleSheet);

    // Handle wishes
    submitWish.addEventListener('click', function() {
        const wishText = wishInput.value.trim();
        if (wishText) {
            // Create wish element
            const wishElement = document.createElement('div');
            wishElement.className = 'wish-item';
            wishElement.textContent = wishText;
            wishesContainer.appendChild(wishElement);
            
            // Clear input
            wishInput.value = '';
            
            // Plant a flower with the wish
            const gardenRect = gardenContainer.getBoundingClientRect();
            const x = Math.random() * (gardenRect.width - 80) + 40;
            const y = Math.random() * (gardenRect.height - 80) + 40;
            plantRandomFlower(x, y);
            
            // Animate the wish
            wishElement.style.opacity = '0';
            wishElement.style.transform = 'translateY(20px)';
            setTimeout(() => {
                wishElement.style.opacity = '1';
                wishElement.style.transform = 'translateY(0)';
            }, 10);
        }
    });

    // Add some initial flowers to the garden
    window.addEventListener('load', function() {
        const gardenRect = gardenContainer.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * (gardenRect.width - 80) + 40;
            const y = Math.random() * (gardenRect.height - 80) + 40;
            plantRandomFlower(x, y);
        }
    });
});
