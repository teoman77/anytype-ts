import * as React from 'react';
import { Popup, Dimmer } from 'ts/component';
import { observer, inject } from 'mobx-react';
import { I } from 'ts/lib';

interface Props {
	history: any;
	commonStore?: any;
};

@inject('commonStore')
@observer
class ListPopup extends React.Component<Props, {}> {

	constructor (props: any) {
		super(props);
		
		this.onClose = this.onClose.bind(this);
	};
	
	render () {
		const { history, commonStore } = this.props;
		const { popups } = commonStore;
		
		return (
			<div className="popups">
				{popups.map((item: I.Popup, i: number) => (
					<Popup history={history} key={i} {...item} />
				))}
				{popups.length ? <Dimmer onClick={this.onClose} /> : ''}
			</div>
		);
	};
	
	onClose () {
		const { commonStore } = this.props;
		commonStore.popupCloseAll();
	};
	
};

export default ListPopup;