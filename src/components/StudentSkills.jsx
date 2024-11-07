import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentSkills = () => {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState({ skill1: '' });
    const [updateSkillId, setUpdateSkillId] = useState(null);
    const [updateSkill, setUpdateSkill] = useState({ skill1: '' });
    const { studentCode } = useParams(); // Cambiado de code a studentCode

    useEffect(() => {
        fetchSkills();
    }, [studentCode]); // Dependiendo de studentCode para volver a ejecutar el efecto si cambia

    const fetchSkills = async () => {
        try {
            const response = await axios.get(`http://localhost:5197/api/student/skills?code=${studentCode}`);
            if (Array.isArray(response.data)) {
                setSkills(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
                setSkills([]); // O establece en un array vacío si no es un array
            }
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };

    const handleAddSkill = async () => {
        try {
            const response = await axios.post('http://localhost:5197/api/student/skills', { 
                code: studentCode, 
                skilldesc: newSkill.skill1 // Enviar como skilldesc
            });
            if (response.status === 204) {
                console.log('Skill added successfully');
                fetchSkills(); // Actualiza la lista de habilidades
                setNewSkill({ skill1: '' }); // Limpiar el formulario después de agregar
            }
        } catch (error) {
            console.error('Error adding skill:', error);
        }
    };

    const handleUpdateSkill = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5197/api/student/skills/${id}`, { 
                code: studentCode, 
                skilldesc: updateSkill.skill1 // Enviar como skilldesc
            });
            if (response.status === 204) {
                console.log('Skill updated successfully');
                fetchSkills(); // Actualiza la lista de habilidades
                setUpdateSkillId(null); // Limpiar el ID de actualización después de actualizar
            }
        } catch (error) {
            console.error('Error updating skill:', error);
        }
    };

    const handleDeleteSkill = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5197/api/student/skills/${studentCode}/${id}`);
            if (response.status === 204) {
                console.log('Skill deleted successfully');
                fetchSkills(); // Actualiza la lista de habilidades
            }
        } catch (error) {
            console.error('Error deleting skill:', error);
        }
    };

    const handleSkillChange = (e) => {
        setNewSkill({ ...newSkill, [e.target.name]: e.target.value });
    };

    const handleUpdateSkillChange = (e) => {
        setUpdateSkill({ ...updateSkill, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Student Skills</h2>

            {/* Formulario para agregar habilidades */}
            <div>
                <h3>Add Skill</h3>
                <input
                    type="text"
                    name="skill1"
                    placeholder="Skill Description"
                    value={newSkill.skill1}
                    onChange={handleSkillChange}
                />
                <button onClick={handleAddSkill}>Add Skill</button>
            </div>

            {/* Lista de habilidades */}
            <h3>Current Skills</h3>
            <ul>
                {skills.map(skill => (
                    <li key={skill.id}>
                        {skill.skill1}
                        <button onClick={() => {
                            setUpdateSkillId(skill.id);
                            setUpdateSkill({ skill1: skill.skill1 }); // Usar skill1 para la actualización
                        }}>
                            Edit
                        </button>
                        <button onClick={() => handleDeleteSkill(skill.id)}>Delete</button> {/* Botón de eliminar */}
                    </li>
                ))}
            </ul>

            {/* Formulario para actualizar habilidades */}
            {updateSkillId && (
                <div>
                    <h3>Update Skill</h3>
                    <input
                        type="text"
                        name="skill1"
                        placeholder="Skill Description"
                        value={updateSkill.skill1}
                        onChange={handleUpdateSkillChange}
                    />
                    <button onClick={() => handleUpdateSkill(updateSkillId)}>Update Skill</button>
                    <button onClick={() => setUpdateSkillId(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default StudentSkills;
