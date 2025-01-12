import { auth } from "@/auth.config";
import { TEST } from "@/components/ui/test";

export default async function Page() {
	const session = await auth();
	console.log('Session =>',session)
	
	return <div className='flex h-screen bg-slate-50'>Страница админа <TEST/></div>;
}
