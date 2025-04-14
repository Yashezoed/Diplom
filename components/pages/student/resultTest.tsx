'use client';
// ! в этот компонент можно попасть из профиля и из результатов теста
export default function resultTest() {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('test-storage');
	}



	return <div>Результаты теста</div>;
}
