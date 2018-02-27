import React, { Component } from 'react';

export default class TabelaLivro extends Component {

    render() {
        
        return (
            <div>            
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Titulo</th>
                    <th>Preco</th>
                    <th>Autor</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.lista.map( livro => {
                      return (
                        <tr key={livro.id}>
                          <td>{livro.titulo}</td>
                          <td>{livro.preco}</td>
                          <td>{livro.autor.nome}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table> 
            </div>
        );
    }
}