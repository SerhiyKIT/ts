import { Button, Input, Modal } from 'antd';
import React, { useState, useMemo, forwardRef, useImperativeHandle, useCallback, PropsWithoutRef, Ref } from 'react';
import { InputTemplate } from './InputTemplate';
import { IBrand, IDataType } from '../constant/interface';
import { Cars, ModalDirection, ModalType } from '../constant/enum';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { addState, editState } from '../redux/features/dataSlice';
import { AnyAction } from '@reduxjs/toolkit';
import { switchModal } from '../redux/features/modalSlice';
import '../css/Windows.css';
import { CheckSquareTwoTone, CloseOutlined, EditTwoTone, PlusCircleTwoTone } from '@ant-design/icons';

function Windows(props: PropsWithoutRef<any>, ref: Ref<any>) {
	const [modal, setModal] = useState<ModalDirection>(ModalDirection.DEFAULT);
	const [modalFirstName, setModalFirstName] = useState<string>('');
	const [modalSecondName, setModalSecondName] = useState<string>('');
	const [modalLastName, setModalLastName] = useState<string>('');
	const [modalCars, setModalCars] = useState<IBrand[]>([]);
	const addObject = { brand: '' };
	const isModalOpen: boolean = useSelector((store: AnyAction) => store.modal);
	const dispatch = useDispatch();
	const title = (modal === ModalDirection.ADD ? 'Add an object' : 'Editing  an object');

	const personInformationAdd: IDataType = {
		key: (modal === ModalDirection.ADD ? uuid() : props.editObject.key),
		firstName: modalFirstName,
		secondName: modalSecondName,
		lastName: modalLastName,
		cars: modalCars,
	};

	const showModal = () => {
		dispatch(switchModal(ModalType.OPEN_MODAL));
	};

	const handleOk = () => {
		showFunctions(modal, personInformationAdd)
		dispatch(switchModal(ModalType.CLOSED_MODAL));
		nullValue();
		setModal(ModalDirection.DEFAULT);
	};

	const handleCancel = () => {
		dispatch(switchModal(ModalType.CLOSED_MODAL));
		nullValue();
		setModal(ModalDirection.DEFAULT);
	};

	const onSubmit = useCallback(() => {
		showModal();
		local();
		setModal(ModalDirection.EDIT);
	}, []);

	useImperativeHandle(ref, () => ({
		onSubmit: () => {
			onSubmit();
		},
	}), [onSubmit]);

	const addModal = () => {
		setModal(ModalDirection.ADD);
		showModal();
	};

	function local() {
		if (modal === ModalDirection.EDIT) {
			setModalFirstName(props.editObject.firstName);
			setModalSecondName(props.editObject.secondName);
			setModalLastName(props.editObject.lastName);
			setModalCars(props.editObject.cars ? props.editObject.cars : [])
		}
	};

	useMemo(() => {
		local();
	}, [isModalOpen]);

	function nullValue() {
		setModalFirstName('');
		setModalSecondName('');
		setModalLastName('');
		setModalCars([]);
	};

	function showFunctions(modal: ModalDirection, personInformationAdd: IDataType) {
		switch (modal) {
			case ModalDirection.ADD:
				return dispatch(addState(personInformationAdd));
			case ModalDirection.EDIT:
				return dispatch(editState(personInformationAdd));
		}
	};

	const [editObject, setEditObject] = useState<string>('');
	const [switchInput, setSwitchInput] = useState<React.Key>(-1);
	const brandObj: IBrand = {
		brand: editObject
	};

	function editOnClick (type: Cars, value: any, index: number, editObj: IBrand) {((e: any) =>
		(switchInput === index ? editModalCar(type, editObj, index) : editSwitch(index, value)))};

	function editSwitch(index: number, valueInput: string) {
		setSwitchInput(index);
		setEditObject(valueInput);
	};

	function editModalCar(type: Cars, newObject: IBrand, key?: number) {
		switch (type) {
			case Cars.ADD:
				const addItem = [...modalCars, addObject];
				return setModalCars(addItem);
			case Cars.EDIT:
				const editItem: IBrand[] = [];
				modalCars.forEach((item: IBrand, itemIndex) => {
					editItem.push(itemIndex === key ? newObject : item);
				});
				setSwitchInput(-1)
				setEditObject('')
				return setModalCars(editItem);
			case Cars.DELETE:
				const deleteItem: IBrand[] = [];
				modalCars.forEach((item: IBrand, itemIndex) => {
					if (itemIndex !== key)
						deleteItem.push(item);
				});
				setSwitchInput(-1)
				return setModalCars(deleteItem);
		}
	};

	function inputBrand(valueIn: IBrand, index: number) {
		let valueInputBrand = (valueIn.brand === undefined ? '' : valueIn.brand);
		return (
			<div className="input-wrapper">
				<Input
					type='text'
					key={index}
					onChange={(e) => (switchInput === index ? setEditObject(e.target.value) : (e.target.value))}
					value={switchInput === index ? editObject : valueInputBrand}
				/>
				<Button
					icon={switchInput === index ? < CheckSquareTwoTone /> : <EditTwoTone />}
					onClick={() => editOnClick(Cars.EDIT, valueInputBrand, index, brandObj)}
				/>
				<Button
					type="primary" icon={<CloseOutlined />}
					onClick={() => editModalCar(Cars.DELETE, brandObj, index)}
				/>
			</div>
		)
	};

	return (
		<div >
			<Button type="primary" onClick={addModal}>
				Add people
			</Button>
			<Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<div>
					{InputTemplate('First name', setModalFirstName, modalFirstName)}
					{InputTemplate('Second name', setModalSecondName, modalSecondName)}
					{InputTemplate('Last name', setModalLastName, modalLastName)}
				</div>
				<div>
					<Button type="default" icon={<PlusCircleTwoTone />} onClick={() => editModalCar(Cars.ADD, brandObj)}>
						Add brand
					</Button>
					{modalCars?.map((value, index) => (
						inputBrand(value, index)
					))}
				</div>
			</Modal >
		</div >
	);
};

export default forwardRef(Windows);