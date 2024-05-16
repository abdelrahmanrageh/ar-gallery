import { Link } from "react-router-dom";
import { addTocart } from "../rtk/slices/shoppingCartSlice";
import { useDispatch } from "react-redux";

function Product({ product }) {
    
    
    const dispatch = useDispatch();
    return (
        <>
            {/* {notification && <div className="notification">Added to cart</div>}   */}
            <div className=" relative flex snap-center min-w-52 max-w-52 fxs:min-w-full shadow-sm rounded-md flex-col m-2 transition-all dark:text-teal-50  ring-slate-100 dark:border-slate-800 ring-2 dark:ring-slate-700 fxs:flex-row ">      
                <Link className="h-56 fs:h-44 bg-white p-6 flex items-center rounded-t-md fxs:rounded-l-md fxs:rounded-r-none fxs:w-1/2" to={`/products/${product.id}` } >
                    <img src={product.image} 
                        alt=""
                        className="product-img  max-h-full m-auto " />
                </Link>
                <div className="flex flex-col justify-center fxs:min-w-1/2 fxs:mx-auto">
                    <div className="name text-sm text-left my-2 mb-2 h-10 mx-5 overflow-hidden fxs:w-32 fxs:mx-3">{product.title}</div>
                    {/* <div className="mx-0 mb-3">
                        {[0, 1, 2, 3, 4].map((rating , i) => (
                            Math.round(product.rating.rate) > rating ?
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-6 inline text-white">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                            </svg>  :
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6 inline text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                        )) 
                        } 
                    </div> */}
                    <div className="flex justify-between  items-center">
                        <div className="price text-xl text-left mx-5 my-2 mb-1 inline fxs:mx-3">${product.price} </div>
                        {/* <FaCartArrowDown
                            className="w-32 h-8 inline cursor-pointer text-teal-50 hover:text-sky-600 bg-sky-500 px-2 py-2 rounded-lg"
                            onClick={() => dispatch(addTocart(product))}
                        /> */}
                    </div>
                    <button
                        onClick={() => {
                            dispatch(addTocart(product));
                            // pushNotification();
                        }}
                        className="add-to-cart rounded-md text-sm py-2 mt-2 fxs:mb-0 fxs:mx-3 mb-5 text-slate-600 ring-2 ring-slate-100 mx-5 hover:ring-sky-500 hover:shadow-md dark:border-none dark:text-teal-50 dark:ring-slate-600 fs:text-sm ">Add to cart
                    </button>
                </div>
            </div>
        </>
    )
}

export default Product; 