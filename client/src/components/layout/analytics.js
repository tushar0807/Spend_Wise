import { Progress } from 'antd';
import React from 'react'

const Analytics = ({alltransaction}) =>{
    //category
    const categories = ["salary","tip","project","food","bills","movie","fees"]

    //turnover
    const totalturnover = alltransaction.reduce(
        (acc,transaction) => acc + transaction.amount,0
    );
    
    const totalincometurnover = alltransaction.filter(
        (transaction) => transaction.type==='income').reduce(
            (acc,transaction) => acc+transaction.amount,0
    );
    
    const totalexpenseturnover = alltransaction.filter((transaction) => transaction.type==='expense').reduce(
        (acc,transaction) => acc+transaction.amount,0
    );

    return (
        <div className='row mx-1  '>
            <div className='col-md-4 my-2 mx-5' >
                <h4>CategoryWise Income</h4>
                {
                    categories.map(category =>{
                        const amount = alltransaction
                        .filter(
                            (transaction) => 
                            transaction.type==='income' && transaction.category=== category)
                        .reduce(
                            (acc,transaction) => acc+transaction.amount,0)
                        return (
                            amount > 0 && (
                            <div className='card'>
                                <div className='card-body'>
                                    <h5>{category}</h5>
                                    <Progress 
                                    percent = {((amount/totalincometurnover)*100).toFixed(0)} />
                                </div>
                            </div>
                            )
                        )
                    })
                }
            </div>
            <div className='col-md-4 mx-5 my-2'>
                <h4>CategoryWise Expense</h4>
                {
                    categories.map(category =>{
                        const amount = alltransaction
                        .filter(
                            (transaction) => 
                            transaction.type==='expense' && transaction.category=== category)
                        .reduce(
                            (acc,transaction) => acc+transaction.amount,0)
                        return (
                            amount > 0 && (
                            <div className='card'>
                                <div className='card-body'>
                                    <h5>{category}</h5>
                                    <Progress 
                                    percent = {((amount/totalexpenseturnover)*100).toFixed(0)} />
                                </div>
                            </div>
                            )
                        )
                    })
                }
            </div>
        </div> 
    )
};

export default Analytics;