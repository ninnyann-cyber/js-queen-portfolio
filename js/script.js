document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("navMenu"),
    btn = document.getElementById("menuBtn");
  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }),
  );
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    items.forEach((x) => io.observe(x));
  } else items.forEach((x) => x.classList.add("show"));
  const glow = document.querySelector(".cursor-glow");
  if (matchMedia("(pointer:fine)").matches)
    addEventListener("pointermove", (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  const links = [...menu.querySelectorAll("a")],
    sections = [...document.querySelectorAll("main section[id]")];
  const so = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.remove("current"));
          const l = links.find(
            (l) => l.getAttribute("href") === `#${e.target.id}`,
          );
          if (l) l.classList.add("current");
        }
      }),
    { rootMargin: "-35% 0px -55% 0px" },
  );
  sections.forEach((s) => so.observe(s));
});
