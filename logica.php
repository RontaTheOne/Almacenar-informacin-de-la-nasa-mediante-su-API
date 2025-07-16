<?php

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        //CAPTURA DE DATOS
        $title = $_POST['title'];
        $date = $_POST['date'];
        $explanation = $_POST['explanation'];
        $url = $_POST['url'];
        //CONEXION BD
         $mysqli = new mysqli("localhost", "root", "", "nasa");
    
        if ($mysqli->connect_error) {
            die("Error de conexión a la base de datos: " . $mysqli->connect_error);
        }
    
        $stmt = $mysqli->prepare("INSERT INTO evento (ID, Titulo, Fecha, Descripcion, Direccion) VALUES (?, ?, ?, ?, ?)");

        // Supongamos que ID es un entero, ajusta el tipo según el tipo de dato real de ID.
        $stmt = $mysqli->prepare("INSERT INTO evento (Titulo, Fecha, Descripcion, Direccion) VALUES (?, ?, ?, ?)");

        // Supongamos que $title, $date, $explanation, y $url son las variables con los valores que deseas insertar.
        $stmt->bind_param("ssss", $title, $date, $explanation, $url);
        $stmt->execute();
        $stmt->close();

        $mysqli->close();
        echo json_encode(['success' => true]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Solicitud incorrecta']);
    }
?>