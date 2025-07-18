
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import base_url from '../config/config';
import { Link } from 'react-router-dom';

const FormList = () => {
    const [data, setData] = useState(null);

    const fetchData = () => {
        axios.get(`${base_url}/api/form`)
            .then((res) => {
                if (res.data.length > 0) {
                    setData(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const localDateTime =(isoString) => new Date(isoString).toLocaleString();
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <section className='py-25 min-h-screen bg-black/20'>
            <div className="relative sm:rounded-lg w-1/2 mx-auto">
                <div className='flex justify-end my-4'>
                    <Link to='/form-data' className='btn px-5 py-2 bg-black text-white rounded-xl '>Add Data</Link>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-md ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Full Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Message
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item) => (
                            <tr key={item.id} className="odd:bg-white  even:bg-gray-50  border-b  border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                                   {item.fullName}
                                </th>
                                <td className="px-6 py-4">
                                    {item.email}
                                </td>
                                <td className="px-6 py-4">
                                    { item.message?.length > 100 ? item.message.slice(0, 100) + '...' : item.message}
                                </td>
                                <td className="px-6 py-4">
                                    {localDateTime(item.createdAt)}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </section>
    )
}

export default React.memo(FormList);