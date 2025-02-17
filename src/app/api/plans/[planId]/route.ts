import { NextResponse } from 'next/server';
import { Plan } from '@/lib/types';
import client from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { Collection, ObjectId } from 'mongodb';

interface UserExtension {
    plans: Plan[];
}

interface UserDocument {
    _id: ObjectId;
    extension?: UserExtension;
}

// Update an existing plan for a user
const updatePlan = async (plan: Plan, userId: string): Promise<boolean> => {
    const db = client.db('test');
    const users: Collection<UserDocument> = db.collection('users');

    const planId = new ObjectId(plan._id);

    const result = await users.updateOne(
        { _id: new ObjectId(userId), 'extension.plans._id': planId },
        {
            $set: {
                'extension.plans.$': {
                    _id: planId,
                    name: plan.name,
                    description: plan.description,
                    terms: plan.terms,
                },
            },
        }
    );

    return result.modifiedCount === 1;
};

// PUT request handler - Update a plan
export async function PUT(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        if (!body.plan) {
            return NextResponse.json({ error: 'Plan data is required' }, { status: 400 });
        }

        const status = await updatePlan(body.plan, session.user.id);

        if (!status) {
            return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 });
        }

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 });
    }
}

// Delete an existing plan for a user
const deletePlan = async (planId: string, userId: string): Promise<boolean> => {
    const db = client.db('test');
    const users: Collection<UserDocument> = db.collection('users');

    const result = await users.updateOne(
        { _id: new ObjectId(userId) },
        {
            $pull: {
                'extension.plans': {
                    _id: new ObjectId(planId),
                },
            },
        }
    );

    return result.modifiedCount === 1;
};

// DELETE request handler - Delete a plan
export async function DELETE(request: Request, { params }: { params: Promise<{ planId: string }> }) {
    try {
        const planId = (await params).planId;

        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const status = await deletePlan(planId, session.user.id);

        if (!status) {
            return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 });
        }

        return NextResponse.json({ success: status });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 });
    }
}
