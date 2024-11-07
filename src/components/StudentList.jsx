import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5197/api/student');
        const data = await response.json();
        console.log(data);
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Lista de Estudiantes</h1>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Laboratorio</th>
            <th>Biografía</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentCode}>
              <td>{student.studentCode}</td>
              <td>{student.phone}</td>
              <td>{student.status}</td>
              <td>{student.lab}</td>
              <td>{student.biography}</td>
              <td>
                {/* Navegar a la página de habilidades */}
                <Link to={`/skills/${student.studentCode}`}>
                  Ver Habilidades
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
