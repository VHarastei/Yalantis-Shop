import React from 'react'
import { IProduct } from 'types'
import originIcon from 'assets/origin.svg'
import editIcon from 'assets/edit.svg'
import { Link } from 'react-router-dom'
import { Button } from 'components/Button'
import { useCartDispatch } from 'state'

export const ProductCard: React.FC<IProduct> = ({ children, ...product }) => {
  const dispatch = useCartDispatch()

  const hadleAddProduct = () => {
    dispatch({ type: 'ADD_PRODUCT', payload: product })
  }

  return (
    <li className="p-4 w-full max-w-s bg-white rounded-lg">
      <Link to={`products/${product.id}`}>
        <h2 className="mb-2 text-2xl font-semibold hover:text-green-500 hover:underline">
          {product.name}
        </h2>
      </Link>
      <div className="flex items-center mb-2">
        <img
          src={originIcon}
          width={32}
          alt="origin icon"
          className="p-1 h-8 bg-green-500 rounded-lg"
        />
        <span className="mx-2 text-lg font-medium text-gray-500">Origin:</span>
        <span className="text-lg font-medium">
          {product.origin[0].toUpperCase() + product.origin.slice(1)}
        </span>
      </div>
      <div className="flex items-center mb-2">
        <img
          src={editIcon}
          width={32}
          alt="origin icon"
          className="p-1 h-8 bg-green-500 rounded-lg"
        />
        <span className="mx-2 text-lg font-medium text-gray-500">Editable:</span>
        <span className="text-lg font-medium">{product.isEditable ? 'Yes' : 'No'}</span>
      </div>
      <div className="mb-2">
        <span className="mr-2 text-xl font-medium text-gray-500">Price:</span>
        <span className="text-3xl font-medium">{`${product.price}$`}</span>
      </div>
      <Button onClick={hadleAddProduct} fullWidth>
        Add to Cart
      </Button>
    </li>
  )
}
