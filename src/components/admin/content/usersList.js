import { Fragment, useEffect } from "react";
import { useState } from "react";
import { Input, Space } from "antd";
import { Skeleton } from "antd";
import usersApi from "../../../api/user.api";
const { Search } = Input;

const onSearch = values => {
    console.log(values);
};
const Users = () => {
    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const res = await usersApi.getAll();
                setUsersList(res);
            } catch {
                console.error("error");
            }
        };
        fetchUserList();
    }, []);
    return (
        <Fragment>
            <div className="p-20 mr-4">
                <Space direction="vertical">
                    <Search
                        placeholder="Search User"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                        style={{ width: 500 }}
                        className="shadow-2xl box-border md:box-content mb-4"
                    />
                </Space>
                <table className="table  table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Phone</th>
                            <th scope="col">Display Name</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                                          <th scope="row">0909408478</th>
                                          <td>Mark</td>
                                          <td>Otto</td>
                                          <td>@mdo</td>
                                    </tr> */}
                        {usersList.length > 0 ? (
                            usersList.map((users, index) => {
                                return (
                                    <tr className="">
                                        <th scope="row"> {users.phone} </th>
                                        <td>{users.displayname}</td>
                                        <td>{users.username}</td>
                                        <td>{users.email}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <Skeleton width={700} style={{ backgroundColor: "black" }} active />
                        )}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};
export default Users;
