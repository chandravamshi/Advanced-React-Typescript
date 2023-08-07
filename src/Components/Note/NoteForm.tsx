import React, { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import Creatable, { useCreatable } from 'react-select/creatable';
import { NoteProps, Tag } from './NoteTypes';
import { v4 as uuidV4 } from 'uuid'

function NoteForm({ onSubmit, onCreateTag, availableTags,title='',markdown='',tags=[] }: NoteProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const navigate = useNavigate()
    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        onSubmit(
            {
                title: titleRef.current!.value,
                markdown: textAreaRef.current!.value,
                tags: selectedTags
            }
        )
        navigate('..')

    }
    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control required ref={titleRef} defaultValue={title}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <Creatable
                                options={availableTags.map((availableTag) => {
                                    return { label: availableTag.label, value: availableTag.id }
                                })}
                                onCreateOption={(label => {
                                    onCreateTag({ label, id: uuidV4() })
                                    setSelectedTags((preValue) => [...preValue, { label, id: uuidV4() }])
                                })}
                                onChange={tags => { setSelectedTags(tags.map(tag => { return { label: tag.label, id: tag.value } })) }}
                                value={selectedTags.map(tag => { return { label: tag.label, value: tag.id } })}
                                isMulti></Creatable>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId='markdown'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control ref={textAreaRef} as='textarea' required rows={15} defaultValue={markdown}></Form.Control>
                </Form.Group>
                <Stack direction='horizontal' gap={2} className='justify-content-end'>
                    <Button type='submit'>Save</Button>
                    <Link to={'..'}>
                        <Button type='button' variant='outline-secondary'>Cancel</Button>
                    </Link>
                </Stack>
            </Stack>


        </Form>
    )
}

export default NoteForm