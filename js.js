const folderSectionsContainer = document.getElementById("folderSections");
    const folderInput = document.getElementById("folderInput");
    const uploadBtn = document.getElementById("uploadBtn");
    const newBtn = document.getElementById("newBtn");
    const fileViewContainer = document.getElementById("fileView");
    const fileIframe = document.getElementById("fileIframe");

    // Evento para cuando se selecciona una carpeta
    folderInput.addEventListener("change", handleFolderUpload);

    function handleFolderUpload(event) {
        const files = event.target.files;

        // Limpiar el contenedor de carpetas antes de agregar nuevos archivos
        folderSectionsContainer.innerHTML = '';

        const folders = {};

        for (const file of files) {
            const folderName = file.webkitRelativePath.split('/').slice(0, -1).pop();  // Solo el nombre de la carpeta

            if (!folders[folderName]) {
                folders[folderName] = [];
            }

            folders[folderName].push(file);
        }

        // Agregar las carpetas y archivos
        for (const folder in folders) {
            const folderSection = document.createElement('div');
            folderSection.classList.add('folder-section');
            
            // Crear la sección de la carpeta
            const folderHeader = document.createElement('div');
            folderHeader.classList.add('folder');
            folderHeader.innerHTML = `
                <span>${folder}</span>
            `;

            const fileList = document.createElement('ul');
            fileList.classList.add('file-list');

            folders[folder].forEach(file => {
                const fileItem = document.createElement('li');
                fileItem.classList.add('file-item');
                fileItem.textContent = file.name;
                fileItem.addEventListener('click', () => openFile(file));
                fileList.appendChild(fileItem);
            });

            folderSection.appendChild(folderHeader);
            folderSection.appendChild(fileList);

            // Agregar la sección de la carpeta al contenedor
            folderSectionsContainer.appendChild(folderSection);

            // Evento para hacer la carpeta despegable al hacer clic
            folderHeader.addEventListener('click', () => {
                if (fileList.style.display === 'none' || fileList.style.display === '') {
                    fileList.style.display = 'block';
                } else {
                    fileList.style.display = 'none';
                }
            });
        }

        // Ocultar el botón de subir archivo
        uploadBtn.style.display = 'none';
        
        // Mostrar el botón de limpiar vista
        newBtn.style.display = 'block';
    }

    function openFile(file) {
        const fileURL = URL.createObjectURL(file);

        // Mostrar el contenedor de vista de archivo
        folderSectionsContainer.style.display = 'none';
        fileViewContainer.style.display = 'block';

        // Cargar el archivo en un iframe
        fileIframe.src = fileURL;
    }

    function goBack() {
        // Ocultar la vista de archivo y volver a mostrar las carpetas
        fileViewContainer.style.display = 'none';
        folderSectionsContainer.style.display = 'block';
    }

    function clearView() {
        // Limpiar la vista, reiniciar el formulario
        folderSectionsContainer.innerHTML = '';
        uploadBtn.style.display = 'block';
        newBtn.style.display = 'none';
        fileViewContainer.style.display = 'none';
        folderInput.value = ''; // Limpiar el input de archivo
    }