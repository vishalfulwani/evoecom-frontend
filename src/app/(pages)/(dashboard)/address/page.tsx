// 'use client'


// const Page = () => {

//     return (


//         <div className="card shadow-none mb-0">
//             <div className="card-body">
//                 <h6 className="mb-4">The following addresses will be used on the checkuot page by default.</h6>
//                 <div className="row">
//                     <div className="col-12 col-lg-6">
//                         <h5 className="mb-3">Billing Addresses</h5>
//                         <address>
//                             Madison Riiz<br />
//                             123 Happy Street<br />
//                             Cape Town<br />
//                             Western Cape<br />
//                             8001<br />
//                             South Africa
//                         </address>
//                     </div>
//                     <div className="col-12 col-lg-6">
//                         <h5 className="mb-3">Shipping Addresses</h5>
//                         <address>
//                             Madison Riiz<br />
//                             123 Happy Street<br />
//                             Cape Town<br />
//                             Western Cape<br />
//                             8001<br />
//                             South Africa
//                         </address>
//                     </div>
//                 </div>
//                 <form className="row g-3" onSubmit={handleSubmit}>

//                     <div className="col-md-6">
//                         <label className="form-label">Phone Number</label>
//                         <input className="form-control rounded-0"
//                             type="tel"
//                             id="phone"
//                             placeholder="phone"
//                             value={phone}
//                             onChange={(e) => setPhone(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="col-md-6">
//                         <label className="form-label">Street</label>
//                         <input type="text" className="form-control rounded-0"
//                             id="street"
//                             value={street}
//                             onChange={(e) => setStreet(e.target.value)}
//                             required
//                             placeholder="street name"
//                         />
//                     </div>
//                     <div className="col-md-6">
//                         <label className="form-label">City/District</label>
//                         <input type="text" className="form-control rounded-0"
//                             id="city"
//                             value={city}
//                             onChange={(e) => setCity(e.target.value)}
//                             placeholder="city name"
//                             required />

//                     </div>
//                     <div className="col-md-6">
//                         <label className="form-label">State/Province</label>
//                         <input type="text" className="form-control rounded-0"
//                             id="state"
//                             placeholder="state name"
//                             value={state}
//                             onChange={(e) => setState(e.target.value)}
//                             required />

//                     </div>
//                     <div className="col-md-6">
//                         <label className="form-label">Zip/Postal Code</label>
//                         <input type="text" className="form-control rounded-0"
//                             id="postalCode"
//                             placeholder="postal code"
//                             value={postalCode}
//                             onChange={(e) => setPostalCode(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="col-12">
//                         <button type="submit" className="btn btn-light btn-ecomm">
//                             Save Changes
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>

//     )
// }
// export default Page




'use client'

import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { ApiResponse } from '@/helpers/ApiResponse'
import { APP_BASE_URL } from '../../../../../constants'

const Page = () => {
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const addressData = {
      phone,
      street,
      city,
      state,
      postalCode,
    }

    try {
      // const response = await axios.post('/api/change-address', addressData)
      const response = await axios.post(`${APP_BASE_URL}/change-address`, addressData)
      // Handle success response
      if (response.data.success) {
        toast.success('Address updated successfully!')
      } else {
        toast.success('Failed to update address!')
      }
    } catch (error) {
      console.error('Error updating address:', error)
      const axiosError = error as AxiosError<ApiResponse>
      let errorMessage = axiosError.response?.data.message
      toast.error(errorMessage)
    }
  }

    const { data: session, status } = useSession();
          console.log(session?.platform)
          useEffect(() => {
              console.log(session)
          }, [session]);

  return (
    <div className="card shadow-none mb-0">
      <div className="card-body">
        <h6 className="mb-4">
          The following addresses will be used on the checkout page by default.
        </h6>
        <div className="row">
          <div className="col-12 col-lg-6">
            <h5 className="mb-3">Saved Addresses</h5>
            <address>
              {session?.user?.userName}<br />
              {session?.address?.street}<br />
              {session?.address?.city}<br />
              {session?.address?.state}<br />
              {session?.address?.postalCode}<br />
              {session?.phone}<br />
            </address>
          </div>
        </div>

        <div className="my-3 border-top"></div>
        
        {/* Address Form */}
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input
              className="form-control rounded-0"
              type="tel"
              id="phone"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Street</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
              placeholder="Street name"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">City/District</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City name"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">State/Province</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="state"
              placeholder="State name"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Zip/Postal Code</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="postalCode"
              placeholder="Postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-light btn-ecomm">
              Update Address
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
