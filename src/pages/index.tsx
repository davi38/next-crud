import Layout from "./components/Layout";
import Cliente from "../core/Cliente";
import Tabela from "./components/Tabela";
import Botao from "./components/Botao";
import Formulario from "./components/Formulario";
import { useEffect, useState } from "react";
import ClienteRepositorio from "../core/ClienteRepositorio";
import ColecaoCliente from "../backend/db/ColecaoCliente";

export default function Home() {

  const repo: ClienteRepositorio = new ColecaoCliente()

  const[cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const[clientes, setClientes] = useState<Cliente[]>([])
  const [visivel, setVisivel] = useState< 'tabela' | 'form' >('tabela')

  useEffect(obterTodos, []);

function obterTodos()
  repo.obterTodos().then(clientes => {
  setClientes(clientes)
  setVisivel('tabela')
})

  /* const clientes = [
    new Cliente('Ana', 34, '1'),
    new Cliente('Bia', 45, '2'),
    new Cliente('Pedro', 23, '3'),
    new Cliente('Carlos', 54, '4')
  ] */

function clienteSelecionado(cliente: Cliente){
  console.log(cliente.nome)
  setCliente(cliente)
  setVisivel('form')
}
function clienteExcluido(cliente: Cliente){
  console.log(`excluir.... ${cliente.nome}`)
}

async function salvarCliente(cliente:Cliente){
  await repo.salvar(cliente)
  obterTodos()
}
function novoCliente(){
  setCliente(Cliente.vazio())
  setVisivel('form')
}



  return (
    <div className={`
        flex
        justify-center
        items-center
        h-screen
        bg-gradient-to-r from-blue-500 to-purple-500
        text-white
    ` }>
      <Layout titulo="Cadastro Simples">
          {visivel === 'tabela' ? (
            <>
            <div className="flex justify-end">
            <Botao cor='green' className="mb-4"
            onClick={novoCliente}>Novo Cliente</Botao>
            </div>
            <Tabela
            clientes={clientes}
            clienteSelecionado={clienteSelecionado}
            clienteExcluido={clienteExcluido}
         />
         </>
          ) : (
            <Formulario
            cliente={cliente}
            clienteMudou={salvarCliente}
            cancelado={() => setVisivel('tabela')}
            />
          )}
      </Layout>

    </div>

  )
}
