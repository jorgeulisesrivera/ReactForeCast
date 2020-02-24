import React, { Component } from 'react';
import { Spin } from 'antd';
import Graph from '../../components/Graph'
import {selectorForecast,selectorWeather} from '../../functions/selectors'
import {getResumeDays} from '../../functions/math'
import {WeatherDay} from '../../components/WeatherDay'
import { Switch, Route,withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col } from 'antd';
import "antd/dist/antd.css";
 

const ForeCastView = ({daySelected,data,hours}) => {
  let hoursFiltered  = hours;
  if(daySelected !== null)
  {
    if(data.filter(row=>row.dayOfWeek.toLowerCase()===daySelected.toLowerCase()).length>0)
    {
      hoursFiltered = hours.filter(row=>row.dayOfWeek.toLowerCase() == daySelected.toLowerCase());
    }
  }
  return(
    <div>
      <div><Graph stock={hoursFiltered} width={820} height={150}/></div>
      {data.map((day,key)=>
          <Link key={key} to={"/" + day.dayOfWeek}><WeatherDay 
            key={key} 
            icon={day.icon} 
            dayOfWeek={day.dayOfWeek} 
            min={day.min} 
            max={day.max} 
            description={day.description} 
            daySelected={daySelected}
            isToday={key===0?true:false}
            temp={day.temp}
            /></Link>)}
    </div>);
}

class index extends Component {

    constructor() {
        super();
        this.state = {
            days:[],
            forecastHours:[]
        };
      } 

  async componentDidMount()
  {
    let weather = null;
    let forecast= null;
    //TODAY
    const responseToDay = await fetch(process.env.API_WEATHER_TODAY);
    if (responseToDay.ok) { 
        let json = await responseToDay.json();
        //console.log("weather",selectorWeather(json));
        weather = selectorWeather(json);
    } else {
        alert("HTTP-Error: " + responseToDay.status);
    }
    //FORECAST
    const response = await fetch(process.env.API_WEATHER_FORECAST);
    if (response.ok) {  
        const json = await response.json();
        forecast = selectorForecast(json);
      } else {
        alert("HTTP-Error: " + response.status);
      }
    const days = getResumeDays(weather,forecast);
    this.setState({days,forecastHours:forecast});
  }

  render() {

    const days = this.state.days;
    const hours = this.state.forecastHours;

    return (
            <Row>
                <Col span={4}></Col>
                <Col span={20}>
                {this.state.days.length===0?<div style={{marginLeft:380}}><Spin size="large" style={{marginTop:100}}/></div>:
                <Switch>
                  <Route exact path="/" component={() => <ForeCastView daySelected={null} data={days} hours={hours}/>} />
                  <Route path="/:day" component={(props)=><ForeCastView daySelected={props.match.params.day} data={days} hours={hours}/>}/>
                </Switch>  
                }
                </Col>
            </Row>
    );
  }
}
export default withRouter(index);