
function FrontGood({ good }) {


    return (
        <li className="list-group-item">
            <div className="item">
                <div className="nest-content">
                    <b>{good.title}</b>
                    <ul className="list-group">
                        {
                            good.tree_titles ? good.tree_titles.split(',').map((t, i) => <li key={i} style={{color: "black"}}>{t}</li>) : null
                        }
                    </ul>
                </div>
            </div>
        </li>
    );
}

export default FrontGood;