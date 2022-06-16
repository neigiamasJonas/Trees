import { useState } from "react";

function Create({setCreateData}) {

    const [name, setName] = useState('');
    const [type, setType] = useState('1');
    const [place, setPlace] = useState('');

    const handleCreate = () => {
        const data = {name, type, place};
        setCreateData(data);
        setName('');
        setType('1');
        setPlace('');
    }

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>Create new Ex</h2>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" onChange={e => setName(e.target.value)} value={name} />
                    <small className="form-text text-muted">Enter Ex name here.</small>
                </div>
                <div className="form-group">
                    <label>Type</label>
                    <select className="form-control" onChange={e => setType(e.target.value)} value={type}>
                        <option value="1">Test</option>
                        <option value="2">Written</option>
                        <option value="3">Spoken</option>
                    </select>
                    <small className="form-text text-muted">Select Ex type here.</small>
                </div>
                <div className="form-group">
                    <label>Place</label>
                    <input type="text" className="form-control" onChange={e => setPlace(e.target.value)} value={place} />
                    <small className="form-text text-muted">Enter Ex place here.</small>
                </div>
                <button type="button" className="btn btn-outline-primary" onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
}

export default Create;