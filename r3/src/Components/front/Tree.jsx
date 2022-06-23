import { useState } from "react";
import { useContext } from "react";
import FrontContext from "./FrontContext";

function Tree({ tree }) {


    const {setCreateComment} = useContext(FrontContext)     // pakeista

    const [com, setCom] = useState('')

    const handleComment = () => {
        setCreateComment({com, treeId: tree.id});
        setCom('')
    }

    return (
        <li className="list-group-item">
            <div className="item-front">
                <div className="content">
                    <b>{tree.title}</b>
                    <span>{['Spike', 'Leaf', 'Palm'][tree.type - 1]}</span>
                    <i>{tree.height}</i>
                    <u>{tree.good}</u>
                </div>
                <div className="form-group">
                    <label>Your comment here</label>
                    <textarea className="form-control" rows="3" value={com} onChange={e => setCom(e.target.value)}></textarea>
                    </div>
                <div className="buttons">
                    <button type="button" className="btn btn-outline-danger ml-2" onClick={handleComment}>Add Comment</button>
                </div>
                <ul>
                    {
                       tree.coms ? tree.coms.slice(0, -5).split('-^o^-,').map((c, i) => <li key={i}>{c}</li>) : null
                    }
                </ul>
            </div>
        </li>
    );
}

export default Tree;