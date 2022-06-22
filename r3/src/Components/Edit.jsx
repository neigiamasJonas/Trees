import { useContext } from "react";
import { useEffect, useState } from "react";
import TreeContext from "./TreeContext";

function Edit() {

    const {setEditData, modalData, setModalData, goods} = useContext(TreeContext)
    

    const [title, setTitle] = useState('');
    const [type, setType] = useState('1');
    const [height, setHeight] = useState('');
    const [good, setGood] = useState('0');

    useEffect(() => {
        if (null === modalData) {
            return;
        }
        console.log(modalData);
        setTitle(modalData.title);
        setType(modalData.type);
        setHeight(modalData.height);
        setGood(goods.filter(g => modalData.good === g.title)[0]?.id ?? 0);

    }, [modalData]);

    const handleEdit = () => {
        const data = {title, type, height, good, id: modalData.id};
        
        setEditData(data);
        setModalData(null);
    }

    if (null === setModalData) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Trees Changer</h5>
                        <button type="button" className="close" onClick={() => setModalData(null)}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
                            <small className="form-text text-muted">Enter Ex name here.</small>
                        </div>
                        <div className="form-group">
                            <label>Type</label>
                            <select className="form-control" onChange={e => setType(e.target.value)} value={type}>
                                <option value="1">Spike</option>
                                <option value="2">Leaf</option>
                                <option value="3">Palm</option>
                            </select>
                            <small className="form-text text-muted">Select Ex type here.</small>
                        </div>
                        <div className="form-group">
                            <label>Goods</label>
                            <select className="form-control" onChange={e => setGood(e.target.value)} value={good}>
                                <option value="0" disabled>SelectGoods</option>
                                {
                                goods === null ? null : goods.map(g => <option key={g.id} value={g.id}>{g.title}</option>)
                                }
                            </select>
                            <small className="form-text text-muted">Select good.</small>
                        </div>
                        <div className="form-group">
                            <label>Height</label>
                            <input type="text" className="form-control" onChange={e => setHeight(e.target.value)} value={height} />
                            <small className="form-text text-muted">Enter Ex place here.</small>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setModalData(null)}>Close</button>
                        <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;