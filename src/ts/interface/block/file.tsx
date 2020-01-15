import { I } from 'ts/lib';

export enum FileType {
	None	 = 0,
	File	 = 1,
	Image	 = 2,
	Video	 = 3,
};

export enum FileState {
	Empty		 = 0,
	Uploading	 = 1,
	Done		 = 2,
	Error		 = 3,
};

export interface File {
	hash?: string;
	name?: string;
	size?: number;
	state: FileState;
	type?: FileType;
};

export interface BlockFile extends I.Block {
	content: File;
};