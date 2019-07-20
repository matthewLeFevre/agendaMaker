import React from 'react';
import AgendaForm from '../Shared/AgendaForm';

function CreateAgenda(props) {
  return (
    <main className="create-agenda">
      <AgendaForm status="Create" match={props.match}/>
    </main>
  ); 
}

export default CreateAgenda;