import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import FrontContext from "./Components/front/FrontContext";
import FrontList from "./Components/front/FrontList";
import TreeList from "./Components/front/TreeList";

function Front() {

    const [goods, setGoods] = useState(null)
    const [trees, setTrees] = useState(null)
    const [createComment, setCreateComment] = useState(null)

    const [lastUpdate, setLastUpdate] = useState(Date.now());

    useEffect(() => {
        axios.get('http://localhost:3003/front')
        .then(res => {
            setGoods(res.data)
            console.log(res.data);
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3003/front/trees')
        .then(res => {
            setTrees(res.data)
            console.log(res.data);
        })
    }, [lastUpdate])


    // Create COMMENT

     useEffect(() => {
        if (null === createComment) return;
        axios.post('http://localhost:3003/front/comments', createComment)
        .then(_ => {
            setLastUpdate(Date.now())
        // setLastUpdate(Date.now());
      })

  }, [createComment]);


    return (
        <FrontContext.Provider value={
            {
                goods,
                trees,
                setCreateComment
            }
        }>
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <FrontList></FrontList>
                    </div>
                    <div className="col-7">
                        <TreeList></TreeList>
                    </div>
                </div>
            </div>
        </FrontContext.Provider>
    )
}

export default Front;