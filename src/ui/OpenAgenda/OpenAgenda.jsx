import React, {useEffect, useState} from 'react';
import {URL} from '../../service';

function OpenAgenda(props) {
  const [agenda, setAgenda] = useState({date: new Date().toISOString().substring(0, 10), speakers: []});

  useEffect(() => {
    // for api
    fetch(`${URL}api/agendas/${props.match.params.id}`)
    .then (res => res.json())
    .then (res => {
      console.log(res);
      setAgenda(res)});

  }, []);
  return (
    <main className="open-agenda">
      <section className="open-agenda__container">
        <h1>Sacrament Meeting</h1>
        <span>{new Date(agenda.date).toISOString().substring(0, 10)}</span>
          <p><strong>Presiding:</strong> {agenda.presiding_authority}</p>
          <p><strong>Conducting:</strong> {agenda.conducting}</p>
          <br/>
          <p><strong>Opening Hymn:</strong> {agenda.opening_hymn}</p>
          <p><strong>Opening Prayer:</strong> {agenda.opening_prayer}</p>
          {agenda.intermediate_hymn ? <p><strong>Intermediate Hymn:</strong> {agenda.intermediate_hymn}</p> : ''}
          <br/>
          {agenda.speakers.map((speaker, index) => {
            return (
              <p key={index}><strong>Speaker:</strong> {speaker}</p>
              );
            })}
            <br />
            <p><strong>Closing Hymn:</strong> {agenda.closing_hymn}</p>
            <p><strong>Closing Prayer:</strong> {agenda.closing_prayer}</p>
      </section>
    </main>
  );
}

export default OpenAgenda;