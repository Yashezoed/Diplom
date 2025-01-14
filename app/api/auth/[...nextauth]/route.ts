import { handlers } from "@/auth.config";
import { auth } from "@/auth.config";
// import type { GetServerSideProps } from 'next';


export const { GET, POST } = handlers;

export default async function fetchDiscipline() {
	interface Course {
		id: number;
		name: string;
	}
	const session = await auth();
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.token}`
		}
	};
	const req = await fetch(
		'http://185.221.152.124:80/Discipline/student',
		options
	);
	const data: Course[] = await req.json();
	return data;
}


/* type Data = {
	id: string;
	CourseName: string;
};

export const getServerSideProps = (async () => {
	console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
	const session = await auth();
	console.log('Session =>',session)

	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${session?.token}`,
		}
	};

	const res = await fetch('http://185.221.152.124:80/Discipline/student', options);
	const data: Data = await res.json();
	console.log('res', res);

	return { props: { data } };
}) satisfies GetServerSideProps<{ data: Data }> ; */
