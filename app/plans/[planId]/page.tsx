import React from 'react';
import ViewPlanSection from './(components)/(sections)/ViewPlanSection';
import { Params, SearchParams } from '@/lib/types';

const Page = async ({ params, searchParams }: { params: Params; searchParams: SearchParams }) => {
    const planId = Number((await params).planId);
    return <ViewPlanSection planId={planId} />;
};

export default Page;
