document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes-container');
    const newNoteButton = document.getElementById('new-note');

    newNoteButton.addEventListener('click', () => {
        window.location.href = '/notas/new';
    });

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
});

function editNote (id) {
    window.location.href = `/notas/${id}`;
}
