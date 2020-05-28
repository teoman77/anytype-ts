import { I } from 'ts/lib';

export enum ViewType {
	Grid	 = 'grid',
	List	 = 'list',
	Gallery	 = 'gallery',
	Board	 = 'board',
};

export enum PropertyType { 
	Title	 = 'title', 
	Text	 = 'description', 
	Number	 = 'number', 
	Date	 = 'date', 
	Select	 = 'select', 
	Multiple = 'multiselect',
	Link	 = 'link',
	File	 = 'file',
	Image	 = 'image',
	Bool	 = 'checkbox', 
	Icon	 = 'emoji',
	Url		 = 'url',
	Email	 = 'email',
	Phone	 = 'phone',
};

export enum SortType { 
	Asc		 = 0, 
	Desc	 = 1,
};

export enum FilterOperator { 
	And		 = 0, 
	Or		 = 1,
};

export enum FilterCondition { 
	Equal		 = 0,
	NotEqual	 = 1,
	Greater		 = 2,
	Less		 = 3,
	Like		 = 4,
	NotLike		 = 5,
	In			 = 6,
	NotIn		 = 7,
};

export interface Property {
	id: string;
	name: string;
	type: PropertyType;
	values?: any[];
};

export interface Sort {
	propertyId: string;
	type: SortType;
};

export interface Filter {
	propertyId: string;
	operator: FilterOperator;
	condition: FilterCondition;
	value: any;
};

export interface View {
	id: string;
	name: string;
	type: ViewType;
	sorts: Sort[];
	filters: Filter[];
};

export interface Cell {
	id: number;
	property: Property;
	data: any;
};

export interface ContentDataview {
	databaseId: string;
	schemaURL: string;
	view: string;
	properties: Property[];
	views: View[];
	data: any[];
};

export interface BlockDataview extends I.Block {
	content: ContentDataview;
};