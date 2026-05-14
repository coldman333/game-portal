import {PayloadRedirects} from "@/components/PayloadRedirects";
import { notFound, redirect } from 'next/navigation'
export default async function Page() {
    redirect('/')
    return <PayloadRedirects url={'/'} />
}
