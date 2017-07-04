'use strict';
var moment=require('moment');
/**
 * checks if the given date is a working day
 * TODO - to include holidays here
 * @function 
 * @param {date} date - date object to be manipulated
 */
function isWorkingDay(date){
    if(date.getDay()==0||date.getDay()==6){
        return false;
    }else{
        return true;
    }
}

function subWorkingDays(date,days){
    var daysfromweeks= (parseInt(days)/5)*7;
    var remainingdays= parseInt(days)%5;
    var newDate=moment(date);
    newDate=newDate.subtract(daysfromweeks,'days');
    for(i=0;i<remainingdays;i++){
        newDate=toLastWorkingDay(newDate);
    }
    return newDate;
}
function addWorkingDays(date,days){
    var daysfromweeks= (parseInt(days)/5)*7;
    var remainingdays= parseInt(days)%5;
    var newDate=moment(date);
    newDate=newDate.add(daysfromweeks,'days');
    for(i=0;i<remainingdays;i++){
        newDate=toNextWorkingDay(newDate);
    }
    return newDate;
}

function workingDaysDiff(datefrom,dateto){
    var difference=Math.abs(moment(datefrom).diff(moment(dateto), 'days'))+1;
    return(difference-((difference/7)*2));
}
function DaysDiff(datefrom,dateto){
    return Math.abs(moment(datefrom).diff(moment(dateto), 'days'))+1
}
/**
 * adds calendar days,months,years to given date and returns it
 * @function 
 * @param {date} date - date object to be manipulated
 * @param {integer} value - the value to be added
 * @param {string} type - dictates months,days or years selector to be added
 */
function add(date,value,type){
    var edited=moment(date);
    if(type==='days'||type==='day'){
        edited.add(parseInt(value),'days');
    }
    if(type==='months'||type==='month'){
        edited.add(parseInt(value),'months');
    }
    if(type==='years'||type==='year'){
        edited.add(parseInt(value),'years');
    }
    return edited.toDate();
}
/**
 * subtracts calendar days,months,years to given date and returns it
 * @function 
 * @param {date} date - date object to be manipulated
 * @param {integer} value - the value to be subtracted
 * @param {string} type - dictates months,days or years selector to be subtracted
 */
function subtract(date,value,type){
    var edited=moment(date);
    if(type==='days'||type==='day'){
        edited.subtract(parseInt(value),'days');
    }
    if(type==='months'||type==='month'){
        edited.subtract(parseInt(value),'months');
    }
    if(type==='years'||type==='year'){
        edited.subtract(parseInt(value),'years');
    }
    return edited.toDate();
}
/**
 * sets the given date to the last working day and returns it as a new date
 * @function 
 * @param {date} date - date object to be manipulated
 */
function toLastWorkingDay(date){
    switch(date.getDay()){
        //Sunday
        case 0:
            return subtract(date,2,'days');
        //Monday
        case 1:
            return subtract(date,3,'days');
        //Tuesday
        case 2:
            return subtract(date,1,'days');
        //Wednesday
        case 3:
            return subtract(date,1,'days');
        //Thursday
        case 4:
            return subtract(date,1,'days');
        //Friday
        case 5:
            return subtract(date,1,'days');
        //Saturday
        case 6:
            return subtract(date,1,'days');
    }
}
/**
 * sets the given date to the next working day and returns it as a new date
 * @function 
 * @param {date} date - date object to be manipulated
 */
function toNextWorkingDay(date){
    switch(date.getDay()){
        //Sunday
        case 0:
            return add(date,1,'days');
        //Monday
        case 1:
            return add(date,1,'days');
        //Tuesday
        case 2:
            return add(date,1,'days');
        //Wednesday
        case 3:
            return add(date,1,'days');
        //Thursday
        case 4:
            return add(date,1,'days');
        //Friday
        case 5:
            return add(date,3,'days');
        //Saturday
        case 6:
            return subtract(date,2,'days');
    }
}
module.exports={
    subWorkingDays,
    addWorkingDays,
    toLastWorkingDay,
    toNextWorkingDay,
    add,
    workingDaysDiff,
    DaysDiff,
    subtract
}