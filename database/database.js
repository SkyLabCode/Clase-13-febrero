import sqlite3 from 'sqlite3';

//1. Creamos la BDD. Nos conectamos a ella
const db = new sqlite3.Database('./tasks_db.db', (error) =>{
    if(error){
        console.log('Error en la conexión con la BDD');
    }else{
        console.log('Conexión a la BDD realizada con éxito');
        //Crea la tabla tasks si no existe todavía:
        db.run(`
            CREATE TABLE IF NOT EXISTS tasks(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT,
            completed INTEGER DEFAULT 0
            )
        `)
    }
})

export default db;
