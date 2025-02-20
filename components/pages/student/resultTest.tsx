'use client';

export default function resultTest() {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('test-storage');
		localStorage.removeItem('remainingTime');
	}



	return <div>Результаты теста</div>;
}
