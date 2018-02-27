import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import InputCustomizado from './componentes/InputCustomizado';
import BotaoSubmitCustomizado from './componentes/BotaoSubmitCustomizado';
import TratadorErros from  './TratadorErros';

export default class FormularioLivro extends Component {

    constructor () {
  
      super();
      this.state = {nome: '', email: '', senha: ''};
      this.enviaForm = this.enviaForm.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        $.ajax({
            url: 'http://localhost:8080/api/livros',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId}),
            success: function (novaLista) {
                PubSub.publish('atualiza-lista-livros', novaLista);
            },
            error: function (resposta) {
                if(resposta.status === 400) {
                    new TratadorErros().publicaErros(resposta.responseJSON);
                }
            },
            beforeSend: function(){
              PubSub.publish("limpa-erros",{});
            }
        });
    }

    salvaAlteracao (nomeInput, evento) {
        var campo = {};
        campo[nomeInput] = evento.target.value;
        this.setState(campo);
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.salvaAlteracao.bind(this, 'titulo')} label="Titulo"/>
                <InputCustomizado id="preco" type="text" name="preco" value={this.state.preco} onChange={this.salvaAlteracao.bind(this, 'preco')} label="Preço"/>
                <div className="pure-control-group">
                    <label htmlFor="autorId">Autor</label> 
                    <select value={ this.state.autorId } name="autorId" onChange={ this.salvaAlteracao.bind(this, 'autorId') }>
                        <option value="">Selecione</option>
                        { 
                            this.props.autores.map(function(autor) {
                            return <option key={ autor.id } value={ autor.id }>
                                        { autor.nome }
                                    </option>;
                            })
                        }
                    </select>                
                </div>
                <BotaoSubmitCustomizado label="Gravar"/>
              </form>
            </div>
        );
    }
}