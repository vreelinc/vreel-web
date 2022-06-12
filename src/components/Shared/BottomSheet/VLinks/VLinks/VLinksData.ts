export interface VLinksDataTypes{
    id:number,
    image:string,
    title:string,
    text:string,
    firstButton:string,
    secondButton:string
    type:string

}

export const VLinksData:VLinksDataTypes[] = [
    {
        id:1,
        image:"/assets/images/vLinks1.svg",
        title:"Dow",
        text:"Dow Inks PCR Supply Deal With Avangard Innovative",
        firstButton:"Read More",
        secondButton:"Become a Partner",
        type:"vLinks"
    },
    {
        id:2,
        image:"/assets/images/vLinks2.svg",
        title:"Hi-Cone",
        text:"Avangard Innovative Partners with Hi-Cone Worldwide",
        firstButton:"Read More",
        secondButton:"Become a Partner",
        type:"vLinks"
    },
    {
        id:3,
        image:"/assets/images/vLinks3.svg",
        title:"Think Circular",
        text:"U.S. Recycling Industry Is Struggling To Figure Out A Future Without China",
        firstButton:"Read More",
        secondButton:"CTA",
        type:"vLinks"
    }
]