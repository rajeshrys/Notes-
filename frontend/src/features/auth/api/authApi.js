import api from '../../../lib/axios';

export const registeruser = async(userData)=>{
    const response = await api.post("/auth/register",userData)
    return response.data
}

export const loginuser = async(userData)=>{

    const response = await api.post("/auth/login",userData)

    return response.data
}

export const createnotes = async(notesData)=>{
    const response = await api.post("/notes/createnotes",notesData)
    
    return response.data
}


export const deleteNote = async(Id)=>{
    const response = await api.delete(`/notes/DeleteNote/${Id}`)
    return response.data
}

export const deleteNotes = async()=>{
    const response = await api.delete('/notes/DeleteNotes')
    return response.data
}

export const getnotes = async()=>{
    const response = await api.get('/notes/getNotes')
    return response.data
}

export const updateNote = async(id,Notesdata)=>{
    const response = await api.patch(`/notes/updateone/${id}`,Notesdata)
    return response.data
}


