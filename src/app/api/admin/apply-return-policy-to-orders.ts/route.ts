import { ApiResponse } from '@/helpers/ApiResponse';
import OrderModel from '@/models/order.models';
import GlobalReturnPolicyModel from '@/models/returnpolicy.models';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch the global return policy
    const policy = await GlobalReturnPolicyModel.findOne();
    if (!policy) {
    return NextResponse.json(
        new ApiResponse(false, 400, {}, 'Global return policy not set'),
        { status: 400 }
    );

    }

    // Apply the global return policy to all orders
    await OrderModel.updateMany(
      {},
      {
        $set: {
          returnEligible: policy.returnEligible,
          returnWindow: policy.returnWindow,
        },
      }
    );

    return NextResponse.json(
        new ApiResponse(true, 200, {}, 'Global return policy applied to all orders.'),
        { status: 200 }
    );

  } catch (error) {
    console.error('Error applying global policy:', error);
    return NextResponse.json(
        new ApiResponse(false, 500, {}, 'Error applying global policy'),
        { status: 500 }
      );
  }
}
