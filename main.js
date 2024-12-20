 const imageCanvas = document.getElementById('imageCanvas');
 const imageCtx = imageCanvas.getContext('2d');
 let img;

 document.getElementById('imageInput').onchange = function(e) {
     const file = this.files[0];
     const reader = new FileReader();
     reader.onload = function(event) {
         img = new Image();
         img.onload = drawImage; 
         img.src = event.target.result;
     };
     reader.readAsDataURL(file);
 };

 function drawImage() {
     imageCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
     imageCtx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
 }

 document.getElementById('resizeButton').addEventListener('click', () => {
     imageCanvas.width = 200; 
     imageCanvas.height = 150; 
     drawImage(); 
 });

 document.getElementById('saveButton').addEventListener('click', () => {
     const link = document.createElement('a');
     link.download = 'canvas-image.png';
     link.href = imageCanvas.toDataURL('image/png');
     link.click();
 });

 document.getElementById('sepiaRange').addEventListener('input', (event) => {
     const sepiaValue = event.target.value;
     imageCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
     imageCtx.filter = `sepia(${sepiaValue})`; 
     imageCtx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
 });

 const animationCanvas = document.getElementById('animationCanvas');
 const animationCtx = animationCanvas.getContext('2d');
 const hearts = []; 

 function createHeart(x, y) {
     hearts.push({ x, y, size: Math.random() * 20 + 10 });
 }

 function drawHeart(ctx, x, y, size) {
     ctx.beginPath();
     ctx.moveTo(x, y);ctx.bezierCurveTo(x, y - size / 2, x - size / 2, y - size / 2, x - size / 2, y);
     ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size / 2, x, y + size);
     ctx.bezierCurveTo(x, y + size / 2, x + size / 2, y + size / 2, x + size / 2, y);
     ctx.bezierCurveTo(x + size / 2, y - size / 2, x, y - size / 2, x, y);
     ctx.fillStyle = 'pink';
     ctx.fill();
     ctx.closePath();
 }

 function animateHearts() {
     animationCtx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
     hearts.forEach((heart, index) => {
         heart.y -= 1; 
         if (heart.y + heart.size < 0) hearts.splice(index, 1); 
         drawHeart(animationCtx, heart.x, heart.y, heart.size);
     });
     requestAnimationFrame(animateHearts);
 }
 animateHearts();

 document.getElementById('createHeartButton').addEventListener('click', () => {
     const x = Math.random() * animationCanvas.width; 
     const y = animationCanvas.height; 
     createHeart(x, y); 
 });

