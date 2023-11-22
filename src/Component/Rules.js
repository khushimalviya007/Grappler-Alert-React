import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
const options2 = [
  { value: 'Email', label: 'Email' },
  { value: 'In_app', label: 'In_app' },
  { value: 'SMS', label: 'SMS' },
];
const options3 = [
  { value: 'Notification', label: 'Notification' },
  { value: 'Alert', label: 'Alert' },
];
function Rules() {
  const nevigate = useNavigate();
  const [recepientDescription, setRecepientDescription] = useState([
    { value: 'Assigne_To', label: 'Assigne To' },
    { value: 'Assigned_By', label: 'Assigned By' },
    { value: 'Both', label: 'Both' }
  ])
  const [options, setOptions] = useState([]);
  const [trigger1, setTrigger1] = useState([]);
  const [trigger2, setTrigger2] = useState([]);
  const [trigger3, setTrigger3] = useState([]);
  const [ruleObject, setRuleObject] = useState([])
  const [selectedEntity, setSelectedEntity] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedTriggerCondition, setSelectedTriggerCondition] = useState('');

  const entity = [...new Set(ruleObject.map((item) => item.entity))];
  const field = [...new Set(ruleObject.filter((item) => item.entity === selectedEntity).map((item) => item.field))];
  const triggerCondition = [...new Set(ruleObject.filter((item) => item.entity === selectedEntity && item.field === selectedField).map((item) => item.triggerCondition))];

  const handleRecipientChange = (selectedOptions) => {
    const bothSelected = selectedOptions.some(option => option.value === 'Both');
    const assignedToSelected = selectedOptions.some(option => option.value === 'Assigne To');
    const assignedBySelected = selectedOptions.some(option => option.value === 'Assigned By');
    // Create a new array to store the updated selected options
    let newSelectedOptions = [];
    if (bothSelected) {
      // If 'Both' is selected, remove 'Assigned To' and 'Assigned By'
      newSelectedOptions = selectedOptions.filter(option =>
        option.value === 'Both' || option.value !== 'Assigne To' && option.value !== 'Assigned By'
      );
    } else if (assignedToSelected && assignedBySelected) {
      // If both 'Assigned To' and 'Assigned By' are selected, remove them and add 'Both'
      newSelectedOptions = [{ value: 'Both', label: 'Both' }];
    } else {
      // If any other option is selected, keep it in the array
      newSelectedOptions = selectedOptions;
    }
    setSelectedValues1(newSelectedOptions);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8283/projects');
        const data = response.data.response.map(project => ({ value: project.name, label: project.name }));
        const dataWithGlobal = [{ value: 'global', label: 'Global' }, ...data];
        console.log(dataWithGlobal);
        setOptions(dataWithGlobal);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8283/users');
      const data = response.data.response.map(users => ({ value: users.id, label: users.name }));
      console.log(data);
      const recepients = [...recepientDescription, ...data];
      setRecepientDescription(recepients)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchTriggers = async () => {
    try {
      const response = await axios.get('http://localhost:8283/triggerOptions');
      const data1 = response.data.response.map(trigger => ({ value: trigger.entity, label: trigger.entity }));
      const data2 = response.data.response.map(trigger => ({ value: trigger.field, label: trigger.field }));
      const data3 = response.data.response.map(trigger => ({ value: trigger.triggerCondition, label: trigger.triggerCondition }));
      const uniqueTrigger1 = [...new Set(data1.map((item) => item.value))];
      setRuleObject(response.data.response);
      setTrigger1(uniqueTrigger1);
      const uniqueTrigger2 = [...new Set(data2.map((item) => item.value))];
      setTrigger2(uniqueTrigger2);
      setTrigger3(data3.map((item) => item.value));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetchTriggers();
  }, []);

  const daysValue = document.getElementById('days')?.value;
  const hoursValue = document.getElementById('hours')?.value;
  const minutesValue = document.getElementById('minutes')?.value;
  const beforeAfterValue = document.getElementById('beforeAfter')?.value;
  const combinedString = `${daysValue},${hoursValue},${minutesValue},${beforeAfterValue}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    let conditionValue = '';
    if (selectedSource === 'TIME') {
      conditionValue = combinedString;
    }
    else{
      conditionValue=selectedTriggerCondition;;
    }
    const formData = {
      name: name,
      entity: selectedEntity,
      scope: selectedValues.value,
      trigger: selectedSource,
      field: selectedField,
      condition: conditionValue,
      action: selectedValues4,
      description: description,
      severity: selectedSeverity,
      recepient: selectedValues1.map((option) => option.value).join(','),
      channel: selectedValues2.map((option) => option.value).join(','),
    };
    console.log(formData, "khushiii");
    try {
      const response = await axios.post('http://localhost:8283/rules', formData);
      console.log(response);
      nevigate("/users/showrules");
      setSelectedEntity('');
      setSelectedField('');
      setSelectedTriggerCondition('');
      setSelectedValues([]);
      setSelectedSource('');
      setSelectedValues4([]);
      setDescription('');
      setSelectedValues1([]);
      setSelectedValues2([]);
      setSelectedSeverity('High');
      setName('');
    } catch (error) {
      console.log('Error:', error.response.data.message);
      setSelectedEntity('');
      setSelectedField('');
      setSelectedTriggerCondition('');
      setSelectedValues([]);
      setSelectedSource('');
      setSelectedValues4([]);
      setDescription('');
      setSelectedValues1([]);
      setSelectedValues2([]);
      setSelectedSeverity('High');
      setName('');
      setError(error.response.data.message);
    }
  };
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedValues1, setSelectedValues1] = useState([]);
  const [selectedValues2, setSelectedValues2] = useState([]);
  const [selectedValues3, setSelectedValues3] = useState([]);
  const [selectedValues4, setSelectedValues4] = useState([]);
  const [showUserList, setShowUserList] = useState(false);

  const [selectedSource, setSelectedSource] = useState('');

  const handleSourceChange = (e) => {
    setSelectedSource(e.target.value);
  };


  const [description, setDescription] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const [selectedSeverity, setSelectedSeverity] = useState('High');

  const handleSeverityChange = (event) => {
    setSelectedSeverity(event.target.value);
  };

  const handleActionChange = (event) => {
    setSelectedValues4(event.target.value);
  };
  return (
    <>
      <Navbar />
      {error && <div className="alert alert-danger alert-dismissible " role="alert">
        {error}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      }
      <div className='ruleDiv'>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} id="formGridCity">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"
                placeholder='Enter Name'
                value={name} required
                onChange={handleNameChange} />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" id="formGridAddress1">
              <Form.Label>Scope</Form.Label>
              <div>
                <Select
                  options={options} required
                  value={selectedValues}
                  onChange={(selectedOptions) => setSelectedValues(selectedOptions)}
                />
              </div>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3" id="formGridAddress2">
              <Form.Label>Entity</Form.Label>
              <Form.Select
                id="identityDropdown"
                value={selectedEntity} required
                onChange={(e) => setSelectedEntity(e.target.value)}
              >
                <option value="" >Select...</option>
                {entity.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {selectedEntity && (
              <Form.Group as={Col} id="formGridEmail">
                <Form.Label>field</Form.Label>
                <Form.Select
                  id="TriggerDropdown" required
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                >
                  <option value="" >Select...</option>
                  {field.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select></Form.Group>
            )}


            {selectedField && selectedField !== "End Time" && (
              <Form.Group as={Col} id="formGridPassword">
                <Form.Label>Condition</Form.Label>
                <Form.Select
                  id="conditionDropdown"
                  value={selectedTriggerCondition}
                  onChange={(e) => setSelectedTriggerCondition(e.target.value)}
                >
                  <option value="" >Select...</option>
                  {triggerCondition.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select> </Form.Group>
            )}
          </Row>


          <Row>
            <Form.Group as={Col} className="mb-3" id="formGridAddress2">
              <Form.Label>Trigger</Form.Label>
              <Form.Select value={selectedSource} onChange={handleSourceChange} required >
                <option >Select...</option>
                <option value="EVENT">Event</option>
                <option value="TIME">Time</option>
              </Form.Select>
            </Form.Group>

            {selectedSource === 'TIME' && (
              <Form.Group as={Col} id="formGridPassword">
                <Form.Label>Time Selector Test</Form.Label>
                <div style={{ display: 'flex' }}>
                  <input required type="number" id="days" placeholder="Days" min="0" />
                  <input required type="number" id="hours" placeholder="Hours" min="0" max="23" />
                  <input required type="number" id="minutes" placeholder="Minutes" min="0" max="59" />
                  <select required id="beforeAfter">
                    <option value="before">Before</option>
                    <option value="after">After</option>
                  </select>
                </div>
              </Form.Group>
            )}
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} id="formGridPassword">
              <Form.Label>Action</Form.Label>
              <Form.Select required
                id="formGridPassword"
                value={selectedValues4}
                onChange={handleActionChange}
              >
                <option value="">Select...</option>
                {options3.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          <Form.Group as={Col} id="formGridCity">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea"
              rows={3} required
              placeholder='Enter description'
              value={description}
              onChange={handleDescriptionChange} />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} id="formGridZip">
              <Form.Label>Recipient</Form.Label>
              <div>
                <Select
                  isMulti required
                  options={recepientDescription}
                  value={selectedValues1}
                  // onChange={(selectedOptions) => setSelectedValues1(selectedOptions)
                  onChange={(selectedOptions) => handleRecipientChange(selectedOptions)}
                />
              </div>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3" id="formGridAddress2">
              <Form.Label>Channel</Form.Label>
              <div>
                <Select
                  isMulti required
                  options={options2}
                  value={selectedValues2}
                  onChange={(selectedOptions) => setSelectedValues2(selectedOptions)}
                />
              </div>
            </Form.Group>
            <Form.Group as={Col} id="formGridState">
              <Form.Label>Sevearity</Form.Label>
              <Form.Select value={selectedSeverity} required onChange={handleSeverityChange}>
                <option>Select...</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" id="formGridCheckbox">
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="btn btn-lg btn-primary btn-block b"
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
export default Rules;