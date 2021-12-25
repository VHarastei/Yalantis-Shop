import { ErrorCard } from 'components/ErrorCard'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { useQuery } from 'hooks/useQuery'
import React, { useCallback, useEffect, useState } from 'react'
import {
  fetchProducts,
  selectAllProducts,
  selectProductsPagination,
  selectProductsStatus,
} from 'store/slices/productsSlice'
import { Status } from 'types'
import { Pagination } from './components/Pagination'
import { ProductCard } from './components/ProductCard'
import { ProductCardPreloader } from './components/ProductCardPreloader'

export const Products = () => {
  const query = useQuery()
  const dispatch = useAppDispatch()

  const [currentPage, setCurrentPage] = useState<number>(Number(query.get('page')) || 1)

  const products = useAppSelector(selectAllProducts)
  const status = useAppSelector(selectProductsStatus)
  const pagination = useAppSelector(selectProductsPagination)

  const changeCurrentPage = useCallback((newPage: number) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, perPage: 20 }))
  }, [currentPage, dispatch])

  console.log(products)
  if (status === Status.ERROR) return <ErrorCard />

  return (
    <div className="mb-4">
      <h1 className="mb-4 text-4xl font-bold text-center text-green-500">List of Products</h1>
      <ul className="flex flex-wrap gap-4 justify-center">
        {status === Status.SUCCESS
          ? products.map((prod) => <ProductCard {...prod} key={prod.id} />)
          : [...Array(20)].map((_, i) => <ProductCardPreloader key={i} />)}
      </ul>
      {status === Status.SUCCESS && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={pagination.perPage}
          numberOfItems={pagination.totalItems}
          numberOfButtons={5}
          changeCurrentPage={changeCurrentPage}
        />
      )}
    </div>
  )
}
