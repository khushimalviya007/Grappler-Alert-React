import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
const Project = () => {
   
    const { id } = useParams();
    const [ticket, setTicket] = useState();
    const fetchTicket = async() => {
        try {
            const response = await axios.get(`http://localhost:8283/tickets/${id}`);
            const data=response.data.response;
            console.log("helllllllooo", data);
            setTicket(data);
            console.log(ticket)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchTicket();
    },[]);
    const renderTicketRow = () => {
        return (
            <tr>
                <td>{ticket?.name}</td>
                <td>{ticket?.assignedBy ? ticket?.assignedBy?.name : 'N/A'}</td>
                <td>{ticket?.assignees?.length > 0 ? ticket?.assignees?.map(assignee => assignee.name).join(', ') : 'None'}</td>
                <td>{ticket?.creationDate}</td>
                <td>{ticket?.project ? ticket?.project?.name : 'N/A'}</td>
                <td>{ticket?.stage}</td>
            </tr>
        );
    };
    return (
        <div>
            <Table striped bordered hover variant="hover" className="custom-table">
                <thead>
                    <tr>
                        <th>Ticket name</th>
                        <th>assignedBy</th>
                        <th>assignees</th>
                        <th>creationDate</th>
                        <th>project name</th>
                        <th>stage</th>
                    </tr>
                </thead>
                <tbody>
                {renderTicketRow()}

                </tbody>
            </Table>

        </div>
    )
}

export default Project
