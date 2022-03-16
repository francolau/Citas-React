import React, {Fragment, useState} from 'react'
import shortid from 'shortid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    // Crear State de citas

    const [cita, actualizarCita] = useState({
        mascota : '',
        propietario : '',
        fecha : '',
        hora : '',
        sintomas :''
    });

    // agregar segundo state para un error

    const [error, actualizarError] = useState(false)


    // funcion q se ejecuta cada que el usuario escribe en un input

    const actualizarState = event => {
        actualizarCita({
            ...cita,
            [event.target.name]: event.target.value 
        })
    }


    // extraer los valores

    const { mascota, propietario, fecha,hora, sintomas} = cita; // sirve para no usar cita.mascota etc..

    // cuando el usuario envia el formulario con el boton

    const submitCita = event =>{
        event.preventDefault();

        //console.log(mascota); // en este caso tendria que usar el cita.mascota..
        // Validar, el trim() elimina los espacios en blanco

        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' ||
        sintomas.trim() === ''){
            actualizarError(true);
            return; // siempre que haya un error agregar return para que no siga el codigo
        
        }

        // Eliminar el mensaje de error

        actualizarError(false);

        // Asignar un ID
        cita.id=shortid();
    
        // Crear la cita

        crearCita(cita);

        // Reiniciar el form

        actualizarCita({
            mascota : '',
            propietario : '',
            fecha : '',
            hora : '',
            sintomas :''
        })
        
    }
    return (  
        <Fragment> 
            <h2>Crear citas</h2>

            { error ?   <p className="alerta-error"> Todos los campos son obligatorios</p>   
            : null }

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                type="text"
                name="mascota"
                className="u-full-width"
                placeholder="Nombre Mascota"
                onChange={actualizarState}
                value = {mascota}
                />

                <label>Nombre dueño</label>
                <input
                type="text"
                name="propietario"
                className="u-full-width"
                placeholder="Nombre dueño de la mascota"
                onChange={actualizarState}
                value = {propietario}
                />

                <label>Fecha</label>
                <input
                type="date"
                name="fecha"
                className="u-full-width"
                onChange={actualizarState}
                value = {fecha}
                />

                <label>Hora</label>
                <input
                type="time"
                name="hora"
                className="u-full-width"
                onChange={actualizarState}
                value = {hora}
                />
                
                <label>Síntomas</label>
                <textarea 
                className="u-full-width"
                name="sintomas"
                onChange={actualizarState}
                value = {sintomas}
                >
                </textarea>

                <button 
                type="submit"
                className="u-full-width button-primary"
                > Agregar Cita </button>
            </form>


        </Fragment>

       
    );
}
 
Formulario.propTypes = { // Proptypes es una forma de documentar los componentes
    crearCita: PropTypes.func.isRequired
}

export default Formulario;