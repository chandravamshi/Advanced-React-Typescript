import React from 'react'
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import { Link, useNavigate } from 'react-router-dom'
import { useNote } from './NoteLayout'
import { ShowNoteProps } from './NoteTypes'

function NoteShow({ onDelete }: ShowNoteProps) {
    const note = useNote()
    const navigate = useNavigate()
    // console.log(note)
    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <h1>{note.title}</h1>
                    <Stack direction='horizontal'>
                        {note.tags.length > 0 && (note.tags.map((tag) => <Badge className='text-truncate' key={tag.id}>
                            {tag.label}
                        </Badge>
                        ))}
                    </Stack>
                </Col>

                <Col xs='auto'>
                    <Stack direction='horizontal' gap={2}>
                        <Link to={`/${note.id}/edit`}>
                            <Button>
                                Edit
                            </Button>
                        </Link>
                        <Button variant='outline-danger' onClick={() => {
                            onDelete(note.id)
                            navigate('/')
                        }}>Delete</Button>
                        <Link to='/'>
                            <Button variant='outline-secondary'>
                                Back
                            </Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </>

    )
}

export default NoteShow