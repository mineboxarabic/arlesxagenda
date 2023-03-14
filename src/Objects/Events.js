import Data from '../Data/events-arles.json';
import { DateTime } from 'luxon';

 class Events{

    constructor(){
        this.events = Data.events;




        this.day = new Map([]); // Map of the events of the day
        this.month = new Map([]); // Map of the events of the month
        this.year = new Map([]); // Map of the events of the year
        this.keyWordsAndTags = new Map([]); // Map of the events of the keywords and tags
        this.locations = new Map([]); // Map of the events of the locations


        this.events.map((event,i)=>{
            //########## Mapping the keywords to the hashmap ##########
            if(event.keywords !== undefined && event.keywords != null){
                if(event.keywords.en !== undefined && event.keywords.en != null){
                    event.keywords.en.map((keyword)=>{ // Loop through the keywords of the event
                        if(!this.keyWordsAndTags.has(keyword)){
                        
                            this.keyWordsAndTags.set(keyword, []); // Create a new array if the keyword doesn't exist
                        }
                        this.keyWordsAndTags.get(keyword).push(i); // Add the index of the event to the array
                        return null;
                    });
                }
                else if(event.keywords.fr !== undefined && event.keywords.fr != null){
                    // Loop through the keywords of the event
                    event.keywords.fr.map((keyword)=>{
                        if(!this.keyWordsAndTags.has(keyword)){
                            this.keyWordsAndTags.set(keyword, []); // Create a new array if the keyword doesn't exist
                        }
                        this.keyWordsAndTags.get(keyword).push(i); // Add the index of the event to the array
                        return null;
                    });
                }

            }

            if(event.tags !== undefined && event.tags != null){

                event.tags.map((tag)=>{
                    if(tag !== undefined && tag != null){
                        if(!this.keyWordsAndTags.has(tag["slug"])){
                            this.keyWordsAndTags.set(tag["slug"], []); // Create a new array if the Tag doesn't exist
                        }
                        if(!this.keyWordsAndTags.has(tag["label"])){
                            this.keyWordsAndTags.set(tag["label"], []); // Create a new array if the Tag doesn't exist
                        }
                        this.keyWordsAndTags.get(tag["slug"]).push(i); // Add the index of the event to the array
                        this.keyWordsAndTags.get(tag["label"]).push(i); // Add the index of the event to the array
                    }
                    return null;
                });
            }
            if(event.tagGroups !== undefined && event.tagGroups != null){
                event.tagGroups.map((tagGroup)=>{
                    if(!this.keyWordsAndTags.has(tagGroup["name"])){
                        this.keyWordsAndTags.set(tagGroup["name"], []); // Create a new array if the Tag doesn't exist
                    }
                    if(!this.keyWordsAndTags.has(tagGroup["slug"])){
                        this.keyWordsAndTags.set(tagGroup["slug"], []); // Create a new array if the Tag doesn't exist
                    }
                    if(!this.keyWordsAndTags.has(tagGroup["access"])){
                        this.keyWordsAndTags.set(tagGroup["access"], []); // Create a new array if the Tag doesn't exist
                    }
                    this.keyWordsAndTags.get(tagGroup["name"]).push(i); // Add the index of the event to the array
                    this.keyWordsAndTags.get(tagGroup["slug"]).push(i); // Add the index of the event to the array
                    this.keyWordsAndTags.get(tagGroup["access"]).push(i); // Add the index of the event to the array
                    return null;
                });

            }


            if(event.address !== undefined && event.address != null){
                if(!this.locations.has(event.address)){
                    this.locations.set(event.address, []); // Create a new array if the Tag doesn't exist
                }
                this.locations.get(event.address).push(i); // Add the index of the event to the array
                
            }





            //########## Mapping the Date of events to the hashmap ##########
            event.timings.map((timing)=>{
                let start = DateTime.fromISO(timing.start); // Get the start date of the event
                let end = DateTime.fromISO(timing.end); // Get the end date of the event
                let date = DateTime.local(start.year , start.month , start.day); // Create a new date object
                while(date <= end){
                    //in this loop we add the index of the event to the hashmap
                    //if the hashmap doesn't have the year, month or day we create a new one
                    //if the hashmap has the year, month or day we add the index to the array
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
                
                return null;
            });

            return null;
        });
    }
    /**
     * 
     * @param {int} day 
     * @param {int} month 
     * @param {int} year 
     * @returns  {Set} Set of events that are on the date given
     */
    getEventsByDate(day, month, year){
        if(this.year.has(year) && this.year.get(year).has(month) && this.year.get(year).get(month).has(day)
            && this.year.get(year).get(month).get(day) !== undefined){
            return new Set(this.year.get(year).get(month).get(day));
            }
        return new Set([]);

    }
    /**
     * 
     * @param {string} keyword 
     * @returns  {Set} Set of events that have the keyword given
     */
    getEventsByKeyword(keyword){
        return new Set(this.keyWordsAndTags.get(keyword)); 
    }
    /**
     * 
     * @param {Set} keywords 
     * @returns 
     */
    getEventsByKeywords(keywords){
        let events = new Set([]);
        keywords.map((keyword)=>{
            if(this.keyWordsAndTags.has(keyword)){
                this.keyWordsAndTags.get(keyword).map((event)=>{
                    events.add(event);
                    return null;
                });
            }
            return null;
        });
        return events;
    }
    /**
     * 
     * @param {int} index 
     * @returns  {Object} Event that is at the index given
     */
    getEventsByIndex(index){
        if(index < this.events.length && index >= 0&& this.events[index] !== undefined)
            return this.events[index];
        return null;
    }
    /**
     * 
     * @returns {Array} Array of all the events
     */
    getAllEventsIndexes(){
        let eventsArray = [];
        for(let i = 0; i < this.events.length; i++){
            eventsArray.push(i);
        }
        return eventsArray;
    }
    /**
     * 
     * @param {string} location 
     * @returns 
     */
    getEventsByLocation(location){
        return new Set(this.locations.get(location));
    }
    /**
     * 
     * @returns {Set} Set of all the locations
     */
    getAllLocaitons(){
        return new Set(this.locations.keys());
    }
    /**
     * 
     * @param {int} day 
     * @param {int} month 
     * @param {int} year 
     * @returns {Set} Set of events that are after the date given
     */
    getEventsAfterDate(day, month, year){
        console.log(day, month, year);

        let years = new Map([...this.year.entries()].sort());
        let events = new Set([]);
        let lastYear = [...years.keys()].pop();
        let firstYear = [...years.keys()].shift();


        if(year >= firstYear && year <= lastYear ){
            for(let i = year; i <= lastYear; i++){
                let months = new Map([...years.get(i).entries()].sort());
                let lastMonth = [...months.keys()].pop();
                let firstMonth = [...months.keys()].shift();

                let startingMonth = firstMonth;
                if(i === year)
                    startingMonth = month;
                for(let j = startingMonth ; j <= lastMonth; j++){
                    let days = new Map([...months.get(j).entries()].sort());    
                    const maxKey = Math.max(...days.keys());
                    let startingDay = 1;
                    if(i === year && j === month)
                        startingDay = day;
                    for(let k = startingDay; k <= maxKey; k++){
                        if(days.get(k) !== undefined && days.get(k) !== null && days.get(k) !== [] && days.get(k) !== {} ){
                            days.get(k).map((event)=>{
                                events.add(event);
                                return null;
                            });
                        }
                            
                    }
                }
        }
        console.log(events);
    }
        else if(year > lastYear){
            return events;
        }
        else{
            events = this.getAllEventsIndexes();
        }
        return events;
    }
}

export default Events;