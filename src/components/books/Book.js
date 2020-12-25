import React from 'react';
import { connect } from 'react-redux';
import { confirmDeleteBooksOpen, fetchBooksRequest, modalBooksOpen } from '../../redux/books/booksAction';
import BookModal from './_BookModal';
import BookConfirmDelete from './_BookConfirmDelete';
import useDebounce from '../../hooks/useDebounce';

function Book({bookReducer, fetchBooks, showModalAdd, showModalEdit, showConfirmDelete}){
  const [search, setSearch] = React.useState("")
  const [page, setPage] = React.useState(1)

  const debounceFetchBooks = useDebounce(params => {
    fetchBooks(params)
  }, 1000)

  React.useEffect(() => {
    debounceFetchBooks({search: search, page: page})
  }, [debounceFetchBooks, search, page])

  const handleClickAddBook = () => {
    showModalAdd();
  }

  const handleClickEditBook = (id) => {
    showModalEdit(id);
  }

  const handleClickDeleteBook = (id) => {
    showConfirmDelete(id)
  }

  const handleChangeSearchBox = (e) => {
    setSearch(e.target.value)
  }

  const handleClickNextPage = (e) => {
    e.preventDefault()
    setPage(page => page +1 )
  }

  const handleClickPrevPage = (e) => {
    e.preventDefault()
    setPage(page => {
      if (page <= 1){
        return 1;
      }
      return page - 1
    })
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="h-96">
        <div className="md:inline-flex">
          <div>
            <button
              className="
                inline-flex justify-center py-2 
                px-8 border border-transparent 
                shadow-sm text-sm font-medium 
                rounded-md text-white bg-indigo-600 
                hover:bg-indigo-700 focus:outline-none 
                focus:ring-2 focus:ring-offset-2 
                focus:ring-indigo-500"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={handleClickAddBook}
            >
            Tambah Buku
            </button>
          </div>
          <div className="relative md:absolute md:right-48 ">
            <input 
              type="text" 
              name="search_books" 
              placeholder="Cari buku"
              value={search}
              onChange={handleChangeSearchBox}
              className={
                `mt-1 py-2 block shadow-sm sm:text-sm 
                focus:ring-indigo-500 focus:border-indigo-500 rounded-md border-gray-300
              `}/>

          </div>

        </div>
        { bookReducer.modalOpen && <BookModal/>}
        { bookReducer.confirmDeleteOpen && <BookConfirmDelete/>}
        {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="
              py-6 align-middle 
              inline-block min-w-full 
              sm:px-6 lg:px-8">
              <div className="
                shadow overflow-hidden 
                border-b border-gray-200 
                sm:rounded-lg">
                <table 
                  className=" min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th 
                        scope="col" 
                        className="
                          px-6 py-3 text-left text-xs 
                          font-medium text-gray-500 
                          uppercase tracking-wider">
                        Judul
                      </th>
                      <th 
                        scope="col" 
                        className="
                          px-6 py-3 text-left text-xs 
                          font-medium text-gray-500 
                          uppercase tracking-wider">
                        Penulis
                      </th>
                      <th 
                        scope="col" 
                        className="
                          px-6 py-3 text-left 
                          text-xs font-medium 
                          text-gray-500 uppercase 
                          tracking-wider">
                        Tanggal dipublish
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    { bookReducer.loading 
                      ? (<tr><td colSpan="4" className="py-1 col-span-5 text-center">Loading..</td></tr>) 
                      : bookReducer.error
                        ? (<tr><td colSpan="4" className="py-1 text-center">{bookReducer.error}</td></tr>)
                        : bookReducer.books.length
                          ? bookReducer.books.map(book => {
                            return (
                              <tr key={book.id} className="hover:bg-gray-100">
                                <td className="px-6 py-1 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {book.title}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-1 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{book.author}</div>
                                </td>
                                <td className="px-6 py-1 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{book.publishedDate}</div>
                                </td>
                                <td className="px-6 py-1 whitespace-nowrap text-right text-sm font-medium">
                                  <div className="inline-flex px-1">
                                    <button 
                                      onClick={() => handleClickEditBook(book.id)} 
                                      className="
                                        inline-flex justify-center py-1 
                                        px-4 border border-indigo shadow-sm 
                                        text-sm font-medium rounded-md 
                                        text-indigo-700 bg-white 
                                        focus:outline-none focus:ring-2 
                                        focus:ring-offset-2 
                                        focus:ring-indigo-500">Edit</button>
                                  </div>
                                  <div className="inline-flex px-1">
                                  <button 
                                    onClick={() => handleClickDeleteBook(book.id)} 
                                    className="
                                      inline-flex justify-center 
                                      py-1 px-4 border border-red 
                                      shadow-sm text-sm font-medium 
                                      rounded-md text-red-500 bg-white 
                                      focus:outline-none focus:ring-2 
                                      focus:ring-offset-2 focus:ring-red-500">Hapus</button>
                                  </div>
                                </td>
                              </tr>
                            )
                          })
                          : (<tr><td colSpan="4" className="py-1 text-center">....</td></tr>)
                      }

                    {/* <!-- More rows... --> */}
                  </tbody>
                </table>
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1">
                    <button onClick={handleClickPrevPage} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-indigo-700 bg-white hover:text-indigo-500 focus:outline-none">
                      Sebelumnya
                    </button>
                    <button onClick={handleClickNextPage} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-indigo-700 bg-white hover:text-indigo-500 focus:outline-none">
                      Selanjutnya
                    </button>
                  </div>
                </div>
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
    fetchBooks: (params = {}) => {
      dispatch(fetchBooksRequest(params));
    },
    showModalAdd: () => {
      dispatch(modalBooksOpen({modalType: 'new', modalFetchId: null}));
    },
    showModalEdit: (id) => {
      dispatch(modalBooksOpen({modalType: 'edit', modalFetchId: id}));
    },
    showConfirmDelete: (id) => {
      dispatch(confirmDeleteBooksOpen(id));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Book);