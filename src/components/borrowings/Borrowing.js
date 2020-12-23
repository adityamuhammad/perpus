import React from 'react';
import { connect } from 'react-redux';
import useDebounce from '../../hooks/useDebounce';
import { confirmReturnBorrowingsOpen, fetchBorrowingsRequest, modalBorrowingsOpen } from '../../redux/borrowings/borrowingsAction';
import BorrowingComfirmReturn from './_BorrowingComfirmReturn';
import BorrowingModal from './_BorrowingModal';

function Borrowing({ fetchBorrowings, borrowingReducer, showModalAdd, showConfirmReturn}){
  const [search, setSearch] = React.useState("")
  const [page, setPage] = React.useState(1)

  const debounceFetchBorrowings = useDebounce(params => {
    fetchBorrowings(params);
  }, 1000)

  React.useEffect(() => {
    debounceFetchBorrowings({search: search, page: page})
  }, [debounceFetchBorrowings, search, page])

  const handleClickAddBorrowing = () => {
    showModalAdd();
  }

  const handleClickReturnBook = (id) => {
    showConfirmReturn(id);
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
        <div className="inline-flex">
          <div>
            <button
              className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={handleClickAddBorrowing}
            >
            Tambah Peminjaman
            </button>

          </div>
          <div className="absolute right-48 ">
            <input 
              type="text" 
              name="search_borrowing" 
              placeholder="Cari peminjaman"
              value={search}
              onChange={handleChangeSearchBox}
              className={
                `mt-1 py-2 block shadow-sm sm:text-sm 
                focus:ring-indigo-500 focus:border-indigo-500 rounded-md border-gray-300
              `}/>

          </div>


        </div>
        { borrowingReducer.modalOpen ? <BorrowingModal/> : null }
        { borrowingReducer.confirmReturnOpen && <BorrowingComfirmReturn />}
        {/* { bookReducer.confirmDeleteOpen ? <BookConfirmDelete/> : null } */}
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
                        Nama Peminjam
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Alamat
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No Telp
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal Pinjam
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal Kembali
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    { borrowingReducer.loading 
                      ? (<tr><td colSpan="8" className="py-1 col-span-5 text-center">Loading..</td></tr>) 
                      : borrowingReducer.error
                        ? (<tr><td colSpan="8" className="py-1 text-center">{borrowingReducer.error}</td></tr>)
                        : borrowingReducer.borrowings.length
                          ? borrowingReducer.borrowings.map(borrowing => {
                            return (
                              <tr key={borrowing.id} className="hover:bg-gray-100">
                                <td className="px-6 py-1 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {borrowing.title}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-1 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{borrowing.author}</div>
                                </td>
                                <td className="px-6 py-1 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{borrowing.borrowerName}</div>
                                </td>
                                <td className="px-6 py-1 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{borrowing.borrowerAddress}</div>
                                </td>
                                <td className="px-6 py-1 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{borrowing.borrowerPhoneNumber}</div>
                                </td>
                                <td className="px-6 py-1 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{borrowing.borrowDate}</div>
                                </td>
                                <td className="px-6 py-1 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{borrowing.returnDate}</div>
                                </td>
                                <td className="px-6 py-1 whitespace-nowrap text-right text-sm font-medium">
                                  <div className="inline-flex px-1">
                                     { !borrowing.returnDate && 
                                    <button onClick={() => handleClickReturnBook(borrowing.id)} className="inline-flex justify-center py-1 px-4 border border-indigo shadow-sm text-sm font-medium rounded-md text-indigo-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Kembalikan</button>}
                                  </div>
                                </td>
                              </tr>
                            )
                          })
                          : (<tr><td colSpan="8" className="py-1 text-center">Data is empty.</td></tr>)
                      }

                  </tbody>
                </table>
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1">
                    <button onClick={handleClickPrevPage} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                      Sebelumnya
                    </button>
                    <button onClick={handleClickNextPage} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
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
    borrowingReducer: state.borrowingsReducer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBorrowings: (params = {}) => {
      dispatch(fetchBorrowingsRequest(params));
    },
    showModalAdd: () => {
      dispatch(modalBorrowingsOpen())
    },
    showConfirmReturn: (id) => {
      dispatch(confirmReturnBorrowingsOpen(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Borrowing);