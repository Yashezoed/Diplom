export interface IStudentInfo {
	group: Group;
	role: Role;
	id: number;
	fullName: string;
}

export interface Group {
	id: number;
	name: string;
}

export interface Role {
	id: number;
	name: string;
}
