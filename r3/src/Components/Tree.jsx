import { useContext } from "react";
import TreeContext from "./TreeContext";

function Tree({ tree }) {


    const {setDeleteData, setModalData, handleDeleteComment} = useContext(TreeContext)     // pakeista

    const handleDelete = () => {                        // pakeista
        setDeleteData(tree);
    }

    const handleEdit = () => {
        setModalData(tree);
    }

    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content">
                    <b>{tree.title}</b>
                    <span>{['Spike', 'Leaf', 'Palm'][tree.type - 1]}</span>
                    <i>{tree.height}</i>
                    <u>{tree.good}</u>
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-outline-success ml-2" onClick={handleEdit}>Edit</button>
                    <button type="button" className="btn btn-outline-danger ml-2" onClick={handleDelete}>Delete</button>
                </div>
            </div>
            <div>
            <ul className="list-group">
                {
                    tree.coms ? tree.coms.slice(0, -5).split('-^o^-,').map((c, i) => (

                    <li  className="list-group-item" key={i}>
                        <div>{c}</div>
                        <button type="button" className="btn btn-outline-danger mt-3" onClick={() => handleDeleteComment(tree.coms_id.split(',')[i])}>Delete</button>
                    </li>

                    )) : null
                }
            </ul>
            </div>
        </li>
    );
}

export default Tree;