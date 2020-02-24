
export const selectorForecast = (_forecast)=>{
    const list = _forecast.list;
    let forecast = []
    for(var i=0;i<list.length;i++)
    {
        var jsDate = new Date(list[i].dt*1000);
        forecast.push(
            {
                date:jsDate.toISOString(),
                temp:list[i].main.temp,
                icon:list[i].weather[0].icon,
                min:list[i].main.temp_min,
                max:list[i].main.temp_max,
                day:jsDate.getUTCDate(),
                hour:jsDate.getUTCHours(),
                dayOfWeek:dayOfWeek(jsDate.getUTCDay()),
                datejs:jsDate,
                description:list[i].weather[0].description
            }
        );
    }
    return forecast;
}

export const selectorWeather = (_weather)=>{
    var jsDate = new Date(_weather.dt*1000);
    const weather = {
        date:jsDate.toISOString(),
        temp:Math.round(_weather.main.temp),
        icon:_weather.weather[0].icon,
        min:null,
        max:null,
        day:jsDate.getUTCDate(),
        hour:jsDate.getUTCHours(),
        dayOfWeek:dayOfWeek(jsDate.getUTCDay()),
        datejs:jsDate,
        description:_weather.weather[0].description
    }
    return weather;
}

const dayOfWeek = (_day) =>{
    let d = "";
    switch (_day) {
        case 0:d="Domingo";break;
        case 1:d="Lunes";break;
        case 2:d="Martes";break;
        case 3:d="Miercoles";break;
        case 4:d="Jueves";break;
        case 5:d="Viernes";break;
        case 6:d="Sabado";break;
    }
    return d;
}