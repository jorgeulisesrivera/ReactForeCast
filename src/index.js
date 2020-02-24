import React from 'react'
import ReactDOM from 'react-dom'
import ForecastView from './containers/ForecastView'
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(<Router><ForecastView /></Router>,document.getElementById("app"))