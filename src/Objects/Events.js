import Data from '../Data/events-arles.json';
import { DateTime } from 'luxon';

 class Events{

    constructor(){
        this.events = Data.events;




        this.newArrayOfEvents = [];

        /*this.events.map((event)=>{
            let newEvent = {};
            newEvent.uid = event.uid;
            newEvent.title = event.title;
            newEvent.description = event.description;
            newEvent.address = event.address;
            newEvent.keywords = event.keywords;
            newEvent.tags = event.tags;
            newEvent.timings = event.timings;
            newEvent.image = event.image;

            this.newArrayOfEvents.push(newEvent);
        });*/


        this.day = new Map([]);
        this.month = new Map([]);
        this.year = new Map([]);
        this.keyWordsAndTags = new Map([]);
        this.locations = new Map([]);


        this.events.map((event,i)=>{

            if(event.keywords !== undefined && event.keywords != null){
                if(event.keywords.en !== undefined && event.keywords.en != null){
                    event.keywords.en.map((keyword)=>{
                        if(!this.keyWordsAndTags.has(keyword)){
                            this.keyWordsAndTags.set(keyword, []);
                        }
                        this.keyWordsAndTags.get(keyword).push(i);
                    });
                }
                else if(event.keywords.fr !== undefined && event.keywords.fr != null){
                    event.keywords.fr.map((keyword)=>{
                        if(!this.keyWordsAndTags.has(keyword)){
                            this.keyWordsAndTags.set(keyword, []);
                        }
                        this.keyWordsAndTags.get(keyword).push(i);
                    });
                }

            }
            if(event.tags !== undefined && event.tags != null){
                if(!this.keyWordsAndTags.has(event.tags)){
                    this.keyWordsAndTags.set(event.tags, []);
                }
                this.keyWordsAndTags.get(event.tags).push(i);
            }

            if(event.address !== undefined && event.address != null){
                if(!this.locations.has(event.address)){
                    this.locations.set(event.address, []);
                }
                this.locations.get(event.address).push(i);
            }






            event.timings.map((timing)=>{
                let start = DateTime.fromISO(timing.start);
                let end = DateTime.fromISO(timing.end);
                let date = DateTime.local(start.year , start.month , start.day);
                while(date <= end){
                    if(!this.year.has(date.year)){
                        this.year.set(date.year, new Map([]));
                    }
                    if(!this.year.get(date.year).has(date.month)){
                        this.year.get(date.year).set(date.month, new Map([]));
                    }
                    if(!this.year.get(date.year).get(date.month).has(date.day)){
                        this.year.get(date.year).get(date.month).set(date.day, []);
                    }
                    this.year.get(date.year).get(date.month).get(date.day).push(i);
                    date = date.plus({days: 1});
                }

            });

        
        });
    }
    getEventsByDate(day, month, year){
        if(this.year.has(year) && this.year.get(year).has(month) && this.year.get(year).get(month).has(day)
            && this.year.get(year).get(month).get(day) !== undefined){
            return new Set(this.year.get(year).get(month).get(day));
            }
        return new Set([]);

    }
    getEventsByKeyword(keyword){
        return new Set(this.keyWordsAndTags.get(keyword));
    }
    getEventsByKeywords(keywords){
        let events = new Set([]);
        keywords.map((keyword)=>{
            if(this.keyWordsAndTags.has(keyword)){
                this.keyWordsAndTags.get(keyword).map((event)=>{
                    events.add(event);
                });
            }
        });
        return events;
    }
    getEventsByIndex(index){
        if(index < this.events.length && index >= 0&& this.events[index] !== undefined)
            return this.events[index];
        return null;
    }
    getAllEventsIndexes(){
        let eventsArray = [];
        for(let i = 0; i < this.events.length; i++){
            eventsArray.push(i);
        }
        return eventsArray;
    }
    getEventsByLocation(location){
        return new Set(this.locations.get(location));
    }
    getAllLocaitons(){
        return new Set(this.locations.keys());
    }
    
    getEventsAfterDate(day, month, year){
        console.log(day, month, year);
        let years = new Map([...this.year.entries()].sort());
        let events = new Set([]);
        let lastYear = [...years.keys()].pop();
        if(year > lastYear){
            for(let i = year; i <= lastYear; i++){
                let months = new Map([...years.get(i).entries()].sort());
                let lastMonth = [...months.keys()].pop();
                for(let j = month; j <= lastMonth; j++){
                    let days = new Map([...months.get(j).entries()].sort());    
                    const maxKey = Math.max(...days.keys());
                    for(let k = day; k <= maxKey; k++){
                        if(days.has(k)){
                            days.get(k).map((event)=>{
                                events.add(event);
                            });
                        }
    
    
                    }
                }
            }
        }
        else{

            

            /*for(let i = year; i <= lastYear; i++){
                let months = new Map([...years.get(i).entries()].sort());
                let lastMonth = [...months.keys()].pop();
                if(i === year){
                    for(let j = month; j <= lastMonth; j++){
                        let days = new Map([...months.get(j).entries()].sort());    
                        const maxKey = Math.max(...days.keys());
                        for(let k = day; k <= maxKey; k++){
                            if(days.has(k)){
                                days.get(k).map((event)=>{
                                    events.add(event);
                                });
                            }
        
        
                        }
                    }
                }
                else{
                    for(let j = 1; j <= lastMonth; j++){
                        let days = new Map([...months.get(j).entries()].sort());    
                        const maxKey = Math.max(...days.keys());
                        for(let k = 1; k <= maxKey; k++){
                            if(days.has(k)){
                                days.get(k).map((event)=>{
                                    events.add(event);
                                });
                            }
        
        
                        }
                    }
                }
            }*/
        }


        
        return events;
    }
}

export default Events;