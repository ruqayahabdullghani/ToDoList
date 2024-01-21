import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Todo from './Todo';
import { TodosContext } from '../Context/todosContext';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';



export default function Todolist() {
  const {todos , setTodos}= useContext(TodosContext);
  const [inputTitle , setInputTitle] = useState("");



  const todo = todos.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });
  

  function handleAddClick(){
    const newTodo = {
      id: uuidv4(),
      title: inputTitle,
      details: "",
      isCompleted: false
    }
    const updatedToDos = [...todos , newTodo];
    setTodos(updatedToDos);
    localStorage.setItem("todos", JSON.stringify(updatedToDos));
    setInputTitle("");
  }
 // const storageTodos =  JSON.parse(localStorage.getItem("todos"));
  // setTodos(storageTodos)

  return (
      <Container maxWidth="sm">
       <Card sx={{ minWidth: 275 , alignItems: "center" , textAlign:"center" }}>
      <CardContent>
        <Typography variant="h2" fontWeight={"Bold"}>
          مهامي
        </Typography>
        <Divider style={{marginBottom:"30px"}}/>
        <ToggleButtonGroup   style={{ direction: "ltr"}} color="primary" exclusive aria-label="Platform">
                <ToggleButton>غير منجز</ToggleButton>
                <ToggleButton value="android">المنجز</ToggleButton>
                <ToggleButton value="ios">الكل</ToggleButton>
                </ToggleButtonGroup>
                {todo}







                {/* input */}
                <Grid container spacing={2} style={{marginTop: "20px"  }} >
              <Grid xs={8} style={{width : "100%" ,  minWidth: 275 }}>
              <TextField required value={inputTitle} onChange={(e) => {
                setInputTitle(e.target.value)
              }}
               id="outlined-basic" label="المهمة" variant="outlined"  style={{width : "100%" }}/>
                  </Grid>
                  <Grid xs={4}>
                  <Button onClick={() => {
                    handleAddClick();
                  }}
                   variant="contained" style={{height : "100%", width : "84%" }}>اضافه</Button>
                  </Grid>
                  </Grid>











                    </CardContent>
                    </Card>
                    </Container>
  );
}