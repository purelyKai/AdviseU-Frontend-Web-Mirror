import { NextResponse } from 'next/server';
import { Plan } from '@/lib/types';
import client from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

const fetchPlans = async (userId: string | undefined): Promise<Plan[]> => {
    const db = (await client.connect()).db('test');
    const collection = db.collection('users');

    const oId = new ObjectId(userId);
    const filter = { _id: oId };

    const user = await collection.findOne(filter);
    if (!user || !user.extension || !user.extension.plans) {
        return [];
    }

    const plans = user.extension.plans;

    return plans;
};

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const plans = await fetchPlans(session.user.id);
        return NextResponse.json(plans);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
    }
}
