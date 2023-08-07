import { Navigate, Outlet, useOutletContext, useParams } from 'react-router'
import { Note, NoteLayoutProps } from './NoteTypes'

export default function NoteLayout({ notes }: NoteLayoutProps) {
    const { id } = useParams()
    const note = notes.find(note => note.id === id)

    if(!note) return <Navigate to={'/'} replace/>

    return <Outlet context={note} />
}
export function useNote(){
    return useOutletContext<Note>()
}