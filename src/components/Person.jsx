import PropTypes from 'prop-types'

export const Person = ({ id, name, img, role, handleEdit, handleDelete}) => {
    return (
        <div className='col'>
            <div className='card' style={{ width: "18rem" }}>
                <img src={img} alt={name} className='card-img-top' />
                <div className='card-body'>
                    <h4 className='card-title'>{name}</h4>
                    <p className='card-text'>{role}</p>
                </div>
                <div className='container mb-4 text-center'>
                    <button className='btn btn-success me-2' onClick={handleEdit}>Editar</button>
                    <button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => handleDelete(id)}>Eliminar</button>
                </div>
            </div>
        </div>
    )
}

Person.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}