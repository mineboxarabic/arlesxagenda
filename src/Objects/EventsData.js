
//http://jsonviewer.stack.hu/


/*export class Event{
    
    constructor(){
        this.UID = 0;
        this.languages = ["fr", "en"];
        this.title = ["fr", "en"];
        this.description = ["fr", "en"];
        this.longDescription = ["fr", "en"];
        this.keywords = {fr: [], en: []};
        this.html = ["fr", "en"];
        this.image = "";
        this.thumbnail = "";
        this.originalImage = "";
        this.age = null;
        this.createdAt = "";
        this.range = {ar: "", fr: "", en: "", es: "", de: "", it: ""};
        this.location = {
            UID: null,
            name:"",
            slug:"",
            address: "",
            postalCode : "",
            city: "",
            department: "",
            region: "",
            latitude: "",
            longitude: "",
            country: "",
            phone: "",
            email: "",
            website: "",
            facebook: "",
            twitter: "",
            instagram: "",
            youtube: "",
            latitude: null,
            longitude: null,
            countryCode: "fr",
            insee: "",
            timezone: "",
            updateAt: "",
            country:{de:"", code: "", oc:"",en:"",it: "", fr:"",es:""}
        };
        this.imageCredits = "";
        this.origin = {UID: null, title: "", oaUrl : ""};
        this.conditions = ["fr", "en"];
        this.registrationUrl = "";
        this.locationName = "";
        this.timings = [];
        this.registration = [];
        this.firstDate = "";
        this.firstTimeStart = "";
        this.firstTimeEnd = "";
        this.lastDate = "";
        this.lastTimeStart = "";
        this.lastTimeEnd = "";
        this.permalink = "";
        this.tags = [];
        this.tagGroups = [];
    }
}*/

let Event = () => {
    this.UID = 0;
    this.languages = ["fr", "en"];
    this.title = ["fr", "en"];
    this.description = ["fr", "en"];
    this.longDescription = ["fr", "en"];
    this.keywords = {fr: [], en: []};
    this.html = ["fr", "en"];
    this.image = "";
    this.thumbnail = "";
    this.originalImage = "";
    this.age = null;
    this.createdAt = "";
    this.range = {ar: "", fr: "", en: "", es: "", de: "", it: ""};
    this.location = {
        UID: null,
        name:"",
        slug:"",
        address: "",
        postalCode : "",
        city: "",
        department: "",
        region: "",
        latitude: "",
        longitude: "",
        country: "",
        phone: "",
        email: "",
        website: "",
        facebook: "",
        twitter: "",
        instagram: "",
        youtube: "",
        latitude: null,
        longitude: null,
        countryCode: "fr",
        insee: "",
        timezone: "",
        updateAt: "",
        country:{de:"", code: "", oc:"",en:"",it: "", fr:"",es:""}
    };
    this.imageCredits = "";
    this.origin = {UID: null, title: "", oaUrl : ""};
    this.conditions = ["fr", "en"];
    this.registrationUrl = "";
    this.locationName = "";
    this.timings = [];
    this.registration = [];
    this.firstDate = "";
    this.firstTimeStart = "";
    this.firstTimeEnd = "";
    this.lastDate = "";
    this.lastTimeStart = "";
    this.lastTimeEnd = "";
    this.permalink = "";
    this.tags = [];
    this.tagGroups = [];
};
//event.getDescription.fr;
//event.getDescription.en;
class EventsData {
    constructor() {
        this.events = [];
    }
    getEvents(){
        let eventsTemp = [];
       import('../Data/events-arles-small.json').then((data) => {
            data.events.map((event) => {
                eventsTemp.push(JSON.stringify(event));
            });
        });
        console.log(eventsTemp[1]);
        return this.events;
    }
    
}
export {EventsData, Event};