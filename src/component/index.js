import React, { useEffect, useState } from "react";
import { Button, PageHeader, Table, Modal, Popconfirm, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddUpdateStudent from "./addUpdateStudent"
const StudentTable = () => {
    const [studentData, setStudentData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isStudentFromVisible, setIsStudentFromVisible] = useState(false)
    const [formType, setFormType] = useState('update');
    const [selectedRow, setSelectedRow] = useState(null);
    const openForm = (type, row) => {
        setFormType(type);
        setSelectedRow(row);
        setIsStudentFromVisible(true)
    };

    useEffect(() => {
        getAllStudent()
    },[])

    // function to call get all student details
    async function getAllStudent() {
        const response = await fetch('https://my.api.mockaroo.com/users?key=501dfe20', {
            method: 'GET',
        });
        const responseData = await response.json();
        if(!response.ok){
            setLoading(false)
            message.error("something went wrong")
            return 
        }else{
            setLoading(false)
            setStudentData(responseData)
            return responseData || []
        }
    }

    const onCancel = () => {
        setIsStudentFromVisible(false);
    };
    const onDelete = () => {
        // will pass uniqueId to delete from backend
        const response = fetch('https://my.api.mockaroo.com/users/delete/id?key=501dfe20&__method=DELETE', {
            method: 'DELETE',
        });
    }
    const forms = {
        update: {
            component: 
            <AddUpdateStudent
                data={selectedRow}
            />,
            title: `Update Student Detail`,
            width: 1080,

        },
        add: {
            component: 
            <AddUpdateStudent
                data={selectedRow}
            />,
            title: `Add Student`,
            width: 1080,
        },
    };
    const columns = [
        {
            title: 'Roll Number',
            dataIndex: 'roll_number',
            key: 'roll_number',
            width: 200,
        },
        {
            title: 'Class',
            dataIndex: 'standard',
            key: 'standard',
            width: 200,
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
            width: 100,
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
            width: 100,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 200,
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            width: 200,
        },
        {
            title: 'Operations',
            dataIndex: '',
            key: 'operations',
            render: (row) => <>
                <Button onClick={() => openForm('update', row)}>
                    <EditOutlined />
                </Button>
                <Popconfirm 
                    placement="topLeft" 
                    title={'Are you sure to delete this student?'} 
                    onConfirm={onDelete} 
                    okText="Yes" 
                    cancelText="No"
                >
                    <Button><DeleteOutlined /></Button>
                </Popconfirm>
            </>
        },
    ];
    return (
        <div style={{margin:'10px'}}>
            {/* Header component */}
            <PageHeader title={`Student Data`} extra={[
                <Button
                    onClick={() => setIsStudentFromVisible(true)}
                >
                    Add Student
                </Button>
            ]} />

            {/* table to show student data */}
            <Table
                columns={columns}
                dataSource={studentData}
                loading={loading}
            />
            {/* pop up modal to add and upadte student data */}
            <Modal
                visible={isStudentFromVisible}
                title={forms[formType].title}
                onCancel={onCancel}
                footer={false}
            >
                {forms[formType].component}
            </Modal>
        </div>
    )
}
export default StudentTable