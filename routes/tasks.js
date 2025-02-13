import express from 'express';
import db from '../database/database.js';

//Creamos una instancia de Router();

const router = express.Router();

//Creamos un método para insertar tareas en al bdd. Las
//tareas las obtenemos del cliente (index.html)

//Método POST (Recibo los datos)
//request: a través de este parámetro obtenemos los datos
//response: a través de response servimos una respuesta al cliente
router.post('/', (req, res) =>{
    //1. Recogemos los datos:
    console.log(req.body);
    const {description} = req.body;
    //2. Insertamos el dato en la bdd:
    db.run(`INSERT INTO tasks (description) VALUES (?)`, [description],
    function (error){
        if(error){
            res.status(500).json({error: "Fallo al insertar la tarea"})
        }
        res.status(200).json({message: "Tarea insertada correctamente"})
    })
})


//Petición para obtener todas las tareas de la BDD:
router.get('/', (req, res) => {
    db.all('SELECT * FROM tasks ORDER BY id DESC', [], (error, rows) =>{
        if(error){
            console.log(error);
            res.status(500).json({error: "Error al obtener los datos"});
            return;
        }
        res.json(rows);
    })
})

//Función para eliminar una tarea por su id
router.delete('/:id', (req, res) =>{
    //1. Obtenemos el id enviado por el cliente:
    const id = req.params.id;

    //2. Consulta para eliminar la tarea:
    db.run('DELETE FROM tasks WHERE id = ?', [id], function(error){
        if(error){
            res.status(500).json({message: "Error al eliminar la tarea"});
            return;
        }
        res.status(200).json({message: "Tarea eliminada correctamente"});
    })
})



export default router;