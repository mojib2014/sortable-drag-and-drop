const containers = document.querySelectorAll(".container");
const draggables = document.querySelectorAll(".draggable");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    // preventDefault behavior to have cursor sign for drag
    e.preventDefault();

    const afterOrBeforElement = getDragAfterOrBeforeElement(
      container,
      e.clientY,
    );
    const draggable = document.querySelector(".dragging");
    if (!afterOrBeforElement) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterOrBeforElement);
    }
  });
});

function getDragAfterOrBeforeElement(container, y) {
  const containersElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return containersElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY },
  ).element;
}
