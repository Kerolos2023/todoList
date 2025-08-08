import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TodosContext } from '../context/todosContext';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';

export default function ToDo({ todo , deleClick }) {
  const { ToDos, setToDos } = React.useContext(TodosContext);
  const [title, setTitle] = React.useState(todo.title);
  const [details, setDetails] = React.useState(todo.details);

    function handeleComplete() {
      let updatedToDos = ToDos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, isCompleted: !item.isCompleted };
        }
        return item;
      });
      setToDos(updatedToDos);
      localStorage.setItem("todos", JSON.stringify(updatedToDos));
    }
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    function handeleDelete() {
        setDeleteOpen(true);
    }
    function handeleClose() {
        setDeleteOpen(false);
    }
    function handeleDeleteconfirm(){
      let updatedToDos = ToDos.filter((item) => item.id !==todo.id);
      setToDos(updatedToDos);
      localStorage.setItem("todos", JSON.stringify(updatedToDos));
    }
    const [update, setUpdate] = React.useState(false);
    function updateOpen() {
        setUpdate(true);
    }
    function handeleupdateClose() {
        setUpdate(false);
    }
    function handleupdate() {
      let updatedToDos = ToDos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, title: title, details: details };
        }
        return item;
      });
      setToDos(updatedToDos);
      localStorage.setItem("todos", JSON.stringify(updatedToDos));
      setUpdate(false);
    }
    useEffect(() => {
      const storedTodos = localStorage.getItem("todos") ?? "[]";
        setToDos(JSON.parse(storedTodos));
    },[]);
    return (
        <Card className="todoCard" sx={{ minWidth:460 ,backgroundColor: '#e0f7fa' ,marginTop: '20px' ,background:'#3934b9ff', color: 'white'}}>
      <CardContent>
        {/* delete dialog */}
      <Dialog dir='rtl'
        open={deleteOpen}
        onClose={handeleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل  انت متاكد من حذف هذه المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكن التراجع عن هذا الإجراء.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handeleDeleteconfirm}>تاكيد الحذف</Button>
          <Button color="error" autoFocus onClick={handeleClose}>
            الغاء
          </Button>
        </DialogActions>
      </Dialog>
        {/* delete dialog */}


        {/* update dialog */}
        <Dialog
          PaperProps={{
    style: {
      width: '90%',
      maxWidth: '430px',
      padding: '20px',
      borderRadius: '12px',
    },
  }}
        dir='rtl'
        open={update}
        onClose={handeleupdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="عنوان المهمة"
              fullWidth
              variant="standard"
            />
        <TextField
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="التفاصيل"
              fullWidth
              variant="standard"
            />
        <DialogActions>
          <Button onClick={handeleupdateClose} color="error">إلغاء</Button>
          <Button onClick={handleupdate} color="primary">تعديل</Button>
        </DialogActions>
      </Dialog>
        {/* update dialog */}


<Grid container spacing={2} style={{ textAlign: 'lfet' ,dispay: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Grid item xs={8}>
    <Typography variant='h5' style={{ textDecoration: todo.isCompleted ? "line-through" : "none" , textAlign: 'right' }}>
      {todo.title}
    </Typography>
    <Typography variant="h6" sx={{ textAlign: "right" }}>
      {todo.details} 
    </Typography>
  </Grid>

  <Grid item xs={4} style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
    <IconButton onClick={() => {
        handeleComplete();
    }}
      aria-label="done"
      style={{
        backgroundColor: todo.isCompleted ? "#8bc34a" : "white",
        color: todo.isCompleted ? "white" : "#8bc34a",
        border: "solid #8bc34a 3px",
      }}
    >
      <CheckIcon />
    </IconButton>
    <IconButton
    onClick={updateOpen}
      aria-label="edit"
      style={{
        color: "#176aa8",
        background: "white",
        border: "solid #176aa8 3px",
      }}
    >
      <EditIcon />
    </IconButton>
    <IconButton onClick={handeleDelete}
      aria-label="delete"
      style={{
        color: "#b23c17",
        background: "white",
        border: "solid #b23c17 3px",
      }}
    >
      <DeleteIcon />
    </IconButton>
  </Grid>
</Grid>

      </CardContent>
    </Card>
    );
}