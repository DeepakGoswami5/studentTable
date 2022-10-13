import { Button, Form, Input } from "antd";
import React from "react";
const AddUpdateStudent = (selectedRow) => {
    const handleSubmit = (val) => {
        // if uniqueId is already there, then we update the details
        if (selectedRow.id) {
            async function updateStudent() {
                const response = await fetch('https://my.api.mockaroo.com/users_create?key=501dfe20&__method=PUT', {
                    method: 'POST',
                });
                const responseData = await response.json();
                return responseData
            }
            updateStudent()
        } 
        // else we add new student
        else {
            async function createStudent() {
                const response = await fetch('https://my.api.mockaroo.com/users_create?key=501dfe20&__method=POST', {
                    method: 'POST',
                });
                const responseData = await response.json();
                return responseData
            }
            createStudent()
        }
    }
    return (
        <div>
            {/* form component to collect student details */}
            <Form
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Roll Number"
                    name="roll_number"
                    initialValue={selectedRow?.data?.roll_number}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="First Name"
                    name="first_name"
                    initialValue={selectedRow?.data?.first_name}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="last_name"
                    initialValue={selectedRow?.data?.last_name}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    initialValue={selectedRow?.data?.email}
                >
                    <Input />
                </Form.Item>

                {/* submit button on completing the form */}
                <Form.Item
                >
                    <Button htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default AddUpdateStudent