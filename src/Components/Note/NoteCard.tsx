import React from 'react'
import { Badge, Card, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { SimplifiedNote } from './NoteTypes'
import styles from './Note.module.css'

function NoteCard({ title, id, tags }: SimplifiedNote) {
    return (
        <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
            <Card.Body>
                <Stack className='align-items-center justify-content-center'>
                    <span className='fs-5'>{title}</span>
                    <Stack direction='horizontal' className='justify-content-center flex-wrap' gap={1}>
                        {tags.map((tag) => <Badge className='text-truncate' key={tag.id}>
                            {tag.label}
                        </Badge>
                        )}
                    </Stack>


                </Stack>

            </Card.Body>
        </Card>
    )
}

export default NoteCard