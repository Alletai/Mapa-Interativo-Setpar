document.addEventListener("DOMContentLoaded", () => {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    document.body.appendChild(tooltip);

    // Selecionar todos os elementos com `data-name`
    const paths = document.querySelectorAll("path[data-name]");

    paths.forEach((path) => {
      path.addEventListener("mouseenter", (event) => {
        const name = event.target.getAttribute("data-name");
        if (name) {
          tooltip.textContent = name;
          tooltip.style.display = "block";
          path.classList.add("hovered");
        }
      });

      path.addEventListener("mousemove", (event) => {
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
      });

      path.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
        path.classList.remove("hovered");

        const svgZoom = document.getElementById("landmarks-brazil");
        let zoomLevel = 1;
        let viewBoxZoom = svgZoom
          .getAttribute("viewBox")
          .split(" ")
          .map(Number); // [x, y, width, height]

        svgZoom.addEventListener("wheel", (event) => {
          event.preventDefault();
          const zoomFactor = 0.1; // Ajuste a intensidade do zoom

          if (event.deltaY < 0) {
            // Zoom in
            zoomLevel *= 1 + zoomFactor;
          } else {
            // Zoom out
            zoomLevel *= 1 - zoomFactor;
          }

          viewBoxZoom[2] = 1000 / zoomLevel; // Ajustar largura
          viewBoxZoom[3] = 1000 / zoomLevel; // Ajustar altura
          svgZoom.setAttribute("viewBox", viewBoxZoom.join(" "));
        });
      });
    });
  });