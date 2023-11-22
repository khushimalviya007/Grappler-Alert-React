import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Project = () => {

    const { id } = useParams();
    // let project;
    const [project, setProject] = useState();
    const fetchProject = async () => {
        try {
            const response = await axios.get(`http://localhost:8283/projects/${id}`);
            const data = response.data.response;
            console.log("helllllllooo", data);
            setProject(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchProject();
    }, []);
    return (
        <div>
            <Table striped bordered hover variant="hover" className="custom-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Project name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{project?.id}</td>
                        <td>{project?.name}</td>
                    </tr>
                </tbody>

            </Table>

        </div>
    )
}

export default Project
