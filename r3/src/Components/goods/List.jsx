import { useContext } from "react";
import Good from "./Good";
import GoodContext from "./GoodContext";


function GoodList() {
    
    const {goods} = useContext(GoodContext)

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>List of Goods</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    goods ? goods.map(good => <Good key={good.id} good={good}></Good>) : null
                    }
                </ul>
            </div>
        </div>
    );
}

export default GoodList;