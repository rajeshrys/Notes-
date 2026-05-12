import React from 'react'
import { useState,useEffect  } from 'react'
import './style.css'
import { createnotes,deleteNote,deleteNotes,getnotes,updateNote } from '../auth/api/authApi'

const Homepage = () => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [editId, setEditId] = useState(null)
const [editTitle, setEditTitle] = useState("")
const [editDescription, setEditDescription] = useState("")

  const [task, setTask] = useState([])
  const [error, setError] = useState("")

  const handlesubmit = async (e) => {
    e.preventDefault()

    const copyTask = [...task]

    try{
    const response = await createnotes({title,description})
    copyTask.push(response.notes)
 
    console.log(copyTask)

    setTask(copyTask)

    setTitle('')
    setDescription('')

    }catch(err){
      setError(
      err.response?.data?.message || "Title and Description are required"
     )
    }   



  }

  useEffect(() => {
    async function fetchNotes(){
      try{
        const response = await getnotes()
        console.log(response)
        setTask(response.notes)
      }
      catch(err){
        console.log(err)
      }
    }
  
    fetchNotes()
  }, [])
  

  const deletenote = async (idx,note)=>{
    const copyTask = [...task]

    console.log(note)
    
    const response = await deleteNote(note)
    console.log(response)
    
  
    copyTask.splice(idx,1)
    
    setTask(copyTask)
   
  }
  
const saveUpdate = async(id)=>{

   try{

      const response = await updateNote(
         id,
  {
            title: editTitle,
            description: editDescription
  }
      )

      const updatedTasks = task.map((note)=>{

         if(note._id === id){

            return {
               ...note,
               title: editTitle,
               description: editDescription
            }
         }

         return note
      })

      setTask(updatedTasks)

      setEditId(null)

   }
   catch(err){
      console.log(err)
   }

}


  const deletallnotes= async(idx)=>{
    const copyTask = [...task]

    const response = await deleteNotes()

    console.log(response)

    copyTask.splice(0)


    setTask(copyTask)
  }

  

  return (
    <div className='min-h-screen w-full bg-gray-800 flex flex-col lg:flex-row scrollbar-hide'>

      <form
        onSubmit={(e) => {
          handlesubmit(e)
        }}
        className='px-6 sm:px-10 lg:px-18 py-10 bg-white flex flex-col items-center lg:items-start justify-start min-h-screen w-full lg:w-[50%] gap-4'
      >

        <h1 className='text-2xl sm:text-3xl px-8 sm:px-20 py-4 font-bold uppercase bg-blue-600 rounded-xl text-white text-center'>
          Create Notes
        </h1>

        <input
          className='text-xl sm:text-2xl lg:text-3xl w-full max-w-[500px] p-4 font-bold rounded-xl bg-gray-900 text-white outline-none'
          type="text"
          placeholder='Title'
          value={title}
          onChange={(e)=>{
            setTitle(e.target.value)
          }}
        />

        <textarea
          className='text-xl sm:text-2xl lg:text-3xl font-bold text-white bg-gray-900 rounded-xl w-full max-w-[500px] h-[250px] sm:h-[300px] outline-none p-4'
          placeholder='Notes Description'
          value={description}
          onChange={(e)=>{
            setDescription(e.target.value)
          }}
        >
        </textarea>

        <button className='text-xl active:scale-96 sm:text-2xl text-white uppercase font-bold bg-slate-800 p-4 rounded-xl w-full max-w-[500px]'>
          Add Note
        </button>
        {
        error && (
      <p className='text-red-500 mt-4 font-semibold'>
        {error}
      </p>
        )
       }

      </form>
      
      <section className='min-h-screen w-full lg:w-[50%] flex flex-col'>

        <h1 className='text-white text-2xl sm:text-3xl text-center py-8 uppercase font-bold bg-gray-600'>
          Recent Notes
        </h1>

        <div className='bg-gray-900 w-full flex flex-wrap justify-center overflow-y-auto scrollbar-hide p-4'>

          {task.map(function(note,idx){
            return <div key={idx}  className='h-[400px] w-[250px] m-6 flex flex-col rounded-xl bg-[url(https://cdn.pixabay.com/photo/2017/03/18/17/46/notepad-2154581_640.png)] bg-gray-900 bg-cover bg-center py-21 px-4 text-xl gap-3'>
              {
            editId === note._id ? (

    <div className='flex flex-col gap-3 flex-1'>

      <input
        className='w-full bg-white text-black rounded-lg p-2 outline-none border-2 border-blue-500 font-semibold'
        value={editTitle}
        onChange={(e)=>setEditTitle(e.target.value)}
      />

      <textarea
        className='flex-1 resize-none bg-white text-black rounded-lg p-2 outline-none border-2 border-blue-500'
        value={editDescription}
        onChange={(e)=>setEditDescription(e.target.value)}
      />

      <button
        onClick={()=>{
          saveUpdate(note._id)
        }}
        className='bg-green-600 hover:bg-green-500 active:scale-95 transition-all rounded-lg text-white font-bold py-2 uppercase'
      >
        Save
      </button>

    </div>

  ) : (

    <>

      <h3 className='font-bold text-2xl break-words'>
        {note.title}
      </h3>

      <p className='flex-1 overflow-y-auto break-words hide-scrollbar'>
        {note.description}
      </p>

    </>

  )
}

              <button onClick={()=>{
                deletenote(idx,note._id)
              }} className='active:scale-95 bg-red-600 rounded outline-none uppercase text-white '>Delete</button>
              <button onClick={()=>{
               setEditId(note._id)
   setEditTitle(note.title)
   setEditDescription(note.description)
              }} className='active:scale-95 bg-blue-600 rounded outline-none uppercase text-white '>update</button>

            </div>
          })}
            
          {
        task.length > 0 && (
          <div className='flex justify-bottom px-85 py-12'>
            <div>
              <button
                className='font-bold bg-red-600 rounded-xl text-white text-xl w-[124px] px-2 py-3'
                onClick={deletallnotes}
              >
                Delete All
              </button>
            </div>
          </div>
        )
      }

        </div>
        

      </section>
    </div>
  )
}

export default Homepage