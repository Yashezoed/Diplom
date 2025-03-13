'use client';

export default function resultTest() {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('test-storage');
	}



	return <div>Результаты теста</div>;
}
