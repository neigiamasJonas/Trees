
import { useContext } from "react";
import Good from "./FrontGood";
import FrontContext from "./FrontContext";



function FrontList() {
    
    const {goods} = useContext(FrontContext)



    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>List of Trees</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    goods ? goods.map((good, index) => <Good key={index} good={good}><li></li></Good>) : null
                    }
                </ul>
                
            </div>
        </div>
    );
}

export default FrontList;