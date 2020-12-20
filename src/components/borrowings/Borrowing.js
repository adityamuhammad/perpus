import React from 'react';
import { connect } from 'react-redux';
import { fetchBorrowingsRequest, modalBorrowingsOpen } from '../../redux/borrowings/borrowingsAction';
import BorrowingModal from './_BorrowingModal';

function Borrowing({ fetchBorrowings, borrowingReducer, showModalAdd}){

  React.useEffect(() => {
    fetchBorrowings();
  }, [fetchBorrowings])

  const handleClickAddBorrowing = () => {
    showModalAdd();
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="h-96">
        <button
          className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="button"
          style={{ transition: "all .15s ease" }}
          onClick={handleClickAddBorrowing}
        >
        Tambah Peminjaman
        </button>
        { borrowingReducer.modalOpen ? <BorrowingModal/> : null }
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
                                    <button onClick={() => console.log('edit')} className="inline-flex justify-center py-1 px-4 border border-indigo shadow-sm text-sm font-medium rounded-md text-indigo-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit</button>
                                  </div>
                                  <div className="inline-flex px-1">
                                  <button onClick={() => console.log('delete')} className="inline-flex justify-center py-1 px-4 border border-red shadow-sm text-sm font-medium rounded-md text-red-500 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</button>
                                  </div>
                                </td>
                              </tr>
                            )
                          })
                          : (<tr><td colSpan="8" className="py-1 text-center">Data is empty.</td></tr>)
                      }

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
    borrowingReducer: state.borrowingsReducer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBorrowings: () => {
      dispatch(fetchBorrowingsRequest());
    },
    showModalAdd: () => {
      dispatch(modalBorrowingsOpen())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Borrowing);