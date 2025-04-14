export interface IauthResponse {
	jwt:string,
	idUser: number,
	userName: string,
	roleDto: {
		id: string,
		name: string
	}
}