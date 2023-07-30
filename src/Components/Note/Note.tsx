import React from 'react'
import NoteForm from './NoteForm'
import { NoteProps } from './NoteTypes'

function Note({ onSubmit,onCreateTag ,availableTags}: NoteProps) {
    return (
        <>
            <h1 className='mb-4'>Note</h1>
            <NoteForm onSubmit={onSubmit} onCreateTag={onCreateTag} availableTags={availableTags}/>
        </>

    )
}

export default Note