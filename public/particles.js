/**
 * GLASHER — Point Cloud Particle Background
 * Call initParticleBackground() to start.
 */
function initParticleBackground() {
  const canvas = document.createElement("canvas");
  canvas.id = "particle-bg";
  canvas.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;";
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  let width, height;
  const isMobile = window.innerWidth < 768;
  const PARTICLE_COUNT = isMobile ? 150 : 500;
  const CONNECT_DIST = 120;
  const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
  const MOUSE_RADIUS = 150;
  const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
  const REPEL_STRENGTH = 0.4;
  const mouse = { x: -9999, y: -9999 };

  // Cached background — rebuilt only on resize
  let bgCanvas = document.createElement("canvas");
  let bgCtx = bgCanvas.getContext("2d");

  function buildBackground() {
    bgCanvas.width = width;
    bgCanvas.height = height;
    bgCtx.fillStyle = "#f5efe6";
    bgCtx.fillRect(0, 0, width, height);

    var pink = bgCtx.createRadialGradient(width * 0.75, height * 0.2, 0, width * 0.75, height * 0.2, width * 0.6);
    pink.addColorStop(0, "rgba(240, 170, 180, 0.6)");
    pink.addColorStop(0.5, "rgba(235, 190, 190, 0.3)");
    pink.addColorStop(1, "rgba(245, 239, 230, 0)");
    bgCtx.fillStyle = pink;
    bgCtx.fillRect(0, 0, width, height);

    var beige = bgCtx.createRadialGradient(width * 0.2, height * 0.8, 0, width * 0.2, height * 0.8, width * 0.55);
    beige.addColorStop(0, "rgba(225, 205, 180, 0.5)");
    beige.addColorStop(0.5, "rgba(235, 220, 200, 0.25)");
    beige.addColorStop(1, "rgba(245, 239, 230, 0)");
    bgCtx.fillStyle = beige;
    bgCtx.fillRect(0, 0, width, height);

    var white = bgCtx.createRadialGradient(width * 0.5, height * 0.45, 0, width * 0.5, height * 0.45, width * 0.4);
    white.addColorStop(0, "rgba(255, 255, 255, 0.5)");
    white.addColorStop(1, "rgba(255, 255, 255, 0)");
    bgCtx.fillStyle = white;
    bgCtx.fillRect(0, 0, width, height);
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    buildBackground();
  }
  resize();
  window.addEventListener("resize", resize);

  document.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.addEventListener("mouseleave", function () {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // Particles
  var particles = [];
  for (var i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: 0.4 + Math.random() * 0.8,
      // Consistent bright pink
      hue: 330,
      sat: 90,
      lit: 60,
    });
  }

  function tick() {
    // Blit cached background in one operation
    ctx.drawImage(bgCanvas, 0, 0);

    // Update & draw particles
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      // Mouse repulsion (squared distance — avoid sqrt unless in range)
      var dx = p.x - mouse.x;
      var dy = p.y - mouse.y;
      var distSq = dx * dx + dy * dy;
      if (distSq < MOUSE_RADIUS_SQ && distSq > 0) {
        var dist = Math.sqrt(distSq);
        var force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        p.vx += (dx / dist) * force * REPEL_STRENGTH;
        p.vy += (dy / dist) * force * REPEL_STRENGTH;
      }

      // Friction to snap back to natural drift
      p.vx *= 0.98;
      p.vy *= 0.98;

      // Minimum drift so particles never fully stop
      var speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed < 0.15) {
        p.vx += (Math.random() - 0.5) * 0.1;
        p.vy += (Math.random() - 0.5) * 0.1;
      }

      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges
      if (p.x < 0) { p.x = 0; p.vx *= -1; }
      if (p.x > width) { p.x = width; p.vx *= -1; }
      if (p.y < 0) { p.y = 0; p.vy *= -1; }
      if (p.y > height) { p.y = height; p.vy *= -1; }

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle =
        "hsla(" + p.hue + "," + p.sat + "%," + p.lit + "%,0.9)";
      ctx.fill();
    }

    // Connecting lines — squared distance early-exit, batch stroke calls
    ctx.lineWidth = 0.5;
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var a = particles[i];
        var b = particles[j];
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        var distSq = dx * dx + dy * dy;
        if (distSq < CONNECT_DIST_SQ) {
          var dist = Math.sqrt(distSq);
          var alpha = 1 - dist / CONNECT_DIST;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = "rgba(200,100,180," + (alpha * 0.35) + ")";
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}
