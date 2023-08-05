import React from 'react'
import NoteForm from './NoteForm'
import { useNote } from './NoteLayout'
import { EditNoteProps } from './NoteTypes'

function EditNote({ onSubmit, onCreateTag, availableTags }: EditNoteProps) {
    const note = useNote()
    return (
        <>
            <h1 className='mb-4'>Edit Note</h1>
            <NoteForm 
            title={note.title}
            markdown={note.markdown}
            tags={note.tags}
            onSubmit={(data) => onSubmit(note.id, data)} onCreateTag={onCreateTag} availableTags={availableTags} />
        </>

    )
}

export default EditNote
