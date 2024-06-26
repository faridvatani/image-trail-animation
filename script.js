window.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.items');
  let imageIndex = 1,
    animationTimeout = null,
    currentlyPlaying = false;

  function addNewItem(x, y) {
    const newItem = createItem(x, y);
    updateImageForItem(newItem);
    container.appendChild(newItem);
    manageItemLimit();
  }

  function createItem(x, y) {
    const item = document.createElement('div');
    item.className = 'item';
    item.style.left = `${x - 75}px`;
    item.style.top = `${y - 100}px`;
    return item;
  }

  function updateImageForItem(item) {
    const img = document.createElement('img');
    img.src = `/assets/images/image-${getNextImageIndex()}.jpeg`;
    item.appendChild(img);
  }

  function getNextImageIndex() {
    imageIndex = (imageIndex % 15) + 1;
    return imageIndex;
  }

  function manageItemLimit() {
    const maxItems = 20;
    while (container.children.length > maxItems) {
      container.removeChild(container.firstChild);
    }
  }

  function startAnimation() {
    if (shouldStartAnimation()) {
      currentlyPlaying = true;
      animateItems();
    }
  }

  function shouldStartAnimation() {
    return !currentlyPlaying && container.children.length > 0;
  }

  function animateItems() {
    gsap.to('.item', {
      y: 1000,
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      stagger: 0.025,
      onComplete: cleanUpAfterAnimation,
    });
  }

  function cleanUpAfterAnimation() {
    this.targets().forEach((item) => item.parentNode?.removeChild(item));
    currentlyPlaying = false;
  }

  container.addEventListener('mousemove', (e) => {
    clearTimeout(animationTimeout);
    addNewItem(e.clientX, e.clientY);
    animationTimeout = setTimeout(startAnimation, 100);
  });
});
