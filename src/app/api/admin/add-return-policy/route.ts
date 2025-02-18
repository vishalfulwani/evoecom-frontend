import { ApiResponse } from '@/helpers/ApiResponse';
import GlobalReturnPolicyModel from '@/models/returnpolicy.models';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';


export default async function POST(req: NextApiRequest, res: NextApiResponse) {

  const { returnEligible, returnWindow } = req.body;

  try {
    // Fetch or create the global policy
    let policy = await GlobalReturnPolicyModel.findOne();
    if (!policy) {
      policy = new GlobalReturnPolicyModel();
    }

    // Update policy fields
    if (typeof returnEligible !== 'undefined') {
      policy.returnEligible = returnEligible;
    }

    if (typeof returnWindow === 'number') {
      if (returnWindow < 0) {
        return res.status(400).json({ error: 'Return window must be a positive number.' });
      }
      policy.returnWindow = returnWindow;
    }

    policy.updatedAt = new Date();
    await policy.save();

  
    return NextResponse.json(
        new ApiResponse(true, 200, { 
            returnEligible: policy.returnEligible,
            returnWindow: policy.returnWindow,
        }, 'Global return policy updated successfully'),
        { status: 200 }
    );
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
        new ApiResponse(false, 500, {}, 'Error while setting return policy'),
        { status: 500 }
    );
  }
}
