class ParticleSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.mouseX = 0;
      this.mouseY = 0;
      
      // Particle settings
      this.particleCount = 100;
      this.colors = ['#FF3366', '#66CCFF', '#9966FF', '#FF66CC'];
      
      // Initialize particles
      this.init();
      
      // Add mouse interaction
      this.canvas.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
      });
    }
    
    init() {
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 3 + 1,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          life: Math.random() * 0.5 + 0.5
        });
      }
    }
    
    update() {
      this.particles.forEach(p => {
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Mouse interaction
        const dx = this.mouseX - p.x;
        const dy = this.mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) / 100;
          p.speedX -= Math.cos(angle) * force * 0.2;
          p.speedY -= Math.sin(angle) * force * 0.2;
        }
        
        // Boundaries check
        if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;
        
        // Update life
        p.life -= 0.001;
        if (p.life <= 0) {
          p.life = 1;
          p.x = Math.random() * this.canvas.width;
          p.y = Math.random() * this.canvas.height;
        }
      });
    }
    
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.particles.forEach(p => {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.life;
        this.ctx.fill();
        
        // Draw connections
        this.particles.forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = p.color;
            this.ctx.globalAlpha = (100 - distance) / 100 * 0.5;
            this.ctx.stroke();
          }
        });
      });
    }
    
    animate() {
      this.update();
      this.draw();
      requestAnimationFrame(() => this.animate());
    }
  }