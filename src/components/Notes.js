import axios from "axios";
import { useEffect, useState } from "react";
import { initFlowbite } from 'flowbite'
import { Field, Form, Formik } from "formik";
import { useRef } from "react";

const Notes = () => {
    const [notes, setNotes] = useState([]);

    const [selectedNote, setSelectedNote] = useState({});


    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:3030/getNotes');
            setNotes(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const getSelectedNote = async (NoteId) => {
        try {
            const response = await axios.get(`http://localhost:3030/getNote/${NoteId}`);
            setSelectedNote(response.data);
        } catch (error) {
            console.log(error);
        }

    }

    const noteInitialState = {
        note_title: selectedNote.note_title,
        note_description: selectedNote.note_description
    }
    console.log(noteInitialState);

    const updateNote = async (noteId, val) => {
        try {
            const response = await axios.put(`http://localhost:3030/updateNote/${noteId}`, val);
            fetchNotes();
        } catch (error) {
            console.log(error);
        }

    }


    const deleteNote = async (noteId) => {
        try {
            const response = await axios.delete(`http://localhost:3030/deleteNote/${noteId}`);
            fetchNotes();
        } catch (error) {
            console.log(error);
        }
    };


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const note_data = { note_title: title, note_description: description }


    async function saveNote(event) {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3030/addNote', note_data);
            setTitle('');
            setDescription('');
            fetchNotes();
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetchNotes();
    }, []);

    const dataRef = useRef(notes);

    useEffect(() => {
        dataRef.current = notes;
        initFlowbite();
    }, [notes]);


    return (
        <>
            <div className="p-2 dark:bg-gray-800">
                <form className="max-w-sm mx-auto" onSubmit={saveNote}>
                    <div class="mb-5">
                        <label for="tile" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tile</label>
                        <input minLength={2} value={title} type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Todo title . . ." onChange={(val) => { setTitle(val.target.value) }} required />
                    </div>
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
                    <textarea minLength={2} value={description} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your todo description here . . ." onChange={(val) => { setDescription(val.target.value) }} required></textarea>
                    <div className="flex justify-end">

                        <button type="submit" class="mt-2 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Add Todo</button>
                    </div>
                </form>

            </div>
            <div className="flex flex-wrap p-2 gap-2 dark:bg-gray-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                    {notes.length !== 0 ? (
                        notes.map((note) => (
                            <div key={note.id} className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg text-black dark:text-white relative border dark:border-yellow-200">
                                {}
                                <h4 className="dark:text-gray-400">{new Date(note.createdAt).toLocaleDateString()}</h4>
                                <button
                                    type="button"
                                    onClick={() => { getSelectedNote(note.id) }}
                                    className="absolute top-2 right-2 text-lg text-blue-500 dark:text-blue-200"
                                    data-modal-target="note-action" data-modal-toggle="note-action"
                                >
                                    <i className="bx bxs-edit"></i>
                                </button>
    
                                <h2 className="text-lg font-boldc dark:text-yellow-200">{note.note_title}</h2>
                                <p className="dark:text-gray-300">{note.note_description}</p>
                            </div>
                        ))
                    ) : (<h2 className="text-center text-gray-500">Todo's not found, not added yet ?</h2>) }
                    
                </div>
            </div>



            {/* Modal  */}

            {/* <!-- Main modal --> */}
            <div id="note-action" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ">
                <div class="relative p-4 w-full max-w-xl max-h-full">
                    {/* <!-- Modal content --> */}
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 border dark:border-yellow-300">
                        {/* <!-- Modal header --> */}
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Update Todo
                            </h3>
                            <div className="flex gap-4">
                                
                                <button  onClick={() => { deleteNote(selectedNote.id) }} data-modal-hide="note-action" className="">

                                    <i class='bx bx-trash-alt text-2xl text-red-500 hover:bg-gray-200 rounded-full w-8 h-8' ><svg class="w-1 h-1" aria-hidden="true">

                                    </svg></i>
                                </button>

                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="note-action">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div class="p-4 md:p-5 space-y-4">

                            <Formik
                                initialValues={noteInitialState}
                                enableReinitialize={true}
                                onSubmit={(val) => { updateNote(selectedNote.id, val) }}
                            >
                                <Form className="max-w-sm mx-auto">
                                    <div class="mb-5">
                                        <label for="tile" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tile</label>
                                        <Field name="note_title" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-yellow-200" placeholder="todo title . . ." required />
                                    </div>
                                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
                                    <Field as="textarea" name="note_description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-gray-200" placeholder="Write your todo description here . . ." required />

                                    <div class="justify-end flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button type="submit" data-modal-hide="note-action" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                                            <svg class="w-1 h-1" aria-hidden="true">

                                            </svg>
                                            Update</button>

                                    </div>
                                </Form>
                            </Formik>



                        </div>
                       

                    </div>
                </div>
            </div>


        </>
    );
}

export default Notes;
