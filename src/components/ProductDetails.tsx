import { formatCurrency } from "../Helpers"
import { deleteProduct } from "../services/ProductService"
import type { Product } from "../types"
import {Form, useNavigate, type ActionFunctionArgs, redirect, useFetcher } from "react-router-dom"

type ProductDetailsProps = {
    product: Product
}



// eslint-disable-next-line react-refresh/only-export-components
export async function action({params}:  ActionFunctionArgs) {
    
    if(params.id !== undefined){
        await deleteProduct(+params.id)
        return redirect('/')
    }
}
export default function ProductDetails({product}: ProductDetailsProps) {
    const fetcher = useFetcher()
    const navigate = useNavigate()
  return (
    <tr className="border-b text-center">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form 
                method="POST"
            >
                <button
                    type="submit"
                    name="id"
                    value={product.id}
                    className={`${product.availability ? 'text-green-600' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-gray-300 hover:cursor-pointer`}
                >
                {
                    product.availability ? 'Disponible' : 'No Disponible'
                }
                </button>
            </fetcher.Form >
            
        </td>
        <td className="p-3 text-lg text-gray-800 ">
           <div className=" flex gap-2 items-center">
            <button
                className=" bg-indigo-600 text-white font-bold text-xs w-full uppercase p-2 rounded-lg cursor-pointer hover:bg-indigo-700"   
                onClick={() => navigate(`/productos/${product.id}/editar`)}
            
            >Editar</button>
            <Form
                className=" w-full"
                method="POST"
                action={`productos/${product.id}/eliminar`}
                onSubmit={(e) => {
                    if(!confirm('¿Eliminar?')){
                        e.preventDefault()
                    }
                }}
            >
                <input 
                    type="submit" 
                    value="Eliminar" 
                    className=" bg-red-600 text-white font-bold text-xs w-full uppercase p-2 rounded-lg cursor-pointer hover:bg-red-700"
                />
            </Form>
           </div>
        </td>
    </tr> 
  )
}
