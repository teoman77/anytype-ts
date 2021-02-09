import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { observer } from 'mobx-react';
import { Icon, Title, Label, IconObject, HeaderMainSet as Header } from 'ts/component';
import { I, C, DataUtil, translate } from 'ts/lib';
import { commonStore, blockStore, dbStore } from 'ts/store';

interface Props extends RouteComponentProps<any> {};

@observer
class PageMainSet extends React.Component<Props, {}> {

	constructor (props: any) {
		super(props);

		this.onAdd = this.onAdd.bind(this);
	};

	render () {
		const objectTypes = dbStore.objectTypes.filter((it: I.ObjectType) => { return !it.isHidden; });

		const Item = (item: any) => {
			return (
				<div className="item" onClick={(e: any) => { this.setCreate(item); }}>
					<IconObject object={{ ...item, layout: I.ObjectLayout.ObjectType }} />
					<div className="name">{item.name}</div>
				</div>
			);
		};

		return (
			<div>
				<Header {...this.props} rootId="" />
				<div className="wrapper">
					<IconObject size={64} object={{ iconClass: 'newSet' }} />
					<Title text={translate('setTitle')} />
					<Label text={translate('setText')} />
					<div className="items">
						<div id="button-add" className="item add" onClick={this.onAdd}>
							<Icon className="add" />
							<div className="name">Create new object type</div>
						</div>
						{objectTypes.map((item: any, i: number) => (
							<Item key={i} {...item} />
						))}
					</div>
				</div>
			</div>
		);
	};

	onAdd (e: any) {
		const { objectTypes } = dbStore;

		commonStore.menuOpen('dataviewObjectType', { 
			element: '#button-add',
			offsetX: 28,
			offsetY: 4,
			type: I.MenuType.Vertical,
			vertical: I.MenuDirection.Bottom,
			horizontal: I.MenuDirection.Left,
			data: {
				onCreate: (type: I.ObjectType) => {
					objectTypes.push(type);
				}
			}
		});
	};

	setCreate (item: any) {
		const { root } = blockStore;

		if (!item.url) {
			return;
		};

		C.BlockCreateSet(root, '', item.url, { name: item.name + ' set', iconEmoji: item.iconEmoji }, I.BlockPosition.Bottom, (message: any) => {
			if (message.error.code) {
				return;
			};

			DataUtil.pageOpen(message.targetId);
		});
	};
	
};

export default PageMainSet;