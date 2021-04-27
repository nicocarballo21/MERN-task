import React, { Component } from "react"
import "./App.css"
import NavBar from "./components/NavBar"
const axios = require("axios").default
const swal = require("sweetalert2")

const URL_API = "http://localhost:3000/api"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titulo: "",
      descripcion: "",
      tareas: [],
      _id: ""
    }
  }

  componentDidMount() {
    this.fetchTareas()
  }

  addTareas = (e) => {
    e.preventDefault()
    if (this.state._id) {
      console.log("entre")
      axios
        .put(`${URL_API}/edit/${this.state._id}`, {
          titulo: this.state.titulo,
          descripcion: this.state.descripcion,
          _id: this.state._id
        })
        .then(() => {
          swal.fire({
            text: "Tarea editada",
            icon: "success",
            timer: 800
          })
          this.fetchTareas()
        })
        .catch(() => {
          swal.fire({
            text: "Error al editar",
            icon: "error",
            timer: 800
          })
        })
        .then(
          this.setState({
            titulo: "",
            descripcion: "",
            _id: ""
          })
        )
    } else {
      axios
        .post(`${URL_API}/create`, {
          titulo: this.state.titulo,
          descripcion: this.state.descripcion
        })
        .then(() => {
          swal.fire({
            text: "Tarea agregada",
            icon: "success",
            showConfirmButton: false,
            timer: 900
          })
        })
        .catch(() => {
          swal.fire({
            text: "Error al agendar tarea",
            icon: "error",
            showConfirmButton: false,
            timer: 900
          })
        })
        .then(() => {
          this.setState({
            titulo: "",
            descripcion: ""
          })
          this.fetchTareas()
        })
    }
  }

  fetchTareas = () => {
    axios
      .get(`${URL_API}/tareas`)
      .then((response) => {
        this.setState({
          tareas: response.data.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  deleteTarea = (id) => {
    axios
      .delete(`${URL_API}/delete/${id}`)
      .then((response) => {
        swal.fire({
          text: "Tarea eliminada",
          icon: "success",
          showConfirmButton: false,
          timer: 900
        })
      })
      .catch((err) => {
        swal.fire({
          text: "Problemas al eliminar la tarea",
          icon: "error",
          showConfirmButton: false,
          timer: 900
        })
      })
      .then(this.fetchTareas())
  }

  updateTareas = (id) => {
    axios
      .put(`${URL_API}/edit/${id}`)
      .then((data) => {
        this.setState({
          titulo: data.data.titulo,
          descripcion: data.data.descripcion,
          _id: data.data._id
        })
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-md-5 form">
              <div className="card">
                <form onSubmit={this.addTareas} method="post">
                  <div className="form-floating mb-3">
                    <input
                      value={this.state.titulo}
                      onChange={this.handleChange}
                      name="titulo"
                      type="text"
                      className="form-control"
                      id="titulo-input"
                      placeholder="Titulo de la tarea"
                    ></input>
                    <label htmlFor="titulo-input">Titulo</label>
                  </div>
                  <div className="form-floating">
                    <textarea
                      value={this.state.descripcion}
                      name="descripcion"
                      onChange={this.handleChange}
                      className="form-control"
                      placeholder="Descripcion de la tarea"
                      id="descripcion-input"
                    ></textarea>
                    <label htmlFor="descripcion-input">Descripcion</label>
                  </div>
                  <hr />
                  <button type="submit" className="btn btn-success">
                    Add
                  </button>
                </form>
              </div>
            </div>

            <div className="col-md-7">
              <table className="table table-hover ">
                <thead>
                  <tr>
                    <th>Titulo</th>
                    <th>Descripcion</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tareas.map((tarea) => {
                    return (
                      <tr key={tarea._id}>
                        <td>{tarea.titulo}</td>
                        <td>{tarea.descripcion}</td>
                        <td>
                          <button
                            onClick={() => {
                              this.updateTareas(tarea._id)
                            }}
                            className="btn btn-outline-primary ml-2"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => {
                              this.deleteTarea(tarea._id)
                            }}
                            className="btn btn-outline-danger"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default App
