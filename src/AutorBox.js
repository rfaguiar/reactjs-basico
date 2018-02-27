import React, { Component } from 'react';
import $ from 'jquery';
import FormularioAutor from './FormularioAutor';
import TabelaAutor from './TabelaAutor';
import PubSub from 'pubsub-js';

export default class AutorBox extends Component {

    constructor () {
  
        super();
        this.state = {lista: []};
    }

    componentDidMount() {

        $.ajax({
            url: 'http://localhost:8080/api/autores',
            dataType: 'json',
            success: function (result) {
                this.setState({lista:result});
            }.bind(this),
            error: (erro) => console.log(erro)      
        });

        PubSub.subscribe('atualiza-lista-autores', function (topico, novaLista) {
            this.setState({lista: novaLista});
        }.bind(this));
    }

    render() {
        
      return (
        <div id="main">
        <div className="header">
          <h1>Cadastro de Autores</h1>
        </div>
        <div className="content" id="content">
            <FormularioAutor />  
            <TabelaAutor lista={this.state.lista}/>             
        </div>
      </div>
      );
    }
  }