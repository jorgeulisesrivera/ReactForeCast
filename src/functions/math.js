export const getResumeDays =(toDay,forecast)=>
{
    let days = [];

    //ADD DAYS FROM API FORECAST

    let uniqueDay = [... new Set(forecast.map(data => data.day))];
    uniqueDay = uniqueDay.slice(1); //NOT TODAY
    for(var i=0;i<uniqueDay.length;i++)
    {
        days.push(getResumeDay(uniqueDay[i],forecast))
    }

    //ADD TODAY FROM API WEATHER

    days = [{
        min:toDay.min,
        max:toDay.max,
        day:toDay.day,
        icon:toDay.icon,
        dayOfWeek:toDay.dayOfWeek,
        description:toDay.description,
        temp:toDay.temp
    },...days]


    return days;
}

const getResumeDay = (day,data) =>{
    const filteredData = data.filter(row=>row.day===day);
    const min = filteredData.sort(function(a, b){return a.min - b.min})[0].min;
    const max = filteredData.sort(function(a, b){return b.max - a.temp})[0].max;
    let icon = "";
    let description = "";
    if(filteredData.filter(row=>row.hour===12).length>0)
    {
        icon        = filteredData.filter(row=>row.hour===12)[0].icon;
        description = filteredData.filter(row=>row.hour===12)[0].description;
    }
    else
    {
        if(filteredData.filter(row=>row.icon.indexOf("d")!==-1).length>0)
        {
            //FIRST OF "d"
            icon        = filteredData.filter(row=>row.icon.indexOf("d")!==-1)[0].icon;
            description = filteredData.filter(row=>row.icon.indexOf("d")!==-1)[0].description;
            console.log("FIRST OF 'd'",icon,description)
        }
        else
        {
            //ANYONE
            icon        = filteredData[0].icon;
            description = filteredData[0].description;
            console.log("ANYONE",icon,description)
        }
    }
    return {
        min,
        max,
        day,
        icon,
        dayOfWeek:filteredData[0].dayOfWeek,
        description,
        temp:null
    }
}