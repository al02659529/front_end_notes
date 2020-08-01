import React, { useState, useEffect } from 'react'
import Note from "./components/Note";
import noteService from './services/notes'
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = (props) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('' )
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        noteService.getAll().then(initialNotes => {
            setNotes(initialNotes)
        })
    }, [])

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService.update(id, changedNote).then(returnedNote => {
            setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        }).catch(error => {
            setErrorMessage(`Note '${note.content}' was already removed from server` )
            setTimeout(() => {setErrorMessage(null) },5000)
        })
    }
    console.log('render', notes.length, 'notes')

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5
        }
        noteService.create(noteObject).then(returnedNote => {
            setNotes(notes.concat(returnedNote))
            setNewNote('')
        })


    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important);

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}> show {showAll ? 'important' : 'all' }</button>
            </div>
            <ul>
                {notes ? notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/> ) : null}
            </ul>
            <form onSubmit={addNote}>
                <input
                    placeholder={"submit a new note"}
                    value={newNote}
                    onChange={handleNoteChange}/>
                <button type="submit">save</button>
            </form>
            <Footer />
        </div>
    )
}


export default App;