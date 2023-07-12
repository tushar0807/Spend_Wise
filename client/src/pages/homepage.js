import React ,{useState,useEffect} from "react"
import {Modal,Form,Select,Input, message, Table} from 'antd'
import {UnorderedListOutlined,AreaChartOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons'
import Layout from "./../components/layout/layout"
import axios from 'axios'
import moment from 'moment'
import Analytics from "../components/layout/analytics"

const HomePage = () => { 
const [showModal,setShowModal] = useState(false);
const [alltransaction,setalltransaction] = useState([]);
const [editable,seteditable]=useState(null);
const [type,setType] = useState('all');
const [viewdata,setviewdata] = useState('table');

//table data
const columns=[
    {
        title:'Date',
        dataIndex:'date',
        render:(text)=><span>{moment(text).format("DD-MM-YYYY")} </span>,
        sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix()
    },
    {
        title:'Amount',
        dataIndex:'amount'
    },
    {
        title:'Type',
        dataIndex:'type'
    },
    {
        title:'Category',
        dataIndex:'category'
    },
    {
        title:'Refrence',
        dataIndex:'refrence'
    },
    {
        title:'Actions',
        render: (text,record) =>(
            <div>
                <EditOutlined onClick={()=>{
                    seteditable(record);
                    setShowModal(true)
                }}/>
                <DeleteOutlined className="mx-2" onClick={()=>{
                    handleDelete(record)
                }}/>
            </div>
        )
    }
]



useEffect(()=>{
    const getAllTransaction =async()=>{
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const res = await axios.post('/transactions/get-transaction',{
                userid:user._id,
                type
            })
            const sortedData = res.data.sort((a, b) => moment(a.date).unix() - moment(b.date).unix());
            setalltransaction(sortedData);
            console.log(res.data)
        } catch (error) {
            console.log(error)
            message.error("issue with transaction")
        }
    }
    getAllTransaction();
},[type])

//delete handler
const handleDelete=async (record)=>{
    try {
        await axios.post('/transactions/delete-transaction',{transactionId:record._id})
        message.success('transaction deleted successfully')
        window.location.reload();
    } catch (error) {
        console.log(error)
        message.error('deletion failed')
    }
}

const handleSubmit = async(values)=>{
    try {
        const user=JSON.parse(localStorage.getItem('user'))
        if (editable) {
            await axios.post('/transactions/edit-transaction',{
                payload:{
                    ...values,
                    userId:user.id
                },
                transactionId: editable._id
            })
        message.success("transaction updated succuessfully")
        
        } else {
            await axios.post('/transactions/add-transaction',{...values,userid:user._id})
            message.success("transaction added succuessfully")
        
        }
        window.location.reload();
        seteditable(null)
    } catch (error) {
        message.error("failed to add transaction")
    }
}

    return(
        <Layout>
            <div className="filters">
                <div className="mx-5">
                    <h6>Select Type</h6>
                    <Select value={type} onChange={(values) => setType(values)}>
                        <Select.Option value='all'>ALL</Select.Option>
                        <Select.Option value='income'>Income</Select.Option>
                        <Select.Option value='expense'>Expense</Select.Option>
                    </Select>
                </div>
                
                <div className="center-button">
                    <button className="btn btn-primary"
                        onClick={()=>setShowModal(true)}
                    >
                        Add New
                    </button>
                </div>
                <div className="mx-5">
                    <UnorderedListOutlined className={`mx-2 ${viewdata === 'table' ? 'active-icon' : 'inactive-icon'}`} 
                    onClick={() => setviewdata('table')}
                    />
                    <AreaChartOutlined className={`mx-2 ${viewdata === 'analytics' ? 'active-icon' : 'inactive-icon'}`} 
                    onClick={() => setviewdata('analytics')}/>
                </div>
            </div>

            <div className="content">
                {viewdata=== 'table' ? <Table columns={columns} dataSource={alltransaction} pagination={false}/>
                : <Analytics alltransaction={alltransaction}/>
                }
                
            </div>
            <Modal

                title={editable ? 'Edit Transaction' : 'Add Transaction'}
                open ={showModal}

                onCancel={() => setShowModal(false)}

                footer={false}
            >
                <Form layout="vertical" onFinish ={handleSubmit} initialValues={editable}>

                <Form.Item label="Amount" name="amount"> 
                <Input type="text" />
                </Form.Item> 
                <Form.Item label="type" name="type">
                     <Select>

                <Select.Option value="income">Income</Select.Option>
                 <Select.Option value="expense">Expense</Select.Option>

                </Select>

                </Form.Item>

                    <Form.Item label="Category" name="category">
                    <Select>

                    <Select.Option value="salary">Salary</Select.Option> 
                    <Select.Option value="tip">Tip</Select.Option>
                    <Select.Option value="project">Project</Select.Option>
                    <Select.Option value="food">Food</Select.Option>
                    <Select.Option value="bills">Bills</Select.Option>
                    <Select.Option value="movie">Movie</Select.Option>
                    <Select.Option value="fees">Fees</Select.Option>
                    </Select>

                </Form.Item>

                <Form.Item label="Date" name="date">
                    <Input type="date" />
                    </Form.Item>
                    <Form.Item label="Refrence" name="refrence">
                    <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                         <Input type="text" />
                    
                    </Form.Item>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary"> 
                        SAVE
                        </button>
                    </div>

                </Form>
            </Modal>
        </Layout>

    );
};


export default HomePage;