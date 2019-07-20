import React, {useEffect, useState} from 'react';
import Speaker from './components/Speaker';
import { URL } from '../../service';
import { Redirect } from 'react-router-dom';

function AgendaForm({status, match}) {
  const [openPrayer, setOpenPrayer] = useState('');
  const [closePrayer, setClosePrayer] = useState('');
  const [openHymn, setOpenHymn] = useState('');
  const [closeHymn, setCloseHymn] = useState('');
  const [sacramentHymn, setSacramentHymn] = useState('');
  const [intermediateHymn, setIntermediateHymn] = useState('');
  const [presiding, setPresiding] = useState('');
  const [conducting, setConducting] = useState('');
  const [speakers, setSpeakers] = useState([]);
  const [dateTime, setDateTime] = useState(new Date().toISOString().substring(0, 10));
  const [redirect, setRedirect] = useState(false);

  // Component Did Mount Get Request
  useEffect(() => {
    // requesting from api
    if(status === "Edit") {
      fetch(`${URL}api/agendas/${match.params.id}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setOpenPrayer(res.opening_prayer);
        setClosePrayer(res.closing_prayer);
        setOpenHymn(res.opening_hymn);
        setCloseHymn(res.closing_hymn);
        setSacramentHymn(res.sacrament_hymn);
        setIntermediateHymn(res.intermediate_hymn);
        setPresiding(res.presiding_authority);
        setConducting(res.conducting);
        setSpeakers(res.speakers);
        setDateTime(new Date(res.date).toISOString().substring(0, 10));
      });
    }

  }, []);

  // Post Request
  function createAgenda() {
    const payload = {
      opening_prayer: openPrayer,
      closing_prayer: closePrayer,
      opening_hymn: openHymn,
      closing_hymn: closeHymn,
      sacrament_hymn: sacramentHymn,
      intermediate_hymn: intermediateHymn,
      presiding_authority: presiding,
      date: new Date(dateTime),
      conducting: conducting,
      speakers: speakers
    }

    fetch(`${URL}api/agendas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload),
    })
    .then(res => res.json())
    .then(res => {
      window.alert("Agenda Created Successfully");
      setRedirect(!redirect);
    })
  }

  // PUT Request
  function saveAgenda() {
    const payload = {
      opening_Prayer: openPrayer,
      closing_Prayer: closePrayer,
      opening_Hymn: openHymn,
      closing_Hymn: closeHymn,
      sacrament_Hymn: sacramentHymn,
      intermediate_Hymn: intermediateHymn || '',
      presiding_Authority: presiding,
      conducting: conducting,
      speakers: speakers,
      date: new Date(dateTime),
      agenda_id: match.params.id
    };
    fetch(`${URL}api/agendas/${match.params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(() => {
      window.alert('Agenda Updated successfully');
      setRedirect(!redirect);
    })
  }

  // Delete Request
  function deleteAgenda(e) {
    const id = e.target.value;

    fetch(`${URL}api/agendas/${match.params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(res => res.json())
    .then(res => console.log(res));
  }

  function addSpeaker() {
    setSpeakers([...speakers, ''])
  }

  function editSpeaker(e) {
    const index = e.target.dataset.index;
    const value = e.target.value;
    let newSpeakers = speakers;
    newSpeakers[index] = value;
    setSpeakers(newSpeakers);
    console.log(speakers);
  }

  function removeSpeaker(e) {
    const index = e.target.value;
    let newSpeakers = speakers;
    console.log(speakers);
    console.log(newSpeakers);
    newSpeakers.splice(index, 1);
    console.log(newSpeakers);
    setSpeakers([...newSpeakers]);
  }



  return (
    <form className="agenda-form">
      {redirect ? <Redirect to={`/`}/> : ''}
      <h1>{status} Form</h1>
      <h2>Date</h2>
      <div className="field col--12">
        <label htmlFor="" className="label">Date</label>
        <input value={dateTime} type="date" onChange={(e) => setDateTime(e.target.value)} className="input"/>
        <span className="txt--red txt--tiny">* Required</span>
      </div>
      <h2>Prayers</h2>
      <section className="grid gutter">
        <div className="row">
          <div className="field col--12 col--sml--6">
            <label htmlFor="" className="label">Opening Prayer</label>
            <input type="text" 
              defaultValue={openPrayer} 
              onChange={(e) => setOpenPrayer(e.target.value)} 
              className="input"/>
          </div>
          <div className='field col--12 col--sml--6'>
            <label htmlFor="" className="label">Closing Prayer</label>
            <input type="text" 
              defaultValue={closePrayer}
              onChange={(e) => setClosePrayer(e.target.value)} 
              className="input"/>
          </div>
        </div>
      </section>
      <h2>Hymns</h2>
      <section className="grid gutter">
        <div className="row">
          <div className="field col--12 col--sml--6">
            <label htmlFor="" className="label">Opening Hymn</label>
            <input defaultValue={openHymn} onChange={(e) => setOpenHymn(e.target.value) } type="text" className="input"/>
          </div>
          <div className="field col--12 col--sml--6">
            <label htmlFor="" className="label">Sacrament Hymn</label>
            <input defaultValue={sacramentHymn} type="text" onChange={(e) => setSacramentHymn(e.target.value)} className="input"/>
          </div>
          <div className="field col--12 col--sml--6">
            <label htmlFor="" className="label">Intermediate Hymn</label>
            <input defaultValue={intermediateHymn} type="text" onChange={(e) => setIntermediateHymn(e.target.value)} className="input"/>
          </div>
          <div className="field col--12 col--sml--6">
            <label htmlFor="" className="label">Closing Hymn</label>
            <input defaultValue={closeHymn} type="text" onChange={(e) => setCloseHymn(e.target.value)} className="input"/>
          </div>
        </div>
      </section>
    
      <h2>Buisness</h2>
      <section className="grid gutter">
        <div className="row">
          <div className="field col--12 col--sml--6">
            <label htmlFor="" className="label">Presiding</label>
            <input defaultValue={presiding} type="text" onChange={(e) => setPresiding(e.target.value)} className="input"/>
          </div>
          <div className="field col--12 col--sml--6">
            <label htmlFor="" className="label">Conducting</label>
            <input defaultValue={conducting} type="text" onChange={(e) => setConducting(e.target.value)} className="input"/>
          </div>
        </div>
      </section>
      <h2>Speakers</h2>
      {speakers.map((speaker, index) => {
        const speakerNumber = ++index;
        return (
          <Speaker index={index} 
            key={index} 
            speakerNumber={speakerNumber} 
            speaker={speaker} 
            editSpeaker={editSpeaker} 
            removeSpeaker={removeSpeaker}/>
        );
      })}
      <fieldset className="field">
        <button type="button" onClick={addSpeaker} className="btn--fluid bt--primary txt--med">Add Speaker</button>
        {status === "Create" ? <button type="button" onClick={createAgenda} className="btn--fluid bt--green txt--med">Create Agenda</button> : ''}
        {status === "Edit" ? <button type="button" onClick={saveAgenda} className="btn--fluid bt--blue txt--med">Save Agenda</button> : ''}
        {/* {status === "Edit" ? <button type="button" onClick={deleteAgenda} className="btn--fluid bt--red txt--med">Delete Agenda</button> : ''} */}
      </fieldset>
    </form>
  );
}

export default AgendaForm;