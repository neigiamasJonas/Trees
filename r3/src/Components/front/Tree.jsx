import { useState } from "react";
import { useContext } from "react";
import FrontContext from "./FrontContext";
// import TreeList from "./TreeList";

function Tree({ tree }) {


    const {setCreateComment, setRateNow} = useContext(FrontContext)     // pakeista

    const [com, setCom] = useState('')

    //// rate
    const [rate, setRate] = useState('5')
    const rateIt = e => {
        setRate(e.target.value)
        setRateNow({
            rate: parseInt(e.target.value),
            id: tree.id
        });
    }

    const handleComment = () => {
        setCreateComment({com, treeId: tree.id});
        setCom('')
    }



    return (
        <li className="list-group-item">
            <div className="item-front">
                <div className="content" style={{display: 'flex', justifyContent: "space-between"}}>
                    <b>{tree.title}</b>
                    <span>{['Spike', 'Leaf', 'Palm'][tree.type - 1]}</span>
                    <i>{tree.height}</i>
                    <u>{tree.good}</u>
                    <b style={{marginLeft: '20px', marginRight: '20px'}}>
                        {
                            tree.rate_sum ? 'Rate: ' + (tree.rate_sum / tree.rates).toFixed(2) : 'Not rated yet'
                        }
                    </b>
                </div>
                <div className="form-group">
                    <label style={{marginRight: '7px'}} className='mr-2'>Select rating here</label>
                    <select value={rate} onChange={rateIt}>
                        {
                            [...Array(10)].map((_, i) => <option key={i} value={10 - i}>{10 - i}</option>)
                        }
                    </select>
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
                       tree.coms ? tree.coms.slice(0, -5).split('-^o^-,').map((c, i) => (
                       
                       <li key={i}>{c}</li>
                       
                       )) : null
                    }
                </ul>
            </div>
        </li>
    );
}

export default Tree;