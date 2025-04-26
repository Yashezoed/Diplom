'use client';

import StudentLayout from "@/components/layuout/studentLayout";
import { IresultTestData } from "@/interfaces/resultTestData";

export default function resultTest({data, testName}:{ data : IresultTestData; testName: string }) {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('test-storage');
	}
	console.log(data);
	console.log(testName);




	return (
		<StudentLayout title={testName}>
			<div>Результаты теста</div>
		</StudentLayout>
	);
}
