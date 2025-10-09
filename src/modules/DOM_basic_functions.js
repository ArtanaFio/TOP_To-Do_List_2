export function makeElement(element, elementId, classes, text, parent) {
    const genElement = document.createElement(element);

    if (elementId) {
        genElement.id = elementId;
    }

    if (classes) {
        genElement.classList.add(...classes.split(' '));
    }

    if (text) {
        genElement.textContent = text;
    }

    if (parent) {
        parent.appendChild(genElement);
    }

    return genElement;
};