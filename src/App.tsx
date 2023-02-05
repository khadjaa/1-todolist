import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

const shapka1 = 'What to learn-11111111111'

// const data1= {
//     title: "What to do",
//     tasks: [
//         {taskId: 1, title: "HTML&CSS2", isDone: true},
//         {taskId: 2, title: "JS2", isDone: true}
//     ],
//     students: [
//         'Jago Wormald1',
//         'Saul Milne2',
//         'Aariz Hester3',
//         'Dion Reeve4',
//         'Anisa Ortega5',
//         'Blade Cisneros6',
//         'Malaikah Phelps7',
//         'Zeeshan Gallagher8',
//         'Isobella Vo9',
//         'Rizwan Mathis10',
//         'Menaal Leach11',
//         'Kian Walton12',
//         'Orion Lamb13',
//         'Faizah Huynh14',
//         'Crystal Vaughan15',
//         'Vivien Hickman16',
//         'Stuart Lu17',
//         'Karol Davison18',
//         'Dario Burns19',
//         'Chloe Rich20',
//         'Martyna Felix',
//         'Nida Glass',
//         'Maeve Miles',
//         'Hasnain Puckett',
//         'Ayman Cano',
//         'Safwan Perry',
//         'Fox Kelly',
//         'Louise Barlow',
//         'Malaki Mcgill',
//         'Leanna Cline',
//         'Willard Hodge',
//         'Amelia Dorsey',
//         'Kiah Porter',
//         'Jeanne Daly',
//         'Mohsin Armstrong',
//         'Laurie Rangel',
//         'Princess Tierney',
//         'Kasim Kendall',
//         'Darryl Cope',
//         'Elysha Ray',
//         'Liyana Harris',
//         'Kashif Blackburn',
//         'Atif Zimmerman',
//         'Sila Hartley',
//         'Ralphie Hebert',
//     ]
// }
// const data2 = {
//     title: "What to learn",
//     tasks: [
//         {taskId: 1, title: "HTML&CSS", isDone: true},
//         {taskId: 2, title: "JS", isDone: true}
//     ],
//     students: [
//         'Rick Kane',
//         'Finnlay Bentley',
//         'Samia North',
//         'Isaac Morton',
//         'Lily-Ann Clifford',
//         'Thalia Park',
//         'Sapphire Cruz',
//         'Cieran Vazquez',
//         'Anya Estes',
//         'Dominika Field',
//         'Rosanna Chung',
//         'Safiyah Davey',
//         'Ryley Beasley',
//         'Kalvin Trejo',
//         'Evie-Mae Farrell',
//         'Juliet Valencia',
//         'Astrid Austin',
//         'Lyle Montgomery',
//         'Nisha Mora',
//         'Kylie Callaghan',
//         'Star Wilks',
//         'Marissa Colley',
//         'Asa Fuller',
//         'Leigh Kemp',
//         'Avleen Dawson',
//         'Sammy Bonilla',
//         'Acacia Becker',
//         'Coral Shepherd',
//         'Melina Molina',
//         'Kiran Bailey',
//         'Clara Escobar',
//         'Alexandru Horn',
//         'Brandon-Lee Mercado',
//         'Elouise Weston',
//         'King Long',
//         'Kerri Searle',
//         'Kanye Hamer',
//         'Elwood Benitez',
//         'Mikail Whitaker',
//         'Bobby Hardy',
//         'Talha Ferry',
//         'Priscilla Landry',
//         'Olivia-Grace Cain',
//         'Kiaan Wallace',
//         'Wesley Padilla90',
//         'Ella-Grace Wooten91',
//         'Kaif Molloy92',
//         'Kamal Broadhurst93',
//         'Bianca Ferrell94',
//         'Micheal Talbot95',
//     ]
// }

function App() {

    let [tasks1, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Rest API", isDone: false},
        {id: 5, title: "GraphQL", isDone: false},
    ])

    function removeTask(id: number) {
        let filteredTasks = tasks1.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist shapka={shapka1}
                      tasks={tasks1}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
