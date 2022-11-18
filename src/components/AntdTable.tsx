import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import 'antd/dist/antd.css';
import '../css/AntdTable.css';
import { Popconfirm, Table, Button } from 'antd';
import Windows from './Windows'
import TableDrawer from './TableDrawer';
import { IDataType, IDataMocky } from '../constant/interface';
import { deleteState, addMasState } from '../redux/features/dataSlice';

const AntdTable: React.FC = () => {
	const dataSource: IDataType[] = useSelector((store: AnyAction) => store.data);
	const dispatch = useDispatch();
	const [pageSize, setPageSize] = useState<number>(0);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const url = "https://run.mocky.io/v3/9d43b694-be6f-44d2-a585-004e9616ef0a";
	const childCompWWindow = useRef<any>(null);
	const childCompWDrowed = useRef<any>(null);
	const [fetchSource, setFetchSource] = useState<IDataType[]>([]);
	const [visObj, setVisObj] = useState<IDataType>(
		{
			key: 0,
			firstName: 'q',
			secondName: 'q',
			lastName: 'q',
		}
	);

	useMemo(() => {
		fetch(url)
			.then((response: any) => response.json())
			.then((responseData: IDataMocky) => {
				setIsLoaded(true);
				setPageSize(responseData.pagination);
				setFetchSource(responseData.dataSource);
			})
			.catch((error) => {
				setIsLoaded(true);
				setError(error);
			});
	}, []);

	useEffect(() => {
		dispatch(addMasState(fetchSource));
	}, [fetchSource]);

	const [editObject, setEitObject] = useState<IDataType>(
		{
			key: 0,
			firstName: 'q',
			secondName: 'q',
			lastName: 'q',
		}
	);

	const handleEdit = (key: React.Key) => {
		const newDataEdit = dataSource.filter(item => item.key === key);
		setEitObject(newDataEdit[0]);
		childCompWWindow.current?.onSubmit(editObject);
	};

	const columns = [
		{
			title: 'Fist name',
			dataIndex: 'firstName',
			width: '30%',
		},
		{
			title: 'Second name',
			dataIndex: 'secondName',
		},
		{
			title: 'Last name',
			dataIndex: 'lastName',
		},
		{
			title: 'operation',
			dataIndex: 'operation',
			render: (_: any, record: { key: React.Key }) =>
				dataSource.length >= 1 ? (
					<div className='operation'>
						<Button>
							<Popconfirm title="Sure to delete?" onConfirm={() => dispatch(deleteState(record.key))}>
								<a>Delete</a>
							</Popconfirm>
						</Button>
						<Button onClick={() => handleEdit(record.key)}>
							Edit
						</Button>
					</div>
				) : null,
		},
	];

	function fetchPost() {
		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dataSource),
		})
			.then((data) => {
				console.log('Success:', data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	if (error) {
		return <div>Error: {error}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<div>
				<Table
					rowClassName={() => 'editable-row'}
					dataSource={dataSource}
					onRow={(record) => {
						return {
							onDoubleClick: event => {
								setVisObj(record);
								childCompWDrowed.current?.onSubmit();
							},
						};
					}}
					columns={columns}
					pagination={
						{
							pageSize: pageSize
						}
					}
				/>
				<div className='button__box'>
					<Windows
						editObject={editObject}
						ref={childCompWWindow}
					/>
					<TableDrawer
						visObj={visObj}
						ref={childCompWDrowed}
					/>
					<Button onClick={(e) => (fetchPost())}>To send</Button>
				</div>
			</div >
		);
	}
};

export default AntdTable;