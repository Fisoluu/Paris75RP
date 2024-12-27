document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour masquer la notification après 10 secondes
    setTimeout(() => {
        const notification = document.querySelector('.notification-top-right');
        if (notification) {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 1000); // Attendre que l'animation d'opacité se termine
        }
    }, 10000); // 10 secondes

    // Fonction générique pour sauvegarder les données dans le stockage local
    function saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Fonction générique pour charger les données depuis le stockage local
    function loadData(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    // Fonction générique pour supprimer les données du stockage local
    function removeData(key, id) {
        const data = loadData(key);
        const filteredData = data.filter(item => item.id !== id);
        saveData(key, filteredData);
    }

    // Fonctions pour générer des IDs uniques
    function generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Gestion des casiers judiciaires
    const criminalRecordForm = document.getElementById('criminal-record-form');
    const criminalRecordsTableBody = document.getElementById('criminal-records-table').querySelector('tbody');
    loadCriminalRecords();

    criminalRecordForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = generateId();
        const user = event.target.user.value;
        const offense = event.target.offense.value;
        const date = event.target.date.value;

        const newRecord = { id, user, offense, date };
        appendRow(criminalRecordsTableBody, newRecord, 'criminalRecords');

        saveData('criminalRecords', [...loadData('criminalRecords'), newRecord]);
        criminalRecordForm.reset();
    });

    function loadCriminalRecords() {
        const records = loadData('criminalRecords');
        records.forEach(record => {
            appendRow(criminalRecordsTableBody, record, 'criminalRecords');
        });
    }

    // Gestion des procédures
    const procedureForm = document.getElementById('procedure-form');
    const proceduresTableBody = document.getElementById('procedures-table').querySelector('tbody');
    loadProcedures();

    procedureForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = generateId();
        const user = event.target['procedure-user'].value;
        const service = event.target['procedure-service'].value;
        const pdfFile = event.target['pdf-file'].files[0];
        const date = event.target['procedure-date'].value;

        const newProcedure = { id, user, service, pdfFile: pdfFile.name, date };
        appendRow(proceduresTableBody, newProcedure, 'procedures');

        // Sauvegarde du fichier PDF dans le stockage local
        const reader = new FileReader();
        reader.onload = (e) => {
            const pdfData = e.target.result;
            localStorage.setItem(`pdf_${id}`, pdfData);
        };
        reader.readAsDataURL(pdfFile);

        saveData('procedures', [...loadData('procedures'), newProcedure]);
        procedureForm.reset();
    });

    function loadProcedures() {
        const procedures = loadData('procedures');
        procedures.forEach(procedure => {
            appendRow(proceduresTableBody, procedure, 'procedures');
        });
    }
    // Gestion des patrouilles de la Police Nationale
    const policePatrolsTableBody = document.getElementById('police-patrols-table').querySelector('tbody');
    const addPolicePatrolButton = document.getElementById('add-police-patrol-button');
    loadPolicePatrols();

    if (addPolicePatrolButton) {
        addPolicePatrolButton.addEventListener('click', () => {
            const patrolName = prompt('Entrez le nom de la nouvelle patrouille :');
            if (patrolName) {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${patrolName}</td>
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                `;
                policePatrolsTableBody.appendChild(newRow);
            }
        });
    } else {
        console.error('Le bouton "Ajoutez une patrouille" n\'a pas été trouvé.');
    }

    function loadPolicePatrols() {
        const patrols = loadData('policePatrols');
        patrols.forEach(patrol => {
            appendRow(policePatrolsTableBody, patrol, 'policePatrols');
        });
    }

    // Gestion des patrouilles de la Gendarmerie Nationale
    const gendarmeriePatrolsTableBody = document.getElementById('gendarmerie-patrols-table').querySelector('tbody');
    const addGendarmeriePatrolButton = document.getElementById('add-gendarmerie-patrol-button');
    loadGendarmeriePatrols();

    if (addGendarmeriePatrolButton) {
        addGendarmeriePatrolButton.addEventListener('click', () => {
            const patrolName = prompt('Entrez le nom de la nouvelle patrouille :');
            if (patrolName) {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${patrolName}</td>
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                `;
                gendarmeriePatrolsTableBody.appendChild(newRow);
            }
        });
    } else {
        console.error('Le bouton "Ajoutez une patrouille" n\'a pas été trouvé.');
    }

    function loadGendarmeriePatrols() {
        const patrols = loadData('gendarmeriePatrols');
        patrols.forEach(patrol => {
            appendRow(gendarmeriePatrolsTableBody, patrol, 'gendarmeriePatrols');
        });
    }

    // Gestion des plaintes
    const complaintForm = document.getElementById('complaint-form');
    const complaintsTableBody = document.getElementById('complaints-table').querySelector('tbody');
    loadComplaints();

    complaintForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = generateId();
        const user = event.target['complaint-user'].value;
        const service = event.target['complaint-service'].value;
        const pdfFile = event.target['pdf-file'].files[0];
        const date = event.target['complaint-date'].value;

        const newComplaint = { id, user, service, pdfFile: pdfFile.name, date };
        appendRow(complaintsTableBody, newComplaint, 'complaints');

        // Sauvegarde du fichier PDF dans le stockage local
        const reader = new FileReader();
        reader.onload = (e) => {
            const pdfData = e.target.result;
            localStorage.setItem(`pdf_${id}`, pdfData);
        };
        reader.readAsDataURL(pdfFile);

        saveData('complaints', [...loadData('complaints'), newComplaint]);
        complaintForm.reset();
    });

    function loadComplaints() {
        const complaints = loadData('complaints');
        complaints.forEach(complaint => {
            appendRow(complaintsTableBody, complaint, 'complaints');
        });
    }

    // Fonction générique pour ajouter une ligne dans une table
    function appendRow(tbody, data, key) {
        const newRow = document.createElement('tr');
        const keys = Object.keys(data).filter(k => k !== 'id');
        keys.forEach(k => {
            const cell = document.createElement('td');
            if (k === 'pdfFile') {
                cell.innerHTML = `<button class="collapsible">Voir le PDF</button>
                                  <div class="content">
                                      <a href="#" onclick="openPdf('${data.id}')">${data[k]}</a>
                                  </div>`;
            } else {
                cell.textContent = data[k];
            }
            newRow.appendChild(cell);
        });

        const actionCell = document.createElement('td');
        actionCell.innerHTML = `
            <button class="edit-btn">Modifier</button>
            <button class="delete-btn">Supprimer</button>
        `;
        newRow.appendChild(actionCell);
        tbody.appendChild(newRow);

        // Event listeners pour les boutons Modifier et Supprimer
        newRow.querySelector('.edit-btn').addEventListener('click', () => editRow(newRow, data.id, key));
        newRow.querySelector('.delete-btn').addEventListener('click', () => deleteRow(newRow, data.id, key));

        // Event listener pour le bouton Voir le PDF
        newRow.querySelector('.collapsible').addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    }
    // Fonction pour ouvrir le fichier PDF
    window.openPdf = (id) => {
        const pdfData = localStorage.getItem(`pdf_${id}`);
        if (pdfData) {
            const pdfWindow = window.open();
            pdfWindow.document.write(`
                <iframe width="100%" height="100%" src="${pdfData}"></iframe>
            `);
        } else {
            alert('Le fichier PDF est introuvable.');
        }
    };

    // Fonction pour éditer une ligne
    function editRow(row, id, key) {
        const cells = row.querySelectorAll('td');
        const data = loadData(key).find(item => item.id === id);
        const form = document.querySelector(`#${key.slice(0, -1)}-form`);

        Object.keys(data).forEach((k, index) => {
            if (k !== 'id') {
                form[k].value = data[k];
            }
        });

        row.remove();
        removeData(key, id);
    }

    // Fonction pour supprimer une ligne
    function deleteRow(row, id, key) {
        row.remove();
        removeData(key, id);
        // Supprimer également le fichier PDF du stockage local
        localStorage.removeItem(`pdf_${id}`);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour afficher une section et cacher les autres
    function navigateToSection(sectionId) {
        const sections = document.querySelectorAll('main > section');
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }

    // Ajouter des écouteurs d'événements pour les liens de navigation
    const navLinks = document.querySelectorAll('.sidebar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetSectionId = link.getAttribute('href').substring(1);
            navigateToSection(targetSectionId);
        });
    });

    // Afficher la section d'accueil par défaut
    navigateToSection('home');

    // Gestion de l'ajout de nouvelles patrouilles pour la Police Nationale
    const addPolicePatrolButton = document.getElementById('add-police-patrol-button');
    if (addPolicePatrolButton) {
        const policePatrolsTableBody = document.querySelector('#police-patrols-table tbody');
        addPolicePatrolButton.addEventListener('click', () => {
            const patrolName = prompt('Entrez le nom de la nouvelle patrouille :');
            if (patrolName) {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${patrolName}</td>
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                `;
                policePatrolsTableBody.appendChild(newRow);
            }
        });
    } else {
        console.error('Le bouton "Ajoutez une patrouille" n\'a pas été trouvé.');
    }

    // Gestion de l'ajout de nouvelles patrouilles pour la Gendarmerie Nationale
    const addGendarmeriePatrolButton = document.getElementById('add-gendarmerie-patrol-button');
    if (addGendarmeriePatrolButton) {
        const gendarmeriePatrolsTableBody = document.querySelector('#gendarmerie-patrols-table tbody');
        addGendarmeriePatrolButton.addEventListener('click', () => {
            const patrolName = prompt('Entrez le nom de la nouvelle patrouille :');
            if (patrolName) {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${patrolName}</td>
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                `;
                gendarmeriePatrolsTableBody.appendChild(newRow);
            }
        });
    } else {
        console.error('Le bouton "Ajoutez une patrouille" n\'a pas été trouvé.');
    }
});
