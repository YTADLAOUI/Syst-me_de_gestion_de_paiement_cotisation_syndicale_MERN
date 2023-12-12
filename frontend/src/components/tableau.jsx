import React from 'react';
import ReactPaginate from 'react-js-pagination';

const Tableau = () => {
  // Placeholder data
  const data = [
    { id: 1, productName: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: '$2999' },
    { id: 2, productName: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: '$1999' },
    { id: 3, productName: 'Magic Mouse 2', color: 'Black', category: 'Accessories', price: '$99' },
    // Add more rows as needed
  ];

  const headers = [
    'Product name',
    'Color',
    'Category',
    'Price',
    'Action',
  ];

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {headers.map((header, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {row.productName}
                </th>
                <td className="px-6 py-4">{row.color}</td>
                <td className="px-6 py-4">{row.category}</td>
                <td className="px-6 py-4">{row.price}</td>
                <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <ReactPaginate
        activePage={1}
        itemsCountPerPage={10}
        totalItemsCount={450}
        pageRangeDisplayed={5}
        onChange={() => {}}
        itemClass="page-item"
        linkClass="page-link"
      />
    </>
  );
};

export default Tableau;
