const Joi=require("joi");
const express=require("express");
let app=express();
app.use(express.json());
const Players=[
    {id:1,
    name:'Ronaldo'
    },
    
    {id:2,
    name:'Maradona'},

    {id:3,
    name:'Messi'}
];
const PORT=process.env.port||3000;

  
const port=process.env.PORT||3000;
app.get('/api/Players/:id',function(req,res)
{
    const Player=Players.find(c=>c.id===parseInt(req.params.id));
    if(!Player)res.status(404).send("Erron Not found");
    res.send(Player);
}
);
app.post('/api/Players',(req,res)=>{
    const schema={
        name: Joi.string().min(3).required()
    };
    const result=Joi.validate(req.body,schema);

    if(result.error)
    {
        res.status(400).send(result.error);
        return;
    }
    const Player=
    {id:Players.length+1,
    name:req.body.name    
    };

Players.push(Player);
res.send(Player);
}
);
app.post('/api/Players:id',(req,res)=>{
    const Player=Players.find(c=>c.id===parseInt(req.params.id));
    if(!Player)res.status(404).send("Erron Not found");
    
    const result=Joi.validate(req.body);

    if(result.error)
    {
        res.status(400).send(result.error);
        return;
    }
    Player.name=req.body.name;
    res.send(Player);
}
);
function validateCourse(course)
{
    const schema={
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course,schema);
}
app.delete('/api/Players/:id',(req,res)=>{
    const Player=Players.find(c=>c.id===parseInt(req.params.id));
    if(!Player)res.status(404).send("Erron Not found");
    const index = Players.indexOf(Players);
    Players.splice(index,1);
    res.send(Player);
       
})

app.listen(PORT,()=>console.log(`server is running at the port ${port}`));