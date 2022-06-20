import { useEffect, useState } from 'react';
import './bootstrap.css';
import './crud.scss';
import Create from './Components/Create';
import List from './Components/List';

import Edit from './Components/Edit';
import TreeContext from './Components/TreeContext';
import axios from 'axios';
import Message from './Components/Message';
// import './App.scss';



function App() {

    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const [trees, setTrees] = useState(null);
    const [modalData, setModalData] = useState(null);

    const [createData, setCreateData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const [editData, setEditData] = useState(null);


    const [message, setMessage] = useState(null)

    const [disableCreate, setDisableCreate] = useState(false);


  //Read
  useEffect(() => {
    axios.get('http://localhost:3003/medukai')
      .then(res => setTrees(res.data));
  }, [lastUpdate]);

  // Create
  useEffect(() => {
    if (null === createData) return;
    axios.post('http://localhost:3003/medukai', createData)
      .then(res => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch(error => {
        showMessage({ text: error.message, type: 'danger' });
      })
      .then(() => {
        setDisableCreate(false);
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


    // Message funkcija

      const showMessage = msg => {
        setMessage(msg);
        setTimeout(() => setMessage(null), 5000);
      }


    return (
        <TreeContext.Provider value={
            {
            trees,
            setCreateData,
            setDeleteData,
            setEditData,
            modalData,
            setModalData,
            message,
            disableCreate,
            setDisableCreate
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
          <Message></Message>
        </TreeContext.Provider>
    );


}
export default App;