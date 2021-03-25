import './App.css';
import React, { Component } from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import FusionWidget from 'fusioncharts/fusioncharts.widgets';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

charts(FusionCharts);
ReactFusioncharts.fcRoot(FusionCharts, PowerCharts, FusionTheme,FusionWidget);

const dataSource = {
  chart: {
    decimals: "1",
    showvalues: "1",
    plottooltext: "$label: <b>$dataValue</b>",
    plotfillalpha: "70",
    theme: "fusion",
    streamlineddata: "0"
  },
  data: [
    {
      label: "Guatemala",
      value: "17362"
    },
    {
      label: "Sacatepequez",
      value: "8039"
    },
    {
      label: "Chimaltenango",
      value: "5509"
    },
    {
      label: "Quiche",
      value: "3962"
    },
    {
      label: "Solola",
      value: "2397"
    }
  ]
};

const dataSourceState = {
  chart: {
    decimals: "1",
    showvalues: "1",
    plottooltext: "$label: <b>$dataValue</b>",
    plotfillalpha: "70",
    theme: "fusion",
    streamlineddata: "0"
  },
  data: [
    {
      label: "Asintomático",
      value: "17362"
    },
    {
      label: "Sintomático",
      value: "8039"
    }
  ]
};

const dataSourceStateInfectedType = {
  chart: {
    decimals: "1",
    showvalues: "1",
    plottooltext: "$label: <b>$dataValue</b>",
    plotfillalpha: "70",
    theme: "fusion",
    streamlineddata: "0"
  },
  data: [
    {
      label: "non-imported",
      value: "17362"
    },
    {
      label: "imported",
      value: "8039"
    }
  ]
};

const dataSourceRango = {
  chart: {
    decimals: "1",
    showvalues: "1",
    plottooltext: "$label: <b>$dataValue</b>",
    plotfillalpha: "70",
    theme: "fusion",
    streamlineddata: "0"
  },
  data: [
    {
      label: "0 - 10 ",
      value: "17362"
    },
    {
      label: "10 - 20",
      value: "8039"
    },
    {
      label: "20 - 30",
      value: "5509"
    },
    {
      label: "30 - 40",
      value: "3962"
    },
    {
      label: "40 - 50",
      value: "2397"
    }
  ]
};

const dataSourceRAM = {
  chart: {
    decimals: "1",
    showvalues: "1",
    plottooltext: "$label: <b>$dataValue</b>",
    plotfillalpha: "70",
    theme: "fusion",
    streamlineddata: "0"
  },
  data: [
    {
      label: "Use ",
      value: "17362"
    },
    {
      label: "Free",
      value: "8039"
    }
  ]
};
class App extends React.Component {



  render() {


    return (

      <Router>


        <div class="topnav">
        <nav>
          <Link to="/">Stats</Link>
          <Link to="/datos">Datos</Link>
          <Link to="/Region">Region más infectada</Link>
          <Link to="/Departamentos">Departamentos más infectados</Link>
          <Link to="/Tipos">Casos infectados</Link>
          <Link to="/Registrados">Últimos casos registrados</Link>
          <Link to="/Rango">Rango de edades de infectados</Link>
          

        </nav>
        </div>
        <Switch>
          <Route path="/datos">
            <Datos />
          </Route>
          <Route path="/Region">
            <Region />
          </Route>
          <Route path="/Departamentos">
            <Departamentos />
          </Route>
          <Route path="/Tipos">
            <Tipos />
          </Route>
          <Route path="/Registrados">
            <Registrados />
          </Route>
          <Route path="/Rango">
            <Rango />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
;}
}

function Home(){
  return(
  <div className="grid-container">
    
    <div>
    <h1> System Monitor</h1>

      <h4>RAM</h4>
        <ReactFusioncharts
          type="area2d"
          width="94%"
          height="20%"
          dataFormat="JSON"
          dataSource={dataSourceRango}
        />
    </div>
    <div>
      <h4>RAM</h4>
        <ReactFusioncharts
          type="doughnut2d"
          width="94%"
          height="20%"
          dataFormat="JSON"
          dataSource={dataSourceRAM}
        />
    </div>
    <center>
    <div>
      <table id='students'>
          <tr>
            <td>PID</td>
            <td>Name</td>
            <td>Father PID</td>
            <td>Status</td>
          </tr>
          <tr>
            <td>
              1
            </td>
            <td>
              System
            </td>
            <td>
              -
            </td>
            <td>
              runing
            </td>
          </tr>
          <tr>
            <td>
              2
            </td>
            <td>
              GUI
            </td>
            <td>
              1
            </td>
            <td>
              runing
            </td>
          </tr>
        </table>
      </div>
    </center>
  </div>
  )
}

function Datos() {
  return (
    <div className="grid-container">
    
    <div>
      <h4>Datos recopilados</h4>
        <center>
        <table id='students'>
        <tr>
          <td>nombre</td>
          <td>ubicación</td>
          <td>edad</td>
          <td>tipo infectado</td>
          <td>estado</td>
        </tr>
        <tr>
          <td>
            Mauro Herrera
          </td>
          <td>
            Quetzaltenango
          </td>
          <td>
            25
          </td>
          <td>
            comunitario
          </td>
          <td>
            asintomático
          </td>
          </tr>
          <tr>
          <td>
            Pedro Guzmán
          </td>
          <td>
            Ciudad Guatemala
          </td>
          <td>
            32
          </td>
          <td>
            comunitario
          </td>
          <td>
            asintomático
          </td>
          </tr>
          <tr>
          <td>
            Alejandro Herrera
          </td>
          <td>
            Ciudad Guatemala
          </td>
          <td>
            28
          </td>
          <td>
            comunitario
          </td>
          <td>
            asintomático
          </td>
          </tr>
          <tr>
          <td>
            Silvia Calderón
          </td>
          <td>
            Ciudad Guatemala
          </td>
          <td>
            28
          </td>
          <td>
            comunitario
          </td>
          <td>
            asintomático
          </td>
          </tr>
        </table>
        </center>

        <form onSubmit>
                <input 
                placeholder="Ordenar por"></input>

            <button type="submit">Ordenar</button>                
        </form>             
      </div>

    </div>

  )
  
  ;
}

function Region() {
  return (
    <div className="grid-container">
      <div>
        <h4>Región más infectada</h4>                    
      </div>
    </div> 
  )
}

function Departamentos() {
  return (
    <div className="grid-container">
      <div>            
        <h4>Cinco departamentos más infectados</h4>                    
        <ReactFusioncharts
          type="funnel"
          width="60%"
          height="32%"
          dataFormat="JSON"
          dataSource={dataSource}
        />
      </div>         
    </div>
  )
}

function Tipos(){
  return(
    <div className="grid-container">
        <div>
          <h4> Casos infectados </h4>
          <div class="wrapper">
            <div class="one">Por State 
              <ReactFusioncharts
                type="pie2d"
                width="48%"
                height="20%"
                dataFormat="JSON"
                dataSource={dataSourceState}
              />
            </div>
            <p></p>
            <div class="two">Por InfectedType
            <ReactFusioncharts
                type="pie2d"
                width="48%"
                height="20%"
                dataFormat="JSON"
                dataSource={dataSourceStateInfectedType}
              />
            </div>
          </div> 
        </div> 
    </div>      

  )
}

function Registrados(){
  return(
    <div className="grid-container"> 
      <div>
      <h4>Últimos cinco casos registrados</h4>
          <center>
          <table id='students'>
          <tr>
            <td>nombre</td>
            <td>ubicación</td>
            <td>edad</td>
            <td>tipo infectado</td>
            <td>estado</td>
          </tr>
          <tr>
            <td>
            Mauro Herrera
            </td>
            <td>
              Quetzaltenango
            </td>
            <td>
              25
            </td>
            <td>
              comunitario
            </td>
            <td>
              asintomático
            </td>
            </tr>
            <tr>
            <td>
              Raquel Muñoz
            </td>
            <td>
              Ciudad Guatemala
            </td>
            <td>
              32
            </td>
            <td>
              comunitario
            </td>
            <td>
              asintomático
            </td>
            </tr>
            <tr>
            <td>
              Mario Lopez
            </td>
            <td>
              Ciudad Guatemala
            </td>
            <td>
              28
            </td>
            <td>
              comunitario
            </td>
            <td>
              asintomático
            </td>
            </tr>
            <tr>
            <td>
              Silvia Calderón
            </td>
            <td>
              Ciudad Guatemala
            </td>
            <td>
              28
            </td>
            <td>
              comunitario
            </td>
            <td>
              asintomático
            </td>
            </tr>
          </table>
          </center>
      </div>
    
    </div>
  )
}

function Rango(){
  return(
    <div className="grid-container"> 
      <div>
        <h4>Rango de edades de infectados</h4>
          <ReactFusioncharts
            type="column2d"
            width="94%"
            height="20%"
            dataFormat="JSON"
            dataSource={dataSourceRango}
          />
        </div>
    </div>
  )
}

export default App;
