'use strict';
var moment=require('moment');

/**
 * Represents a Workdate instance
 * @constructor 
 * @param {date} date - date object to initialize the object
 */
function Workdate(date,weekWorkingDays){
    if(weekWorkingDays instanceof Array){
        if(date instanceof Date){
            var properdate=moment(date);
            this.date=properdate;
            this.weekWorkDays=new Array();
            //check if weekworkingdays are defined
            if((weekWorkingDays==undefined||weekWorkingDays==null) && weekWorkingDays.length<=0){
                throw new Error('A workdate object has to have at least one day as a working day...');
            }
            this.weekWorkDays=getFormattedWeekWorkingdays(weekWorkingDays);
            // define and set week workdates. use JS day definition sunday is 0 saturday is 6.
            this.nonWorkingDates=new Array();
        }else{
            this.date=undefined;
            throw new Error('Provided date is not a date. workdate object\'s constructor requires a valid date object to operate');
        }
    }else{
        throw new Error("weekWorkingDays have to be an array. This array should contain an array with the working days eg. ['Monday','Tuesday'] ")
    }

}

/**
 * Adds a new non working date to the workdate object in order to be calculated when operations with working days are performed
 * @memberof Workdate
 * @param {date} date - adds a non working date to the object's list of non working dates
 */
Workdate.prototype.addNonWorkingDate=function(date){
    if(date instanceof Date){
        this.nonWorkingDates.push(date);
    }else{

    }
}
/**
 * Removes a non working date from the user's list, if the date exists
 * @memberof Workdate
 * @param {date} date - date to remove.
 */
Workdate.prototype.removeNonWorkingDate=function(date){
    //if this date is contained in the non working dates, then remove it
    var index=this.nonWorkingDates.map(Number).indexOf(+date);
    if(index!=-1){
        this.nonWorkingDates.splice(index,1);
    }else{

    }
}
/**
 * Checks if today is a working day, taking into account all the users datax
 * @memberof Workdate
 */
Workdate.prototype.isWorkingDayToday=function(){
    var index=this.nonWorkingDates.map(Number).indexOf(+this.date.toDate());
    if(index!=-1){
        return false;
    }else{

    }
    // implement custom workdates checks

    /*if(this.date.toDate().getDay()==0||this.date.toDate().getDay()==6){
        return false;
    }else{
        return true;
    }*/
    //TODO implement custom non working days checks
    if(this.weekWorkDays.includes(this.date.toDate().getDay())){
        return true;
    }else{
        return false;
    }
}
/**
 * calculates and returns an integer representing the calendar day difference between 2 dates
 * @function 
 * @memberof Workdate
 * @param {date} date - date object to be manipulated
 * @param {integer} value - the value to be added
 * @param {string} type - dictates months,days or years selector to be added
 */
Workdate.prototype.DaysDiff=function(datefrom,dateto){
    return Math.abs(moment(datefrom).diff(moment(dateto), 'days'))
}
/**
 * adds calendar days,months,years to given date and returns it
 * @function 
 * @memberof Workdate
 * @param {date} date - date object to be manipulated
 * @param {integer} value - the value to be added
 * @param {string} type - dictates months,days or years selector to be added
 */
Workdate.prototype.add=function(value,type){
    if(type==='days'||type==='day'){
        this.date.add(parseInt(value),'days');
    }
    if(type==='months'||type==='month'){
        this.date.add(parseInt(value),'months');
    }
    if(type==='years'||type==='year'){
        this.date.add(parseInt(value),'years');
    }
}
/**
 * subtracts calendar days,months,years to given date and returns it
 * @function 
 * @memberof Workdate
 * @param {integer} value - the value to be subtracted
 * @param {string} type - dictates months,days or years selector to be subtracted
 */
Workdate.prototype.subtract=function(value,type){
    if(type==='days'||type==='day'){
        this.date.subtract(parseInt(value),'days');
    }
    if(type==='months'||type==='month'){
        this.date.subtract(parseInt(value),'months');
    }
    if(type==='years'||type==='year'){
        this.date.subtract(parseInt(value),'years');
    }
}

//NEED TESTS=======================================================


Workdate.prototype.subWorkingDays=function(days){
    //TODO include user non working dates
    //TODO change to custom workdates usage 
    var daysfromweeks= (parseInt(days)/5)*7;
    var remainingdays= parseInt(days)%5;
    this.date.subtract(daysfromweeks,'days');
    for(var i=0;i<remainingdays;i++){
        this.date=date.toLastWorkingDay();
    }
}

Workdate.prototype.addWorkingDays=function(days){
    //TODO include user non working dates
    //TODO change to custom workdates usage 
    var daysfromweeks= (parseInt(days)/5)*7;
    var remainingdays= parseInt(days)%5;
    this.date.add(daysfromweeks,'days');
    for(var i=0;i<remainingdays;i++){
        this.date=date.toNextWorkingDay();
    }
}


Workdate.prototype.workingDaysDiff=function(datefrom,dateto){
    //TODO include user non working dates
     //TODO change to custom workdates usage 
    var difference=Math.abs(moment(datefrom).diff(moment(dateto), 'days'));
    return(difference-((difference/7)*2));
}


Workdate.prototype.workingDaysDiffFromToday=function(date){
    //TODO include user non working dates
     //TODO change to custom workdates usage 
    var difference=Math.abs(moment(this.date.toDate).diff(moment(date), 'days'));
    return(difference-((difference/7)*2));
}


/**
* sets the date to the previous day that is accounted as a working date 
*@memberof Workdate
*/
Workdate.prototype.toLastWorkingDay=function(){
    //TODO include user dates too
     //TODO change to custom workdates usage 
    switch(this.date.toDate.getDay()){
        //Sunday
        case 0:
            this.date.subtract(date,2,'days');
            break;
        //Monday
        case 1:
            this.date.subtract(date,3,'days');
            break;
        //Tuesday
        case 2:
            this.date.subtract(date,1,'days');
            break;
        //Wednesday
        case 3:
            this.date.subtract(date,1,'days');
            break;
        //Thursday
        case 4:
            this.date.subtract(date,1,'days');
            break;
        //Friday
        case 5:
            this.date.subtract(date,1,'days');
            break;
        //Saturday
        case 6:
            this.date.subtract(date,1,'days');
            break;
    }
}


/**
 * sets the given date to the next working day and returns it as a new date
 * @memberof Workdate 
 */
Workdate.prototype.toNextWorkingDay=function(){
    //TODO include user non working dates too
     //TODO change to custom workdates usage 
    switch(this.date.toDate.getDay()){
        //Sunday
        case 0:
            this.date.add(date,1,'days');
            break;
        //Monday
        case 1:
            this.date.add(date,1,'days');
            break;
        //Tuesday
        case 2:
            this.date.add(date,1,'days');
            break;
        //Wednesday
        case 3:
            this.date.add(date,1,'days');
            break;
        //Thursday
        case 4:
            this.date.add(date,1,'days');
            break;
        //Friday
        case 5:
            this.date.add(date,3,'days');
            break;
        //Saturday
        case 6:
            this.date.subtract(date,2,'days');
            break;
    }
}
module.exports=Workdate
//UTILS----------------------------


/**
 * 
 * Format user provided week working days to be in proper format for being used by the Workdate object
 * 
 */
function getFormattedWeekWorkingdays(weekworkingdays){
    var properworkingdays=new Array();
    weekworkingdays.forEach(function(day) {
        switch (day) {
            case 'Sunday':
                properworkingdays.push(0);
                break;
            case 'Monday':
                properworkingdays.push(1);
                break;
            case 'Tuesday':
                properworkingdays.push(2);
                break;
            case 'Wednesday':
                properworkingdays.push(3);
                break;
            case 'Thursday':
                properworkingdays.push(4);
                break;
            case 'Friday':
                properworkingdays.push(5);
                break;
            case 'Saturday':
                properworkingdays.push(6);
                break;
            case '0':
                properworkingdays.push(0);
                break;
            case '1':
                properworkingdays.push(1);
                break;
            case '2':
                properworkingdays.push(2);
                break;
            case '3':
                properworkingdays.push(3);
                break;
            case '4':
                properworkingdays.push(4);
                break;
            case '5':
                properworkingdays.push(5);
                break;
            case '6':
                properworkingdays.push(6);
                break;
                case 0:
                properworkingdays.push(0);
                break;
            case 1:
                properworkingdays.push(1);
                break;
            case 2:
                properworkingdays.push(2);
                break;
            case 3:
                properworkingdays.push(3);
                break;
            case 4:
                properworkingdays.push(4);
                break;
            case 5:
                properworkingdays.push(5);
                break;
            case 6:
                properworkingdays.push(6);
                break;
            default:
                break;
        }
    }, this);
    return properworkingdays;
    
}