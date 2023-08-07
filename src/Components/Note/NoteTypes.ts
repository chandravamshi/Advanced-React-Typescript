export type Note = {
    id: string
} & NoteData

export type NoteData = {
    title: string,
    markdown: string,
    tags: Tag[]
}

export type Tag = {
    label: string,
    id: string
}

export type RawNote = {
    id: string;
} & RawNoteData

export type RawNoteData = {
    title: string,
    markdown: string,
    tagIds: string[]
}

export type NoteProps = {
    onSubmit: (data: NoteData) => void,
    onCreateTag: (tag: Tag) => void,
    availableTags: Tag[]
} & Partial<NoteData>

export type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void,
    onCreateTag: (tag: Tag) => void,
    availableTags: Tag[]
}

export type NoteListProps = {
    availableTags: Tag[],
    notes: Note[],
    updateTag: (id: string, label: string) => void,
    deleteTag: (id: string) => void
}

export type NoteLayoutProps = {
    notes: Note[]
}

export type SimplifiedNote = {
    id: string,
    tags: Tag[],
    title: string
}

export type ShowNoteProps = {
    onDelete: (id: string) => void
}


export type EditTagsModalProps = {
    show: boolean,
    availableTags: Tag[],
    handleClose: () => void,
    updateTag: (id: string, label: string) => void,
    deleteTag: (id: string) => void
}