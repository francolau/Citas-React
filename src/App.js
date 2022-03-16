import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
function App() {


  // citas en local storage

  let citasIniciales = JSON.parse(localStorage.getItem('citas')); // lee  si hay citas en el local storage
  if(!citasIniciales){ // json.parse convierte ese arreglo en string
    citasIniciales = [];
  }


  // Arreglo de citas

  const [citas, guardarCitas] = useState (citasIniciales);

  // useEffect para realizar operaciones cuando el state cambia

  useEffect( () => {

    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas)) // convierte arreglo en string
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas] ); // para que se ejecute una sola vez, pasarle un arreglo vacio
                // ese arreglo es una dependencia, ejecuta el codigo cada vez que se modifica la dependencia

  // Funcion que tome las citas actuales y agrege la nueva

  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  // Funcion que elimina citas por ID

  const eliminarCita = id => {
      const nuevasCitas = citas.filter(cita => cita.id !== id);
      guardarCitas(nuevasCitas); // crea un nuevo arreglo, con la cita eliminada
  }

  // Mensaje condicional

  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>

    <div className="container">
      <div className= "row">
        <div className="one-half column">
          <Formulario 
          crearCita= {crearCita}
          />
        </div>
        <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map(cita => (
            <Cita 
            key={cita.id}
            cita ={cita}
            eliminarCita={eliminarCita}
            />
          ))}
        </div>
      </div>

    </div>
    
    </Fragment>
    
  );
}

export default App;
