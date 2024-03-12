import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/customers/table";
import { lusitana } from '@/app/ui/fonts';
import { Metadata } from "next";
import { fetchCustomerPages } from '@/app/lib/data';
import { Suspense } from 'react';
import {CustomerSkelton} from '@/app/ui/skeletons';

// import { CreateCustomer} from '@/app/ui/customer/buttons';



export const metadata: Metadata = {
  title: 'Customer | Acme Dashboard'
}
export default async function Page({searchParams}: {searchParams ?: {query?: string, page?: string}}) {
  const query = searchParams?.query || '';
  const currentPage = searchParams?.page || 1;
  const totalPages = await fetchCustomerPages(query);
  
  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <CreateInvoice /> */}
      </div>
       <Suspense key={query + currentPage} fallback={<CustomerSkelton />}>
        <Table query={query} currentPage={Number(currentPage)} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={Number(totalPages)} />
      </div>
    </div>
  );
}