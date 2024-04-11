let formFieldsConfig = []; // Initialize the array to store form fields configurations

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector(".form");

    // Function to update the form configuration when a field is added
    function addFieldToConfig(fieldConfig) {
        formFieldsConfig.push(fieldConfig);
    }

    // Function to remove a field from the configuration
    function removeFieldFromConfig(fieldId) {
        formFieldsConfig = formFieldsConfig.filter(field => field.id !== fieldId);
    }

   
    function updateSelectConfig(fieldId, optionValue, action) {
        const fieldIndex = formFieldsConfig.findIndex(field => field.id === fieldId);
        if (fieldIndex !== -1) {
            if (action === 'add') {
                // Add option
                formFieldsConfig[fieldIndex].options.push(optionValue);
            } else if (action === 'delete') {
                // Delete option using filter
                formFieldsConfig[fieldIndex].options = formFieldsConfig[fieldIndex].options.filter(option => option !== optionValue);
            }
        }
    }


    function updateFieldConfig(fieldId, property, value) {
        const fieldIndex = formFieldsConfig.findIndex(field => field.id === fieldId);
        if (fieldIndex !== -1) {
            formFieldsConfig[fieldIndex][property] = value;
        }
    }

    // Drag and Drop Functions
    function handleDragStart(e) {
        e.dataTransfer.setData("text/plain", e.target.id);
        e.target.style.opacity = '0.4'; // Optional: Change the opacity during drag
    }

    function handleDragOver(e) {
        e.preventDefault(); // Necessary to allow dropping
    }

    function handleDrop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        const draggableElement = document.getElementById(id);
        const dropZone = e.target.closest('.form-fields');
        if (dropZone && draggableElement !== dropZone) {
            const rect = dropZone.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            if (e.clientY < midY) {
                form.insertBefore(draggableElement, dropZone); // Drop the element before the dropZone
            } else {
                form.insertBefore(draggableElement, dropZone.nextSibling); // Drop the element after the dropZone
            }
        }
        e.target.style.opacity = '1'; // Reset the opacity after dropping
    }

    function handleDragEnd(e) {
        e.target.style.opacity = '1'; // Ensure the opacity is reset when the drag ends
    }

    // Apply drag and drop event listeners to the form
    form.addEventListener('dragover', handleDragOver);
    form.addEventListener('drop', handleDrop);

    // Utility function to make form fields draggable
    function makeDraggable(element) {
        element.setAttribute('draggable', true);
        element.id = `field-${Math.random().toString(16).slice(2)}`; // Generate a unique ID
        element.addEventListener('dragstart', handleDragStart);
        element.addEventListener('dragend', handleDragEnd);
    }

    // Functionality to add input fields
    const addInputField = document.getElementById("addInput");
    addInputField.addEventListener('click', () => {
        const formFields = document.createElement('div');
        formFields.classList.add('form-fields');
        makeDraggable(formFields); // Make the div draggable

        const fieldTitle = document.createElement('div');
        formFields.appendChild(fieldTitle);

        const label = document.createElement('label');
        label.textContent = `Sample Label`;
        label.setAttribute('contenteditable', 'true');
        label.onblur = (e) => updateFieldConfig(fieldId, 'label', e.target.textContent); // Update config on blur

        fieldTitle.appendChild(label);

        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash', 'delete-icon');
        trashIcon.addEventListener('click', () => {
            formFields.remove();
            removeFieldFromConfig(fieldId);
        });
        fieldTitle.appendChild(trashIcon);

        const inputElement = document.createElement('input');
        inputElement.placeholder = 'Sample Placeholder'
        inputElement.onchange = (e) => updateFieldConfig(fieldId, 'placeholder', e.target.value);

        formFields.appendChild(inputElement);

        form.appendChild(formFields);

        const fieldId = `field-${Math.random().toString(16).slice(2)}`; // Generate a unique ID
        const inputFieldConfig = {
            id: fieldId,
            type: "input",
            label: "Sample Label",
            placeholder: "Sample placeholder"
        };
        addFieldToConfig(inputFieldConfig);
    });

    // Functionality to add textarea fields
    const addTextAreaField = document.getElementById("addTextArea");
    addTextAreaField.addEventListener('click', () => {
        const formFields = document.createElement('div');
        formFields.classList.add('form-fields');
        makeDraggable(formFields);

        const fieldTitle = document.createElement('div');
        formFields.appendChild(fieldTitle);

        const label = document.createElement('label');
        label.textContent = 'Text area';
        label.setAttribute('contenteditable', 'true');
        label.onblur = (e) => updateFieldConfig(fieldId, 'label', e.target.textContent); // Update config on blur
        fieldTitle.appendChild(label);

        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash', 'delete-icon');
        trashIcon.addEventListener('click', () => {
            formFields.remove();
            removeFieldFromConfig(fieldId);
        });
        fieldTitle.appendChild(trashIcon);

        const textAreaElement = document.createElement('textarea');
        textAreaElement.placeholder = 'Sample Placeholder'
        textAreaElement.onchange = (e) => updateFieldConfig(fieldId, 'placeholder', e.target.value);

        formFields.appendChild(textAreaElement);

        form.appendChild(formFields);

        const fieldId = `field-${Math.random().toString(16).slice(2)}`; // Generate a unique ID
        const inputFieldConfig = {
            id: fieldId,
            type: "textarea",
            label: "Sample Label",
            placeholder: "Sample placeholder"
        };
        addFieldToConfig(inputFieldConfig);
    });

    // Functionality to add select fields
    const addSelectField = document.getElementById("addSelect");
    addSelectField.addEventListener('click', () => {
        const formFields = document.createElement('div');
        formFields.classList.add('form-fields');
        makeDraggable(formFields);

        const fieldTitle = document.createElement('div');
        formFields.appendChild(fieldTitle);

        const label = document.createElement('label');
        label.textContent = 'Select';
        fieldTitle.appendChild(label);

        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash', 'delete-icon');
        trashIcon.addEventListener('click', () => {
            formFields.remove();
            removeFieldFromConfig(fieldId);
        });
        fieldTitle.appendChild(trashIcon);

        const select = document.createElement('section');
        select.classList.add('select');
        formFields.appendChild(select);

        const selectBtn = document.createElement('div');
        selectBtn.classList.add('selectBtn');
        selectBtn.textContent = 'Select';
        select.appendChild(selectBtn);

        const selectDropdown = document.createElement('div');
        selectDropdown.classList.add('selectDropdown');
        select.appendChild(selectDropdown);

        let types = ['Self', 'Parent', 'Child', 'Other']
        types.forEach((item) => {
            const option = document.createElement('div');
            const buttonWrapper = document.createElement('div');
            const addBtn = document.createElement('span');
            const delBtn = document.createElement('span');
            addBtn.textContent = 'Add'
            delBtn.textContent = 'Delete'
            option.classList.add('option');
            option.textContent = item;
            option.onclick = () => {
                selectBtn.textContent = item;
                selectDropdown.classList.remove('toggle');
            };

            delBtn.addEventListener('click', () => {
                // option.remove();
                updateSelectConfig(fieldId, item, 'delete')
            });

            addBtn.addEventListener('click', () => {
                updateSelectConfig(fieldId, item, 'add')
            });

            buttonWrapper.appendChild(addBtn)
            buttonWrapper.appendChild(delBtn)
            option.appendChild(buttonWrapper)
            selectDropdown.appendChild(option);
        });

        selectBtn.onclick = () => selectDropdown.classList.toggle('toggle');
        form.appendChild(formFields);

        const fieldId = `field-${Math.random().toString(16).slice(2)}`; // Generate a unique ID
        const inputFieldConfig = {
            id: fieldId,
            type: "select",
            label: "Sample Label",
            options: []
        };
        addFieldToConfig(inputFieldConfig);
    });

    // Function to close the select dropdown when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideSelect = event.target.closest('.select');
        if (!isClickInsideSelect) {
            const dropdowns = document.querySelectorAll('.selectDropdown.toggle');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('toggle');
            });
        }
    });
});


const saveForm = document.getElementById('save-form')
saveForm.addEventListener('click', () => console.log(formFieldsConfig))






















