import { useEffect, useState } from 'react';
import './bootstrap.css';
import './crud.scss';
import Create from './Components/Create';
import List from './Components/List';

import Edit from './Components/Edit';
import TreeContext from './Components/TreeContext';
import axios from 'axios';
import Message from './Components/Message';
import GoodContext from './Components/goods/GoodContext';
// import './App.scss';

import CreateGoods from './Components/goods/Create'
import GoodList from './Components/goods/List';



function Back() {

    const [lastUpdate, setLastUpdate] = useState(Date.now());


    /// MEDZIAI
    const [trees, setTrees] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [createData, setCreateData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const [editData, setEditData] = useState(null);


    /// GOODS

    const [goods, setGoods] = useState(null);
    const [createDataGoods, setCreateDataGoods] = useState(null);
    const [deleteDataGoods, setDeleteDataGoods] = useState(null);





    /// SPINAS + msg
    const [message, setMessage] = useState(null)
    const [disableCreate, setDisableCreate] = useState(false);


    /////  Backas filtruoja ar fronte kas keiciasi kas 3 sekundes

    // useEffect(() => {
    //   setInterval(() => {
    //     setLastUpdate(Date.now())
    //   }, 3000);
    // }, [])

/////////////////////////// MEDZIAI ///////////////////////////
  //Read
  useEffect(() => {
    axios.get('http://localhost:3004/medukai')
      .then(res => setTrees(res.data));
  }, [lastUpdate]);

  // Create
  useEffect(() => {
    if (null === createData) return;
    axios.post('http://localhost:3004/medukai', createData)
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

        axios.delete('http://localhost:3004/medukai/' + deleteData.id) /// PAKEITIMAS medukai/', + deleteData.id)  BUTINAI SLASH PRIESH MEDUKUS
        .then(res => {
            console.log(res.data);

            setLastUpdate(Date.now());
        })

    }, [deleteData]);

    // Edit         !!! app.js dar nepadaryta
    useEffect(() => {
        if (null === editData) return;
        axios.put('http://localhost:3004/medukai/' + editData.id, editData)
        .then(_ => {
          setLastUpdate(Date.now());
        });
      }, [editData]);


    // Message funkcija

      const showMessage = msg => {
        setMessage(msg);
        setTimeout(() => setMessage(null), 5000);
      }

/////////////////////////// GOODS ///////////////////////////

  // Create
  useEffect(() => {
    if (null === createDataGoods) return;
    axios.post('http://localhost:3004/gerybes', createDataGoods)
      .then(_ => {
        
        setLastUpdate(Date.now());
      })

  }, [createDataGoods]);

    //Read
    useEffect(() => {
      axios.get('http://localhost:3004/gerybes')
        .then(res => {
          console.log(res.data);
          setGoods(res.data)});
    }, [lastUpdate]);


    // Delete  
    useEffect(() => {
      if (null === deleteDataGoods) {
          return;
      }

      axios.delete('http://localhost:3004/gerybes/' + deleteDataGoods.id) /// PAKEITIMAS medukai/', + deleteData.id)  BUTINAI SLASH PRIESH MEDUKUS
      .then(res => {
          console.log(res.data);

          setLastUpdate(Date.now());
      })

  }, [deleteDataGoods]);


      // DELETE COMMENT
      const handleDeleteComment = id => {
        axios.delete('http://localhost:3004/front/comments/' + id)
        .then(res => {
          showMessage(res.data.msg);
          setLastUpdate(Date.now());
        });
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
            setDisableCreate,
            goods,
            handleDeleteComment
            }
        }>
          <GoodContext.Provider value={{
            setCreateData: setCreateDataGoods,   // galima rasyt tiesiai setCreateDataGoods, bet taip paciai reik uzvadinti ir create'e
            goods,
            setDeleteData: setDeleteDataGoods
          }}>
              <div className="container">
                  <div className="row">
                      <div className="col-4">
                          <Create></Create>
                          <CreateGoods></CreateGoods>
                          <GoodList></GoodList>
                      </div>
                      <div className="col-8">
                          <List></List>
                      </div>
                  </div>
              </div>
            {modalData && <Edit ></Edit>}
            <Message></Message>
          </GoodContext.Provider>
        </TreeContext.Provider>
    );


}
export default Back;