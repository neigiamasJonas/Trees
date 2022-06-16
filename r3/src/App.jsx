import { useEffect, useState } from 'react';
import './bootstrap.css';
import './crud.scss';
import Create from './Components/Create';
import List from './Components/List';

import Edit from './Components/Edit';
import TreeContext from './Components/TreeContext';
import axios from 'axios';
// import './App.scss';



function App() {

    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const [trees, setTrees] = useState(null);
    const [modalData, setModalData] = useState(null);

    const [createData, setCreateData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const [editData, setEditData] = useState(null);

    //Read
    useEffect(() => {
                                                                    // PAKEITIMAS
        axios.get('http://localhost:3003/medukai')
        .then(res => {
            setTrees(res.data)
        })

        
    }, [lastUpdate]);

    // Create
    useEffect(() => {
        if (null === createData) {
            return;
        }
                                                                    // PAKEITIMAS
        axios.post('http://localhost:3003/medukai', createData)
        .then(res => {
            console.log(res.data);

            setLastUpdate(Date.now());
        })
        
        
    }, [createData]);

    // Delete  
    useEffect(() => {
        if (null === deleteData) {
            return;
        }

        axios.delete('http://localhost:3003/medukai/' + deleteData.id) /// PAKEITIMAS medukai/', + deleteData.id)  BUTINAI SLASH PRIESH MEDUKUS
        .then(res => {
            console.log(res.data);

            setLastUpdate(Date.now());
        })

    }, [deleteData]);

    // Edit         !!! app.js dar nepadaryta
    useEffect(() => {
        if (null === editData) return;
        axios.put('http://localhost:3003/medukai/' + editData.id, editData)
        .then(_ => {
          setLastUpdate(Date.now());
        });
      }, [editData]);

    
    return (
        <TreeContext.Provider value={
            {
            trees,
            setCreateData,
            setDeleteData,
            setEditData,
            modalData,
            setModalData
            }
        }>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <Create></Create>
                    </div>
                    <div className="col-8">
                        <List></List>
                    </div>
                </div>
            </div>
          {modalData && <Edit ></Edit>}  
        </TreeContext.Provider>
    );


}
export default App;