import React, {useState, useEffect} from 'react';

function Speaker({editSpeaker, speakerNumber, index, speaker, removeSpeaker}) {
  const [speakerName, setSpeakerName] = useState('');
  let newIndex = index;
  newIndex = --newIndex;
  useEffect(() => {
    setSpeakerName(speaker);
  });
  function updateSpeaker(e) {
    editSpeaker(e);
    setSpeakerName(e.target.value);
  }
  return (
    <fieldset key={index} className="field">
      <label htmlFor="" className="label">Speaker {speakerNumber} 
        <button type="button" onClick={removeSpeaker} value={newIndex} className="btn bt--red txt--tiny">Delete</button>
      </label>
      <input type="text" onChange={updateSpeaker} data-index={newIndex} defaultValue={speakerName} className="input"/>
    </fieldset>
  );
}

export default Speaker;