import React, { Component } from 'react';
import $ from 'jquery';
import FormularioLivro from './FormularioLivro';
import TabelaLivro from './TabelaLivro';
import PubSub from 'pubsub-js';

export default class LivroBox extends Component {

    constructor () {
  
        super();
        this.state = {lista: [], autores: []};
    }

    componentDidMount() {

        $.ajax({
            url: 'http://localhost:8080/api/livros',
            dataType: 'json',
            success: function (result) {
                this.setState({lista:result});
            }.bind(this),
            error: (erro) => console.log(erro)      
        });

        $.ajax({
            url: 'http://localhost:8080/api/autores',
            dataType: 'json',
            success: function (result) {
                this.setState({autores:result});
            }.bind(this),
            error: (erro) => console.log(erro)      
        });

        PubSub.subscribe('atualiza-lista-livros', function (topico, novaLista) {
            this.setState({lista: novaLista});
        }.bind(this));
    }

    render() {
        
      return (
        <div id="main">
        <div className="header">
          <h1>Cadastro de Livros</h1>
        </div>
        <div className="content" id="content">
            <FormularioLivro autores={this.state.autores}/>  
            <TabelaLivro lista={this.state.lista}/>             
        </div>
      </div>
      );
    }
  }