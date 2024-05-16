/*
This example requires some changes to your config:

```
// tailwind.config.js
module.exports = {
    // ...
    theme: {
    extend: {
        gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
        },
    },
    },
    plugins: [
    // ...
    require('@tailwindcss/aspect-ratio'),
    ],
}
```
*/
import { useParams} from 'react-router-dom'
import { useEffect } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../rtk/slices/productsSlice'
import { addTocart } from '../rtk/slices/shoppingCartSlice'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductPage() {
    
    const productId = useParams().productId - 1 ;
    const products = useSelector((state) => state.products.products);
    const product = products[productId];
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {products.length > 0 &&
            
                <div className=" mt-20 ">
                    <div className="pt-6">
                        <nav aria-label="Breadcrumb">
                            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                                
                                    <li >
                                        <div className="flex items-center">
                                            <p className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                {product.category}
                                            </p>
                                            <svg
                                                width={16}
                                                height={20}
                                                viewBox="0 0 16 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                                className="h-5 w-4 text-gray-300 "
                                            >
                                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                            </svg>
                                        </div>
                                    </li>
                                
                                <li className="text-sm">
                                    <p  className="font-medium dark:text-gray-300 text-gray-500">
                                        {product.title}
                                    </p>
                                </li>
                            </ol>
                        </nav>

                        {/* Image gallery */}
                        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-5xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                            <div className="aspect-h-4 aspect-w-4 lg:aspect-h-3 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg ">
                                <img
                                    src={product.image}
                                    alt={'dd'}
                                    className="h-full w-full fs:w-3/4 object-cover object-center m-auto"
                                />
                            </div>
                        </div>

                        {/* Product info */}
                        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                <h1 className="text-2xl font-bold tracking-tight dark:text-teal-50 text-gray-900 sm:text-3xl">{product.title}</h1>
                            </div>

                            {/* Options */}
                            <div className="mt-4 lg:row-span-3 lg:mt-0">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl tracking-tight text-gray-900 dark:text-teal-50">${product.price}</p>

                                {/* Reviews */}
                                <div className="mt-6">
                                    <h3 className="sr-only">Reviews</h3>
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    Math.round(product.rating.rate )> rating ? 'text-gray-900 dark:text-teal-50' : 'text-gray-200 dark:text-gray-600',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        )) 
                                        }
                                        <span className='ml-2 text-gray-900 dark:text-teal-50'>{product.rating.rate}</span>
                                        </div>
                                        {/* <p className="sr-only">{product.rating.rate} out of 5 stars</p> */}
                                        
                                    </div>
                                </div>

                                <form className="mt-10">

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(addTocart(product));
                                        }}
                                        
                                        type="submit"
                                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 px-8 py-3 text-base font-medium text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                    >
                                        Add to cart
                                    </button>
                                </form>
                            </div>

                            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                                {/* Description and details */}
                                <div>
                                    <h3 className="sr-only text-gray-900 dark:text-teal-50">Description</h3>

                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900 dark:text-teal-50">{product.description}</p>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                    <div className="mt-4 space-y-6">
                                        {/* <p className="text-sm text-gray-600">{product.details}</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
        
    
    )   
}
