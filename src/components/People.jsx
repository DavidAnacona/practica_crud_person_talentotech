import PropTypes from 'prop-types'
import { Person } from './Person'
import { useState } from 'react'

export const People = ({ persons, setPersons }) => {

  const [editingId, setEditingId] = useState(null);

  const [editedPerson, setEditedPerson] = useState({
      name: "",
      role: "",
      img: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  //Estado para eliminar la persona eliminada
  const [personToDelete, setPersonToDelete] = useState(null);

  //Metodo para capturar los datos del formulario
  const handleChange = (e) => {
    const {name, value } = e.target;
    setEditedPerson(prevState => ({
      ... prevState,
      [name]: value
    }))
  }

  //Metodo para editar los datos 
  const handleEdit = (id) => {
    //Establecemos el Id de la persona a editar
    setEditingId(id);
    //Activar estado de edición
    setIsEditing(true);
    //Buscar la persona a editar
    const personToEdit = persons.find(person => person.id === id);
    setEditedPerson({...personToEdit});
  }

  //Metodo para actualizar los datos modificados
  const handleSave = (e) => {

    // Prevenir que el navegador se actualice
    e.preventDefault();

    // Actualizar el estado de persons al guardar los datos modificados
    const updatedPersons = persons.map(person => person.id === editingId ? editedPerson : person);

    // Actualizar los datos de la persona en el array
    setPersons(updatedPersons);

    // Desactivar el estado de edición
    setIsEditing(false);

    // Resetear la variable de estado editingId a null
    setEditingId(null);

    // Resetear la variable de estado editedPerson
    setEditedPerson({ name: '', role: '', img: '' });
  }

  //Metodo para crear un nuevo empleado 
  const handleCreate = (e) => {

    // Prevenir que el navegador se actualice
    e.preventDefault();

    setPersons([...persons, { id: persons.length + 1, ...editedPerson }]);

    // Resetear la variable de estado de editedPerson
    setEditedPerson({ name: '', role: '', img: '' });

  }

  //Metodo para eliminar una persona 
  const handleDelete = (id) => { 
    setPersonToDelete(id);
  }

  const confirmDelete = () => {
    setPersons(persons.filter(person => person.id !== personToDelete));
    setPersonToDelete(null);
  }

  const cancelDelete = () => {
    setPersonToDelete(null);
  }

  return (
    <div>
      <h2>IT Team</h2>
      <div className='container'>
        <div className='row d-flex flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3'>
          {persons.map((person) => {
            return (
              <Person key={person.id}
                id={person.id}
                name={person.name}
                img={person.img}
                role={person.role}
                handleEdit={() => handleEdit(person.id)}
                handleDelete={handleDelete}
              />
            )
          })}
        </div>
      </div>
      {/** Renderizar el formulario para crear o editar los datos de una persona */}
      <div className='container mt-4 row p-2 pb-5'>
          <h2>{isEditing ? 'Actualizar empleado' : 'Crear nuevo empleado'}</h2>
          <form action="" className='border border-dark rounded p-4'>
            <div className='mb-3'>
              <label htmlFor="" className='form-label'>Nombres</label>
              <input type="text" name="name" value={editedPerson.name} className='form-control' aria-describedby='nombre' onChange={handleChange}/>
            </div>
            <div className='mb-3'>
              <label htmlFor="" className='form-label'>Cargo</label>
              <input type="text" name="role" id="" value={editedPerson.role} className='form-control' aria-describedby='cargo' onChange={handleChange}/>
            </div>
            <div className='mb-3'>
              <label htmlFor="" className='form-label'>Avatar</label>
              <input type="text" name="img" value={editedPerson.img} id="" className='form-control' aria-describedby='cargo' onChange={handleChange}/>
            </div>
            <button type='submit' className='btn btn-primary' onClick={isEditing ? handleSave : handleCreate}>{isEditing ? 'Editar' : 'Crear'}</button>
          </form>
      </div>
      {/* Modal de confirmación de eliminación */}
      <div id="deleteModal" className='modal fade' tabIndex="-1">
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Confirmar Eliminación</h4>
              <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label="Close" onClick={cancelDelete}></button>
            </div>
            <div className='modal-body'>
              <p>¿Estás seguro de eliminar a {persons.find(person => person.id === personToDelete)?.name}?</p>
            </div>
            <div className='modal-footer'>
              <button type="button" className='btn btn-secondary' data-bs-dismiss="modal" onClick={cancelDelete}>Cancelar</button>
              <button type="button" className='btn btn-danger' data-bs-dismiss="modal" onClick={confirmDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

People.propTypes = {
  persons: PropTypes.array.isRequired,
  setPersons: PropTypes.func.isRequired
}
