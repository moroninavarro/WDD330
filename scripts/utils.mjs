export async function loadHeaderFooter() {
  const footerTemplate = await loadTemplate("../public/partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const html = await res.text();
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

export function renderWithTemplate(template, parentElement) {
  const clone = template.content.cloneNode(true);
  parentElement.appendChild(clone);
}