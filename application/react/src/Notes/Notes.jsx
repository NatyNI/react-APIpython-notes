import axios from "axios";
import { useEffect, useState } from "react";
import styles from './Notes.module.css'

const Notes = ({notes}) =>{

    
    // const [value, setValue] = useState()
    // useEffect(()=>{
    //    notes.map((row)=>{
    //     setValue(row["Note"])
    //    })
    // },[notes]);

const deleteNote = (value)=>{
    console.log(value)
    
}
return(
    <div>

        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Nr</th>
                    <th>Title</th>
                    <th>Note</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
            </thead>
            <tbody>
                {notes.map((row)=>(
                    <tr key={row.Nr}>
                        <td>{row.Nr}</td>
                        <td>{row.Title}</td>
                        <td>{row.Note}</td>
                        <td><button onClick={(e)=> deleteNote(row.Nr)} >Delete</button></td>
                        <td><button>Update</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        
    </div>
    
 )
};

    


export default Notes;