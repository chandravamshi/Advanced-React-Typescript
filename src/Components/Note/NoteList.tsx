import React, { useMemo, useState } from 'react'
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import NoteCard from './NoteCard'
import { EditTagsModalProps, NoteListProps, Tag } from './NoteTypes'


function NoteList({ availableTags, notes, deleteTag, updateTag }: NoteListProps) {

    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState('')
    const [showDialog, setShowDialog] = useState(false)

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (
                (title === '' || note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())) &&
                (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))

            )
        })
    }, [title, selectedTags, notes])
    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col ><h1>NOTES</h1></Col>
                <Col xs='auto'>
                    <Stack direction='horizontal' gap={2}>
                        <Link to='/new'>
                            <Button type='button'>Create New</Button>
                        </Link>
                        <Button variant='outline-secondary' onClick={() => setShowDialog(true)}>EditTags</Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className='mb-4'>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' value={title} onChange={(e) => setTitle(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect
                                value={selectedTags.map(tag => { return { label: tag.label, value: tag.id } })}
                                options={availableTags.map((availableTag) => {
                                    return { label: availableTag.label, value: availableTag.id }
                                })}
                                onChange={tags => { setSelectedTags(tags.map(tag => { return { label: tag.label, id: tag.value } })) }}
                                isMulti />

                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} md={2} lg={3} xl={4} className='g-3'>
                {filteredNotes.map(filteredNote => (
                    <Col key={filteredNote.id}>
                        <NoteCard
                            id={filteredNote.id}
                            tags={filteredNote.tags}
                            title={filteredNote.title} />
                    </Col>
                ))}
            </Row>
            <EditTagsModal show={showDialog} availableTags={availableTags} handleClose={() => setShowDialog(false)} deleteTag={deleteTag} updateTag={updateTag}></EditTagsModal>
        </>
    )
}

export default NoteList


function EditTagsModal({ availableTags, show, handleClose, deleteTag, updateTag }: EditTagsModalProps) {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {availableTags.map(tag => (
                            <Row key={tag.id}>
                                <Col>
                                    <Form.Control value={tag.label}
                                        onChange={(e) => updateTag(tag.id, e.target.value)} />
                                </Col>
                                <Col xs='auto'>
                                    <Button variant='outline-danger' onClick={() => deleteTag(tag.id)}>&times;</Button>
                                </Col>
                            </Row>
                        ))}
                    </Stack>
                </Form>

            </Modal.Body>
        </Modal>

    )
}