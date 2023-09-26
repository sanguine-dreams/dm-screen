function SpellCard({spell}){

    


    return(<div className="spell-card flex flex-wrap border-double border-4 border-orange-800">
        <h1 className="m-4">{spell.name}</h1> 
        <h1 className="m-4">{spell.level}</h1>
        <h1 className="m-4">{spell.casting_time}</h1>
        <h1 className="m-4">{spell.duration}</h1>
        <h1 className="m-4">{spell.range}</h1>
        <h1 className="m-4">{spell.components}</h1>
    </div>);
}

export default SpellCard;