import * as React from 'react';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { Frame, Title, Label, Button, Loader } from 'Component';
import { C, I, translate, analytics, UtilRouter, Storage } from 'Lib';
import { blockStore, commonStore } from 'Store';
import Constant from 'json/constant.json';

interface State {
	isLoading: boolean;
	items: any[];
};

const PageMainUsecase = observer(class PageMainUsecase extends React.Component<I.PageComponent, State> {

	state = {
		isLoading: false,
		items: [],
	};

    constructor (props: I.PageComponent) {
        super(props);

        this.onClick = this.onClick.bind(this);
    };

    render () {
		const { isLoading, items } = this.state;

        const Case = (item: any) => (
            <div className="item" onClick={e => this.onClick(e, item.id)}>
				<div className="head">
                	<Title text={translate(`usecase${item.id}Title`)} />
                	<Label text={translate(`usecase${item.id}Label`)} />
				</div>
                <div className="picture">
					<img src={item.img} />
				</div>
            </div>
        );

        return (
            <div>
                <Frame>
					{isLoading ? <Loader /> : ''}

                    <Title text={translate('pageMainUsecaseTitle')} />
                    <Label text={translate('pageMainUsecaseLabel')} />

                    <div className="list">
                        {items.map((item: any, i: number) => (
                            <Case key={i} {...item} />
                        ))}
                    </div>

                    <div className="buttons">
                        <Button color="blank" className="c36" text={translate('pageMainUsecaseSkip')} onClick={e => this.onClick(e, I.Usecase.None)} />
                    </div>
                </Frame>
            </div>
        );
    };

	componentDidMount (): void {
		this.setState({ items: this.getItems() });
	};

	getItems () {
 		return _.shuffle([
			{ id: I.Usecase.Personal, img: 'img/usecase/personal-projects.png' },
			{ id: I.Usecase.Notes, img: 'img/usecase/notes-or-diary.png' },
			{ id: I.Usecase.Knowledge, img: 'img/usecase/knowledge-base.png' },
        ]);
	};

    onClick (e: any, id: number) {
        e.preventDefault();

		const { isLoading } = this.state;

        if (isLoading) {
            return;
        };

        this.setState({ isLoading: true });

        C.ObjectImportUseCase(commonStore.space, id, () => {
			analytics.event('SelectUsecase', { type: id });

			const blocks = blockStore.getBlocks(blockStore.widgets, it => it.isLink() && (it.content.targetBlockId == Constant.widgetId.recent));
			if (blocks.length) {
				Storage.setToggle('widget', blocks[0].parentId, true);
			};

			this.setState({ isLoading: false });
			UtilRouter.go('/main/graph', { animate: true });
        });
    };

});

export default PageMainUsecase;