document.addEventListener('DOMContentLoaded', function() {
  gsap.from("header", { duration: 1, y: -100, opacity: 0 });
  gsap.from("section", { duration: 1, y: 100, opacity: 0, stagger: 0.2 });
  
  document.querySelectorAll('.skill-bar').forEach(bar => {
    gsap.to(bar, {
      width: bar.dataset.skill + '%',
      duration: 1,
      ease: "power2.out"
    });
  });
});
