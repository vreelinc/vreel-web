export interface EventsDataTypes{
    id:number,
    image:string,
    title:string,
    time:string,
    text:string,
    firstButton:string,
    secondButton:string

}

export const EventsData:EventsDataTypes[] = [
    {
        id:1,
        image:"/assets/images/Events1.svg",
        title:"Dow",
        time:"08/28/2022",
        text:"DOW Convention Center",
        firstButton:"Learn More",
        secondButton:"RSVP"
    },
    {
        id:2,
        image:"/assets/images/Events2.svg",
        title:"Hi-Cone",
        time:"10/16/2022",
        text:"Target Convention Center",
        firstButton:"Learn More",
        secondButton:"RSVP"
    },
    {
        id:3,
        image:"/assets/images/Events3.svg",
        title:"Think Circular",
        time:"11/11/2022",
        text:"Avangard Headquarters",
        firstButton:"Learn More",
        secondButton:"RSVP"
    }
]