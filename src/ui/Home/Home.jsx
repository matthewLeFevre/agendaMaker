import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {URL} from '../../service';
import {Redirect} from 'react-router-dom';

function Home() {
  const [redirect, setRedirect] = useState(false);
  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    fetch(URL + 'api/agendas')
    .then(res =>  res.json())
    .then(res => {
      setAgendas(res);
    });
  }, []);

  // Delete Request
  function deleteAgenda(e) {
    const id = e.currentTarget.value;

    fetch(`${URL}api/agendas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(() => {
      fetch(URL + 'api/agendas')
      .then(res =>  res.json())
      .then(res => {
        setAgendas(res);
      });
    });
  }

  return (
    <main className="home">
      { redirect ? <Redirect to="/" /> : ''}
      <section className="agenda-list">
        <h1 className="agenda-list__title">Agenda List</h1>
        {agendas.map((agenda,index) => {
          // console.log(agenda);
          return (
          <div key={index} className="agenda">
            <p className="agenda__date"> Agenda {new Date(agenda.date).toISOString().substring(0, 10)}</p>
            <div className="agenda-options">
              <Link className="agenda-options__link bt--blue" to={`/OpenAgenda/${agenda.agenda_id}`} title="Open Agenda">
                <i className="far fa-book-open"></i>
              </Link>
              <Link className="agenda-options__link bt--green" to={`/EditAgenda/${agenda.agenda_id}`} title="Edit Agenda">
                <i className="fas fa-edit"></i>
              </Link>
              <button className="agenda-options__link bt--red" type="button" value={agenda.agenda_id} onClick={deleteAgenda} title="Delete Agenda">
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>);
        })}
        <Link to="/CreateAgenda" className="btn--fluid bt--primary txt--med">Create Agenda</Link>
      </section>
    </main>
  );
}

export default Home;