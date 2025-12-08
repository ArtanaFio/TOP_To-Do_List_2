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

export function makeLabel(id, forLabel, classes, text, parent) {
    const genLabel = document.createElement('label');

    if (id) {
        genLabel.id = id;
    }

    if (forLabel) {
        genLabel.for = forLabel;
    }

    if (classes) {
        genLabel.classList.add(...classes.split(' '));
    }

    if (text) {
        genLabel.textContent = text;
    }

    if (parent) {
        parent.appendChild(genLabel);
    }

    return genLabel;
};

export function makeButton(id, typeButton, classes, text, parent) {
    const genButton = document.createElement('button');
    
    if(id) {
        genButton.id = id;
    }

    if (typeButton) {
        genButton.type = typeButton;
    }

    if (classes) {
        genButton.classList.add(...classes.split(' '));
    }

    if (text) {
        genButton.textContent = text;
    }

    if (parent) {
        parent.appendChild(genButton);
    }

    return genButton;
};

export function makeInput(element, id, typeInput, nameInput, classes, placeholder, parent) {
    const genInput = document.createElement(element);

    if (id) {
        genInput.id = id;
    }

    if (typeInput) {
        genInput.type = typeInput;
    }

    if (nameInput) {
        genInput.name = nameInput;
    }

    if (classes) {
        genInput.classList.add(...classes.split(' '));
    }

    if (placeholder) {
        genInput.placeholder = placeholder;
    }

    if (parent) {
        parent.appendChild(genInput);
    }

    return genInput;
};

export function makeDropDownOptions(optionValue, parent) {
    const option = document.createElement('option');
    option.value = optionValue;
    option.classList.add('drop-box-option');
    option.textContent = optionValue;
    parent.appendChild(option);
    return option;
};

export function makeNotAnOption(parent) {
    const option = document.createElement('option');
    option.value = '';
    option.disabled = true;
    option.textContent = 'Select';
    parent.appendChild(option);
    return option;
};

export function clearInputs(formInterface) {
    formInterface.titleInput.value = '';
    formInterface.descriptionInput.value = '';
    formInterface.dueDateDropDownBox.value = '';
    formInterface.priorityBox.value = 'Minor';
    if (formInterface.labelBox) {
        formInterface.labelBox.value = 'None';
    }
};

export function openForm(formInterface) {
    formInterface.module.classList.add('flexy');
    formInterface.module.classList.remove('gone');
};

export function closeForm(formInterface) {
    formInterface.module.classList.add('gone');
    formInterface.module.classList.remove('flexy');
};

export function addErrorStyling(formInterface) {
    formInterface.titleInput.classList.add('error-input');
};

export function removeErrorStyling(formInterface) {
    formInterface.titleInput.classList.remove('error-input');
};

export function fillItemName(nameHolder, name) {
    nameHolder.textContent = name;
};