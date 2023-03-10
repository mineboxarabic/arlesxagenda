
import { DateTime } from 'luxon';
 class Events{
    constructor(events){
        this.events = events;

        this.events.sort((a,b)=>{
            
            let aUid = a.uid;
            let bUid = b.uid;
            if(aUid < bUid){
                return -1;
            }
            if(aUid > bUid){
                return 1;
            }
            return 0;

        })

        this.day = new Map([]);
        this.month = new Map([]);
        this.year = new Map([]);

        this.keyWordsAndTags = new Map([]);

        this.events.map((event,i)=>{

            
            if(event.tags !== null){
                event.tags.map((tag)=>{
                    if(!this.keyWordsAndTags.has(tag)){
                        this.keyWordsAndTags.set(tag, i);
                    }

                });
            }

            if(event.keywords !== null){
                event.keywords.map((keyword)=>{
                   if(!this.keyWordsAndTags.has(keyword)){
                       this.keyWordsAndTags.set(keyword, i);
                   }
                })
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
                    this.year.get(date.year).get(date.month).get(date.day).push(event);
                    date = date.plus({days: 1});
                }

            });
        
        });
        console.log(this.year);    
    }
    getEventsByDate(day, month, year){
        
        return new Set(this.year.get(year).get(month).get(day));
    }

    getEventsByKeyword(keyword){
        return new Set(this.keyWordsAndTags.get(keyword));
    }
}

export default Events;