import './App.css';
import ToDo from './components/ToDoList';
import { TodosContext } from './context/todosContext';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
  const theme = createTheme({
   typography: {
    fontFamily: ["Alexandria"]
       },
       palette: {
        primary: {
          main: '#3934b9ff',
       }
       }
     });
     let id= 0;
     const Initialtodo = [
       {
       id: id++,
         title: "المهمة الأولى",
         details: "التفاصيل الخاصة بالمهمة الأولى",
         isCompleted: false
       },
       {
         id: id++,
         title: "المهمة الثانية",
         details: "التفاصيل الخاصة بالمهمة الثانية",
         isCompleted: false
       },
       {
         id: id++,
         title: "المهمة الثالثة",
         details: "التفاصيل الخاصة بالمهمة الثالثة",
         isCompleted: false
       }
     ];
function App() {
const [ToDos, setToDos] = useState(Initialtodo);

  return (
    <ThemeProvider theme={theme}>
      <div dir='rtl' className="App" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',backgroundColor: '#f0f0f0'}}>
    <TodosContext.Provider value={{ ToDos, setToDos }}>
      <ToDo />
    </TodosContext.Provider>
    </div>
    </ThemeProvider>
  );
}

export default App;
