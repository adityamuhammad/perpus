import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBooksRequest, modalBooksOpen } from '../../redux/books/booksAction';
import ModalForm from './_ModalForm';

function Book({bookReducer, fetchBooks, showModal}){
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks])

  const handleClickAddBook = () => {
    showModal();
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="h-96">
        <button
          className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="button"
          style={{ transition: "all .15s ease" }}
          onClick={handleClickAddBook}
        >
        Tambah buku
        </button>
        { bookReducer.modalOpen ? <ModalForm/> : null }
        {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-6 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Judul
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Penulis
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal dipublish
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    { bookReducer.loading 
                      ? (<tr><td colSpan="4" className="col-span-5 text-center">Loading..</td></tr>) 
                      : bookReducer.error
                        ? (<tr><td colSpan="4" className="text-center">{bookReducer.error}</td></tr>)
                        : bookReducer.books.map(book => {
                          return (
                            <tr key={book.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {book.title}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{book.author}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{book.publishedDate}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#!" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                              </td>
                            </tr>
                          )
                        })}

                    {/* <!-- More rows... --> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

const mapStateToProps = state => {
  return {
    bookReducer: state.booksReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBooks: () => {
      dispatch(fetchBooksRequest())
    },
    showModal: () => {
      dispatch(modalBooksOpen())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Book);