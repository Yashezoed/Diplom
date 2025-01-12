'use client'

import { useSession } from "next-auth/react"

export function TEST() {
	const session = useSession();
	console.log('TEst session',session)
	return "null"
}