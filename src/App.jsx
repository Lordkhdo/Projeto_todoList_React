import { useState } from "react";

import { AiOutlineArrowUp, AiFillDelete } from "react-icons/ai";
import { BsChatSquare } from "react-icons/bs";

import Modal from "react-modal";

import "./App.css";


Modal.setAppElement("#root");

function App() {
  const [lista, setLista] = useState(['lista 1', 'lista 2', 'lista 3']);
  const [input, setInput] = useState("");

  // ==================  itens do modal   ===========================================
  const [test, setTest] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputModal, setInputModal] = useState("");
  const [nomeSelecionado, setNomeSelecionado] = useState("");

  // ==================  itens do modal ---  ===========================================

  const AdicionarNovoItem = () => {
    if (input.length == 0) {
      alert("nao há informaçoes no 'adicionar tarefa'");
      return;
    }
    let IntemIndex = lista.indexOf(input);

    if (IntemIndex >= 0) {
      alert("você nao pode repetir o mesmo item da lista");
      setInput("");
      return;
    }

    setLista([...lista, input]);

    setInput("");
    
    console.log(lista);
  };

  const DeletarFuncao = (index) => {
    let tmpArray = [...lista];
    tmpArray.splice(index, 1);
    setLista(tmpArray);
  };

  const SubirElemento = (index) => {
    if (index == 0) {
      return;
    }

    let SegondTmpArray = [...lista];
    SegondTmpArray.splice(index--, 0, SegondTmpArray.splice(index--, 1)[0]);
    setLista(SegondTmpArray);
    console.log(SegondTmpArray);
  };

  let tmpModalAr;
  const MudarElemento = (index) => {
    setModalIsOpen(true);
    setTest(index);
    let tmpArray = [...lista];
    setNomeSelecionado(tmpArray[index]);
  };

  const FecharModal = () => {
    if (inputModal <= 0) {
      alert("Modifique ou coloque o valor Anterior");
      return;
    }

    setModalIsOpen(false);
    tmpModalAr = [...lista];

    let verd = tmpModalAr.indexOf(tmpModalAr[test]);
    if (verd !== -1) {
      tmpModalAr[test] = inputModal;
      setLista(tmpModalAr);
      setNomeSelecionado("");
      setInputModal("");
    }
  };
  return (
    <div className="container">
      <h1>To do simples</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Adicionar Tarefa"
      />
      <button onClick={AdicionarNovoItem} className="botao-submit">
        submit
      </button>
      <ul>
        {lista.map((item, index) => (
          <li key={index}>
            <div className="item">{item}</div>

            <div>
              <button onClick={() => DeletarFuncao(index)}>
                <AiFillDelete />
              </button>
              <button onClick={() => SubirElemento(index)}>
                <AiOutlineArrowUp />
              </button>
              <button onClick={() => MudarElemento(index)}>
                <BsChatSquare />
              </button>

              <Modal
                className="modal"
                isOpen={modalIsOpen}
                onRequestClose={() => FecharModal()}
              >
                <div className="filho-modal">
                  <div className="filho-do-filho">
                    <h2>Editar : {nomeSelecionado}</h2>
                    <input
                      type="text"
                      onChange={(e) => {
                        setInputModal(e.target.value);
                      }}
                    />
                    <button onClick={() => FecharModal(index)}>pronto</button>
                  </div>
                </div>
              </Modal>
            </div>
          </li>
        ))}
      </ul>

      <br />
    </div>
  );
}

export default App;
