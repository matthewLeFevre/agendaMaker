import React from 'react';
import AgendaForm from '../Shared/AgendaForm';

function EditAgenda(props) {
  return (
    <main className="edit-agenda">
      <AgendaForm status="Edit" match={props.match} />
    </main>
  ); 
}

export default EditAgenda;