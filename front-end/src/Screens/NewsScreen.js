import React from 'react'
import NewsComponent from '../Components/NewsComponent'

export default function NewsScreen() {

    const news = [
        { _id : 1 , name : 'Vagas setor de comunicação' , describe: 'Empresa abre novas vagas para o setor de comunicações' , image : '/images/577003.jpg'},
        {_id  : 2, name : 'Estágios em Ti' , describe : 'Aberta as inscrições para estágios em Ti' ,  image : '/images/577003.jpg'},
        {_id  : 3, name : 'Evento  tecnologia e sociedade', describe: 'Abertura do evento de tecnologia e sociedade' , image: '/images/577003.jpg'},
        {_id  : 4, name: 'Lista de novos contratados' , describe: 'Lista de novos contratados já disponível', image: '/images/577003.jpg'},
        {_id: 5, name: 'Inicio de um ciclo' , describe: 'Começa hoje o grande evento da N.A.R.K', image: '/images/577003.jpg'}
    ]

    return(
       <div>
            <div className="card-news">
                {
                    news.map((item)=>(
                        <NewsComponent key={item._id} item={item} />
                    ))
                }
            </div>
       </div>
    )
}