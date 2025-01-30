export interface IauthResponse {
	jwt:string,
	idUser: number,
	username: string,
	roleDto: {
		id: string,
		name: string
	}
}