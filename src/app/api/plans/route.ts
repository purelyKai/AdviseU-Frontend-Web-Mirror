import { NextResponse } from 'next/server';
import { NewPlan, Plan } from '@/lib/types';
import client from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { Collection, ObjectId } from 'mongodb';

interface UserExtension {
    plans?: Plan[];
}

interface UserDocument {
    _id: ObjectId;
    extension?: UserExtension;
}

// Fetch plans for a user
const fetchPlans = async (userId: string): Promise<Plan[]> => {
    const db = (await client.connect()).db('test');
    const collection: Collection<UserDocument> = db.collection('users');

    const user = await collection.findOne({ _id: new ObjectId(userId) });

    return user?.extension?.plans ?? [];
};

// Create a new plan for a user
const createPlan = async (plan: NewPlan, userId: string): Promise<boolean> => {
    const db = client.db('test');
    const users: Collection<UserDocument> = db.collection('users');

    const newPlan = { ...plan, _id: new ObjectId() }; // Add an ObjectId to the plan

    const result = await users.updateOne({ _id: new ObjectId(userId) }, { $push: { 'extension.plans': newPlan } });

    return result.modifiedCount === 1;
};

// GET request handler - Fetch plans
export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const plans = await fetchPlans(session.user.id);
        return NextResponse.json(plans);
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
    }
}

// POST request handler - Create a plan
export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        if (!body.plan) {
            return NextResponse.json({ error: 'Plan data is required' }, { status: 400 });
        }

        const status = await createPlan(body.plan, session.user.id);
        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 });
    }
}
