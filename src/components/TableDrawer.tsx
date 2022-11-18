import { Drawer } from 'antd';
import { forwardRef, PropsWithoutRef, Ref, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { IBrand, IDataType } from '../constant/interface';

function TableDrawer(props: PropsWithoutRef<any>, ref: Ref<any>) {
	const [open, setOpen] = useState(false);
	const [drwwerObj, setDrwwerObj] = useState<IDataType>();

	const stateDrawer = (state: boolean) => {
		setOpen(state);
	}

	useMemo(() => {
		setDrwwerObj(props.visObj);
	}, [open])

	const onSubmit = useCallback(() => {
		stateDrawer(true);
	}, []);

	useImperativeHandle(ref, () => ({
		onSubmit: () => {
			onSubmit();
		},
	}), [onSubmit]);

	function inputBrand(valueIn: IBrand, index: React.Key) {
		return (
			<div >
				<label>Car: </label><span>{valueIn.brand}</span>
			</div>
		)
	};

	return (
		<div>
			<Drawer title="Basic Drawer" placement="right" onClose={() => stateDrawer(false)} open={open}>
				<label>First name</label><p>{drwwerObj?.firstName}</p>
				<label>Second name</label><p>{drwwerObj?.secondName}</p>
				<label>Last name</label><p>{drwwerObj?.lastName}</p>
				{drwwerObj?.cars?.map((value, index) => (
					inputBrand(value, index)
				))}
			</Drawer>
		</div>
	);
};

export default forwardRef(TableDrawer);