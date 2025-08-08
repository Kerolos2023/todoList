import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ToDo from './ToDo';
import Button from '@mui/material/Button';
import { useState,useContext } from 'react';
import { TodosContext } from '../context/todosContext';
import { useMemo } from 'react';
export default function ToDoList() {
const { ToDos, setToDos } = useContext(TodosContext);
const [title, settitle] = useState("");
const [displayitems, setDisplayItems] = useState("all");

function handeleClick(itemid) {
  let newToDos = ToDos.map((todo) => {
    if (todo.id === itemid) {
      todo.isCompleted = !todo.isCompleted 
    }
    return todo;
  });
  setToDos(newToDos);
}
  
  function hamdlechanges() {
    const newToDo = {
      id: Date.now(),
      title: title,
      details: "التفاصيل الخاصة بالمهمة الجديدة",
      isCompleted: false
    };
    setToDos([...ToDos, newToDo]);
    localStorage.setItem("todos", JSON.stringify([...ToDos, newToDo]));
    settitle("");
  }
  const completedToDos = useMemo (() => {
    return ToDos.filter((todo) => {
      return todo.isCompleted
    })
    
  }, [ToDos]);
  const nonCompletedToDos = useMemo (() => {
    return ToDos.filter((todo) => {
      return !todo.isCompleted
    })
  }, [ToDos]);

//   const filteredToDos = ToDos.filter(todo => {
//   if (displayitems === "completed") return todo.isCompleted;
//   if (displayitems === "non-completed") return !todo.isCompleted;
//   return true;
// });

let filteredToDos = ToDos;
if(displayitems === "completed") {
    filteredToDos = completedToDos;
  }
else if(displayitems === "non-completed") {
    filteredToDos = nonCompletedToDos;
  }
  else {
    filteredToDos = ToDos;
  }
  function handledisplay(event){
    setDisplayItems(event.target.value);
    
  }
  const ToDosJSX = filteredToDos.map((todo) => {
    return (
      <ToDo key={todo.id} todo={todo} handeleClick={handeleClick}/>
    );
  })
  return (
      <Container style={{maxWidth:"650px"}}>
        <Card sx={{ minWidth: 280,maxHeight:"80vh", overflow:"scroll" }}>
      <CardContent>
        <Typography variant='h2' >
          مهامى
        </Typography>
        <Divider/>
        <ToggleButtonGroup onChange={handledisplay} value={displayitems} style={ {direction: 'ltr' ,marginTop:"20px"} }
      // value={alignment}
      exclusive
      // onChange={handleAlignment}
    >
      <ToggleButton value="non-completed" >
        غير منجز
      </ToggleButton>
      <ToggleButton value="completed" >
        منجز 
      </ToggleButton>
      <ToggleButton value="all" >
        الكل
      </ToggleButton>
    </ToggleButtonGroup>


    {/* todos*/ }

    {ToDosJSX}

{/* button+add */}
    <Grid container spacing={2} style={{marginTop: '20px'}}>
      <Grid size={8}>
        <TextField
                  style={{ width: "100%"}}
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                />
      </Grid>
      <Grid size={4}>
        <Button
                  style={{ width: "100%", height: "100%",  }}
                  variant="contained"
                  onClick={(e) => {
                    hamdlechanges();
                  }}
                  disabled={title.length===0}
                >
                  إضافة
              </Button>
      </Grid>
    </Grid>
      </CardContent>
    </Card>
  </Container>
  );
}
