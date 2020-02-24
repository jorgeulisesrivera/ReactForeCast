import React from 'react'
import {Title,Image,Content} from './styles'
const ICON_PATH = process.env.ICON_PATH;
export const WeatherDay = ({icon="", dayOfWeek="", min="", max="",description="",daySelected,isToday=false,temp=0}) =>{
    let color = "#ddd";
    if(daySelected!==null)
    {
        if(daySelected.toLowerCase()===dayOfWeek.toLowerCase())
        {
            color="red";
        }
    }
    return (
    <Content style={{borderColor:color}}>
        <div align="center">
            <Title><b>{dayOfWeek}</b></Title>
            <Image src={ICON_PATH + icon + ".png"}/>
            {isToday===true ?
                <div>
                    <div style={{height:25}}>Actual</div>
                    <div style={{height:25}}>{temp} C°</div>
                </div>
                :
                <div>
                    <div style={{height:25}}>Min: {min} C°</div>
                    <div style={{height:25}}>Max: {max} C°</div>
                </div>
            }
            <div>{description}</div>
        </div>
    </Content>
    );
}