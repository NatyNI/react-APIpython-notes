import axios from "axios";
import { useEffect, useState } from "react";
import styles from './Notes.module.css';
import ReactModal from 'react-modal';



const Notes = ({notes}) =>{

    const [modal, setModal] = useState(false)
    const [title, setTitle] = useState()
    const [note, setNote] = useState()
    const [nr, setNr] = useState()

    ReactModal.setAppElement('#root')

    const deleteNote = (Nr)=>{
        axios.delete(`http://127.0.0.1:5001/delete/${Nr}`)
        .then(response =>{
            console.log(`Deleted note with Nr ${Nr}`, response);
        })
        .catch(error => {
            console.error(` Error deleting note with Nr ${Nr}`, error);
        });
    };

    const updateNote = (title, note) =>{
        setModal(false)
        axios.put('http://127.0.0.1:5001/put', {title: title, note: note, nr: nr})
        .then(response=>{
            console.log(`Updated note with Nr ${nr}`, response);
        })
        .catch(error => {
            console.log(`Error update note with Nr ${nr}`, error)
        });
    };

    const updateModal = (title, note, nr) =>{
        setModal(true)
        setTitle(title)
        setNote(note)
        setNr(nr)
    };

    
    return(
        <div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Note</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((row)=>(
                        <tr key={row.Nr}>
                            <td>{row.Title}</td>
                            <td>{row.Note}</td>
                            <td><button 
                                onClick={()=> deleteNote(row.Nr)} 
                            >Delete</button></td>
                            <td>
                                <button 
                                    onClick={() => {updateModal(row.Title, row.Note, row.Nr)}}
                                >Update</button>
                                <ReactModal isOpen={modal}>
                                    <input 
                                        type="text" 
                                        value={title} 
                                        onChange={(e)=>{setTitle(e.target.value)}}>
                                    </input> <br></br>
                                    <input 
                                        type="text" 
                                        value={note} 
                                        onChange={(e)=> {setNote(e.target.value)}}>
                                    </input> <br></br>
                                    <button 
                                        onClick={()=> updateNote(title, note)} 
                                    >Update</button>
                                </ReactModal>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button>Add</button>
        </div>

     );
    };

export default Notes;