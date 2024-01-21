import React, { useContext, useState } from 'react'
import {Grid, IconButton, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { TodosContext } from '../Context/todosContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Todo({todo , handleCheck}) {
  const [showAlert , setShowAlert ] = useState(false);
  const [showAlertUpdate , setShowAlertUpdate ] = useState(false);
  const [updatedToDo , setUpdatedToDo] = useState({title :todo.title , details: todo.details});

  const { todos, setTodos } = useContext(TodosContext);


//event handlers
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleUpdateClick(){
    setShowAlertUpdate(true);
  }

  function handleDelet(){
    setShowAlert(true);
  }
 
  function handleCloss(){
    setShowAlert(false)
  }

  function handleUpdateCloss(){
    setShowAlertUpdate(false)
  }

  function handleDeletToDo(){
    const updatedTodos = todos.filter((t)=>{
      if (t.id === todo.id) {
      return false
      } else {
        return true}
    })

    setTodos(updatedTodos)
  }

  function handleUpdateToDO(){
const updatedToDos = todos.map((t) => {
  if(t.id === todo.id){
    return{...t, title: updatedToDo.title , details: updatedToDo.details}
  }else{
    return t
  }
})

setTodos(updatedToDos);
setShowAlertUpdate(false)

  }


  return (
<>
{/* //  DELETE MODEL */}

    <Dialog
    style={{direction: "rtl"}}
    onClose={handleCloss}
    open={showAlert}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      هل أنت متأكد من رغبتك بالحذف؟
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        لا يمكنك التراجع عن الحذف بعد اتمامه
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloss}>إغلاق</Button>
      <Button autoFocus onClick={handleDeletToDo}>
        حذف
      </Button>
    </DialogActions>
  </Dialog>

    {/* // END OF DELET MODEL */}

    {/* UPDATE TO DO  */}
    <Dialog
    style={{direction: "rtl"}}
    onClose={handleUpdateCloss}
    open={showAlertUpdate}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      تعديل مهمه
    </DialogTitle>
    <DialogContent>
    <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="email"
        label="عنوان المهمه"
        value={updatedToDo.title}
        onChange={(e) => {
          setUpdatedToDo({...updatedToDo, title:e.target.value})
        }}
        type="email"
        fullWidth
        variant="standard"
          />
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="email"
                label="التفاصيل"
                value={updatedToDo.details}
                onChange={(e) => {
                  setUpdatedToDo({...updatedToDo, details:e.target.value})
                }}
                type="email"
                fullWidth
                variant="standard"
          />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleUpdateCloss}>إغلاق</Button>
      <Button autoFocus onClick={handleUpdateToDO}>
        تعديل
      </Button>
    </DialogActions>
  </Dialog>

    {/* END UPDATE TO DO  */}

       <Card className='todoCard'
        sx={{ minWidth: 275 , background : "#283593" ,marginTop: 3 , paddingTop: 2}} style={{color: "white"}}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <Typography variant="h5" sx={{textAlign: "right" , text: "right" }}>
                {todo.title}
                  </Typography>
                  <Typography variant="h6" sx={{textAlign: "right" , text: "right"}}>
                  {todo.details}
                  </Typography>
                  </Grid>
                <Grid xs={4} style={{display:'flex', justifyContent:"space-around", alignItems:"center"  }}
                 >
                  {/* check icon */}
                  <IconButton
                  onClick={()=> {
                    handleCheckClick();
                  }}
                    aria-label="check"
                    style={{
                      color:todo.isCompleted ? "white":  "#8bc34a",
                      background: todo.isCompleted ? "#8bc34a":  "white",
                      border: 'solid #8bc34a 3px'
                    }} className='IconButton'>
                        <CheckIcon/>
                  </IconButton>

                {/* .........update.................. */}

                  <IconButton onClick={handleUpdateClick}
                  aria-label="delete"
                  style={{color: "#257BF7" ,
                   background:"white" , 
                   border: "solid #257BF7 3px"}}>
                        <EditOutlinedIcon />
                  </IconButton>  
                  
                  {/* delet icon */}
                  <IconButton aria-label="delete"
                  style={{color: "#D40202" ,
                   background:"white" , 
                   border: "solid #D40202 3px"}} onClick={handleDelet}>
                    
                    <DeleteOutlineIcon />
                  </IconButton>

                  </Grid>
                  </Grid>
                  </CardContent>
                    </Card>

                    </>
              
  )
}

export default Todo