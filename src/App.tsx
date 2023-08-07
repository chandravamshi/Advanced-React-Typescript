import 'bootstrap/dist/css/bootstrap.min.css'
import { useMemo } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Note from './Components/Note/Note'
import { NoteData, RawNote, Tag } from './Components/Note/NoteTypes'
import useLocalStorageHook from './hooks/useLocalStorageHook'
import { v4 as uuidV4 } from 'uuid'
import NoteList from './Components/Note/NoteList'
import NoteShow from './Components/Note/ShowNote'
import NoteLayout from './Components/Note/NoteLayout'
import EditNote from './Components/Note/EditNote'



function App() {

  const [notes, setNotes] = useLocalStorageHook<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorageHook<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return { ...note, tags: tags.filter((tag) => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(preValues => [...preValues, { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) }])
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(preValues => {
      return preValues.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else { return note }
      })
    })
  }

  function onCreateTag(newTag: Tag) {
    setTags(preVales => [...preVales, newTag]
    )
  }

  function onDeleteNote(id: string) {
    setNotes(preValue => preValue.filter((note) => note.id !== id))
  }

  function onUpdateTag(id: string, label: string) {
    setTags(preValues => {
      return preValues.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else { return tag }
      })
    })
  }

  function onDeleteTag(id: string) {
    setTags(preValue => preValue.filter((tag) => tag.id !== id))
  }

  return <Container className='my-4'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NoteList availableTags={tags} notes={notesWithTags} updateTag={onUpdateTag} deleteTag={onDeleteTag}/>}></Route>
        <Route path='new' element={<Note onSubmit={onCreateNote} onCreateTag={onCreateTag} availableTags={tags} />}></Route>
        <Route path='/:id' element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<NoteShow onDelete={onDeleteNote} />}></Route>
          <Route path='edit' element={<EditNote onSubmit={onUpdateNote} onCreateTag={onCreateTag} availableTags={tags} />}></Route>
        </Route>
        <Route path='*' element={<Navigate to={'/'} />}></Route>
      </Routes>
    </BrowserRouter>
  </Container>



}

export default App
