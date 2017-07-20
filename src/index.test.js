var module=require('./index');
var expect=require('chai').expect;
var Workdate=require('./index');

describe('workdates',function(){
    it(' new workdate object should not be undefined',function(){
        var workdate=new Workdate(new Date());
        expect(workdate.date.toDate() instanceof Date).to.be.true;
    })
   
})

describe('Date Difference',function(){
     /*it('yesterday and today have to have 1 day difference', function(){
        var workdate=new Workdate(new Date());
        var yesterday=new Workdate(new Date());
        yesterday.subtract(1,'day');
        expect((workdate.DaysDiff(workdate.date.toDate(),yesterday.date.toDate()))==1).to.be.true;
    })*/
    it('today and tomorrow have to have 1 day difference', function(){
        var workdate=new Workdate(new Date());
        var tomorrow=new Workdate(new Date());
        tomorrow.add(1,'day');
        expect((workdate.DaysDiff(workdate.date.toDate(),tomorrow.date.toDate()))==1).to.be.true;
    })
})

describe('Object\'s non working dates',function(){
    it('adding non working date to empty object',function(){
        var workdate=new Workdate(new Date());
        workdate.addNonWorkingDate(new Date());
        expect(workdate.nonWorkingDates !== undefined && workdate.nonWorkingDates.length > 0).to.be.true;
    })
    it('removing non working dates',function(){
        var date=new Date();
        var workdate=new Workdate(new Date());
        workdate.addNonWorkingDate(date);
        workdate.removeNonWorkingDate(date);
        expect(workdate.nonWorkingDates===undefined || workdate.nonWorkingDates.length == 0).to.be.true;
    })
})

describe('isWorkingDayToday',function(){
    it('it is a working day today',function(){
        var date= new Date(2016,11, 23); //was friday
        var workdate=new Workdate(date);
        expect(workdate.isWorkingDayToday()).to.be.true;
    })
    it('it is not a working day today',function(){
        var date= new Date(2016,11, 24); //was friday
        var workdate=new Workdate(date);
        expect(workdate.isWorkingDayToday()).to.be.false;
    })
})