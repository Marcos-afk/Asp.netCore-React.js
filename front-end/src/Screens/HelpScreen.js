import React, { useState } from 'react'

export default function HelpScreen(){

    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const [describe, setDescribe] = useState('')
    
    function submitHandler(e){
          e.preventDefault()
          if( name.length > 0 && subject.length > 0 && describe.length > 0){
              var link = "mailto:andremarcos967@gmail.com"
              + "?cc=andremarcos967@gmail.com"
              + "&subject=" + escape(subject)
              + "&body=" + escape(describe)
              window.location.href = link
 
            setName('')
            setSubject('')
            setDescribe('')  
          }else{
            alert('Preencha os campos obrigatórios!')
          }
            
    }
    return(
        <div>
            <form className="form" method="POST" onSubmit={submitHandler}>
            <h2>Contato ao suporte</h2>
                <div>
                    <label htmlFor="name"> Nome </label>
                    <input type="text" id="name" name="name" required placeholder="Digite seu nome aqui"
                    value={name} onChange={ e => {setName(e.target.value)}}/>
                </div>

                <div>
                    <label htmlFor="subject">Assunto</label>
                    <input type="text" id="subject" name="subject" required placeholder="Digite o assunto aqui"
                     value={subject} onChange={ e => {setSubject(e.target.value)}}/>
                </div>

                <div>
                    <label htmlFor="describe">Descrição do problema</label>
                    <textarea id="describe" name="describe" cols="45" rows="5" required placeholder="Descrição do problema"
                    value={describe} onChange={ e => setDescribe(e.target.value)}></textarea>
                </div>

                <div>
                    <label/>
                    <button type="submit">Enviar email</button>
                </div>
            

            
            </form>
        </div>
    )
}