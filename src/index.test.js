var module=require('./index');
var expect=require('chai').expect;
var Workdate=require('./index');
var moment=require('moment');
var moment=moment();
var date=moment.toDate();


console.log(date)
//date.setMilliseconds(1);
var weekworkdays=['Monday','Tuesday','Wednesday','Thursday','Friday'];
describe('workdates',function(){
    it(' new workdate object should not be undefined',function(){
        var workdate=new Workdate(new Date(),weekworkdays);
        console.log('WeekWorkDays:',workdate.weekWorkDays);
        expect(workdate.date.toDate() instanceof Date).to.be.true;
    })
   
})

describe('Date Difference',function(){
    date=new Date();
    var today=new Workdate(date,weekworkdays);
    var tomorrow=new Workdate(date,weekworkdays);
    var yesterday=new Workdate(date,weekworkdays);
    tomorrow.add(1,'day');
    yesterday.subtract(1,'day');
    it('yesterday and today have to have 1 day difference', function(){

        expect((today.DaysDiff(today.date.toDate(),yesterday.date.toDate()))==1).to.be.true;
    })
    it('today and tomorrow have to have 1 day difference', function(){

        expect((today.DaysDiff(today.date.toDate(),tomorrow.date.toDate()))==1).to.be.true;
    })
})
 
describe('Object\'s non working dates',function(){
    it('adding non working date to empty object',function(){
        var workdate=new Workdate(new Date(),weekworkdays);
        workdate.addNonWorkingDate(new Date(),weekworkdays);
        expect(workdate.nonWorkingDates !== undefined && workdate.nonWorkingDates.length > 0).to.be.true;
    })
    it('removing non working dates',function(){
        var date=new Date();
        var workdate=new Workdate(new Date(),weekworkdays);
        workdate.addNonWorkingDate(date);
        workdate.removeNonWorkingDate(date);
        expect(workdate.nonWorkingDates===undefined || workdate.nonWorkingDates.length == 0).to.be.true;
    })
})

describe('isWorkingDayToday',function(){
    it('it is a working day today',function(){
        var date= new Date(2016,11, 23); //was friday
        var workdate=new Workdate(date,weekworkdays);
        expect(workdate.isWorkingDayToday()).to.be.true;
    })
    it('it is not a working day today',function(){
        var date= new Date(2016,11, 24); //was friday
        var workdate=new Workdate(date,weekworkdays);
        expect(workdate.isWorkingDayToday()).to.be.false;
    })
})