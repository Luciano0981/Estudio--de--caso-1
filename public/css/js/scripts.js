document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes-container');
    const newNoteButton = document.getElementById('new-note');
    const noteForm = document.getElementById('note-form');
    const deleteButton = document.getElementById('delete-note');

    newNoteButton.addEventListener('click', () => {
        window.location.href = '/notas/new';
    });

    if (noteForm) {
        noteForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const id = new URLSearchParams(window.location.search).get('id');
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
            const tags = document.getElementById('tags').value.split(',');

            const method = id ? 'PUT' : 'POST';
            const url = id ? `/api/notas/${id}` : '/api/notas';

            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content, tags })
            })
            .then(response => response.json())
            .then(data => {
                window.location.href = '/notas';
            });
        });

        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                const id = new URLSearchParams(window.location.search).get('id');
                fetch(`/api/notas/${id}`, {
                    method: 'DELETE'
                })
                .then(() => {
                    window.location.href = '/notas';
                });
            });
        }
    }

    if (notesContainer) {
        fetch('/api/notas')
            .then(response => response.json())
            .then(notes => {
                notesContainer.innerHTML = '';
                notes.forEach(note => {
                    const noteElement = document.createElement('div');
                    noteElement.classList.add('note');
                    noteElement.innerHTML = `
                        <h2>${note.title}</h2>
                        <p>${note.content}</p>
                        <p>${note.tags.join(', ')}</p>
                        <p>Created: ${new Date(note.createdAt).toLocaleString()}</p>
                        <p>Updated: ${new Date(note.updatedAt).toLocaleString()}</p>
                        <button onclick="editNote('${note.id}')">Edit</button>
                    `;
                    notesContainer.appendChild(noteElement);
                });
            });
    }
});

function editNote (id) {
    window.location.href = `/notas/${id}`;
}
