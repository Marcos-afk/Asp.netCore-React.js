import React from "react"

export default function NewsComponent({item}){
    return(
        <div key={item._id} className="card">
                <img  src={item.image} alt={item.name} className="image"/>
            <div className="card-body">
                <h1>{item.name}</h1>
                    <p>{item.describe}</p>
                <div className="button-container">
                    <button>Leia Mais</button>
                </div>
            </div>

        </div>
    )
    
}