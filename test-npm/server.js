// Import the filesystem module
/*
const fs = require("fs");
  
let directory_name = "/var/www/html/models";
  
// Function to get current filenames
// in directory
let filenames = fs.readdirSync(directory_name);
console.log("File:", filenames)
*/
let filenames;
const http = require('http');
const fs = require('fs');

const directory_name = '/var/www/html/models';  // Ruta de la carpeta 'models'

// Crear un servidor HTTP
http.createServer((req, res) => {
    // Si la solicitud es para '/archivos', enviar la lista de archivos
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log('hola '+req.url)
    if (req.url === '/') {
      fs.readdir(directory_name, (err, filenames) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error al leer la carpeta');
          return;
        }
  
        // Enviar los nombres de los archivos como JSON
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(filenames));
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Ruta no encontrada');
    }
  }).listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
  });