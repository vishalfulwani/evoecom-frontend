'use client'

import { RootState } from '@/redux/store';
import { addToWishlist, removeFromWishlist } from '@/redux/wishlistSlice';
import React from 'react';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import { RootState } from '@/store/store'; // Import RootState from your store setup
// import { addToWishlist, removeFromWishlist } from '@/store/wishlistSlice';

interface ProductCardProps {
  productId: string;
}

const WishlistBtn: React.FC<ProductCardProps> = ({ productId }) => {
  const dispatch = useDispatch();

  // Select wishlist items from the Redux store
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  // Check if the product is in the wishlist
  const isProductInWishlist = wishlistItems.includes(productId);

  // Handlers for adding/removing products to/from the wishlist
  const handleAddToWishlist = () => {
    dispatch(addToWishlist(productId));
    toast.success("Product added to wishlist!")
    // alert("Product added to wishlist!");
  };

  const handleRemoveFromWishlist = () => {
      dispatch(removeFromWishlist(productId));
      toast.success("Product removed from wishlist!")
  };

  return (
    <div
      className='cursor-pointer'
    >
      {isProductInWishlist ? (

        <div  data-bs-toggle="modal" data-bs-target="#wishlistModal">
          <i className='bx bxs-heart'></i>
        </div>

      ) : (
        // <i className='bx bx-heart' onClick={handleAddToWishlist}></i>
        <i className="bx bx-heart" onClick={handleAddToWishlist}></i>
      )}

      {/* <div className="modal fade" id="wishlistModal" tabIndex={-1} aria-labelledby="wishlistModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-top border-[#5180ba]">
              <h5 className="modal-title text-center w-100" id="wishlistModalLabel">
                Are you sure you want to remove this item from your wishlist?
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button
                type="button"
                className="btn bg-[#5180ba] hover:bg-[#416898] border-0 text-white fw-bold"
                onClick={handleRemoveFromWishlist}
                data-bs-dismiss="modal"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

      </div> */}
      <div className="modal fade" id="wishlistModal" tabIndex={-1} aria-labelledby="wishlistModalLabel" aria-hidden="true" style={{ borderColor: "#5180ba" }}>
  <div className="modal-dialog">
    <div className="modal-content">
      {/* Modal Header */}
      <div className="modal-header border-top" style={{ borderColor: "#5180ba" }}>
        <h5 className="modal-title text-center w-100" id="wishlistModalLabel">
          Are you sure you want to remove this item from your wishlist?
        </h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      {/* Modal Footer */}
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
          Cancel
        </button>
        <button
          type="button"
          className="btn text-white fw-bold"
          style={{ backgroundColor: "#5180ba", border: "none" }}
          onClick={handleRemoveFromWishlist}
          data-bs-dismiss="modal"
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#416898")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#5180ba")}
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</div>

    </div>



  );
};

export default WishlistBtn;
