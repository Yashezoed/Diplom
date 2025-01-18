'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FixAuth() {
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		if (pathname.startsWith('/login')) {
			router.refresh();
		}
	}, [pathname, router]);

	if (pathname.startsWith('/login')) return null;
}