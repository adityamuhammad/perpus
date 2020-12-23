import React from 'react';
import { fetchBooksRequest } from '../../redux/books/booksAction';
import { fetchMembersRequest } from '../../redux/members/membersAction';
import useDebounce from './../../hooks/useDebounce';
import { connect } from 'react-redux';
import SelectBook from './_SelectBook';
import SelectBorrower from './_SelectBorrower';
import { modalBorrowingsClose, saveBorrowingsRequest } from '../../redux/borrowings/borrowingsAction';
import { useForm } from 'react-hook-form';

function BorrowingModal(
  {
    books, fetchBooks, 
    borrowers, fetchBorrowers,
    saveBorrowing,
    closeModal
  }){

  const { register, errors, watch, handleSubmit, setValue, getValues } = useForm();
  
  const [isBookSelectHidden, setIsBookSelectHidden] = React.useState(true);
  const [isBorrowerSelectHidden, setIsBorrowerSelectHidden] = React.useState(true);

  const [findBorrower, setFindBorrower] = React.useState("");
  const [findBook, setFindBook] = React.useState("");

  const [selectedBookTitle, setSelectedBookTitle] = React.useState("");
  const selectedBookId = getValues("bookId")
  const watchBook = watch("bookId", "");

  const [selectedBorrowerName, setSelectedBorrowerName] = React.useState("");
  const selectedBorrowerId = getValues("memberId")
  const watchBorrower = watch("memberId", "");

  const debounceFetchBooks = useDebounce(value => {
    fetchBooks({search: value})
  }, 1000)

  const debounceFetchBorrowers = useDebounce(value => {
    fetchBorrowers({search: value})
  }, 1000)

  const handleChangeFindBook = (e) => {
    setFindBook(e.target.value);
  }

  const handleChangeRemoveBook = () => {
    setValue("bookId", null)
  }

  const handleChangePickBook = ({id, title}) => {
    setIsBookSelectHidden(true);
    setSelectedBookTitle(title)
    setValue("bookId", id)
  }

  const handleChangeFindBorrower = (e) => {
    setFindBorrower(e.target.value)
  }

  const handleChangeRemoveBorrower = () => {
    setValue("memberId", null)
  }

  const handleChangePickBorrower = ({id, name}) => {
    setIsBorrowerSelectHidden(true);
    setSelectedBorrowerName(name)
    setValue("memberId", id)
  }

  React.useEffect(() => {
    if (findBorrower === ''){
      setIsBorrowerSelectHidden(true)
    } else {
      setIsBorrowerSelectHidden(false)
      setIsBookSelectHidden(true)
      debounceFetchBorrowers(findBorrower)
    }

  }, [debounceFetchBorrowers, findBorrower])

  React.useEffect(() => {
    if (findBook === ''){
      setIsBookSelectHidden(true)
    } else {
      debounceFetchBooks(findBook);
      setIsBookSelectHidden(false)
    }
    setIsBorrowerSelectHidden(true)
  }, [findBook, debounceFetchBooks])

  const onSubmit = data => {
    saveBorrowing(data)
  }

  const handleCloseModal = () => {
    closeModal();
  }

  return (
    <>
      <div
        className="
          justify-center items-center flex 
          overflow-x-hidden overflow-y-auto 
          fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-8 mx-auto max-w-3xl">
          {/*content*/}
          <div className="
            border-0 rounded-lg shadow-lg 
            relative flex flex-col w-full 
            bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-1xl font-semibold">Peminjaman</h3>
              <button onClick={handleCloseModal} >
                <span className="text-black "> × </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative w-96 p-6 flex-auto">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label id="listbox-label" className="
                      z-0 mt-1 focus:ring-indigo-500 
                      focus:border-indigo-500 block 
                      w-full shadow-sm sm:text-sm 
                      border-gray-300 reunded-md">
                      Peminjam
                    </label>
                    <input type="hidden" name="memberId" ref={register({ required: true})} />
                    { !watchBorrower 
                      ? <div className="mt-1 flex rounded-md shadow-sm">
                         <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          </span>
                          <input 
                            type="text" 
                            name="selectBorrower" 
                            autoComplete="off" 
                            onChange={handleChangeFindBorrower} 
                            className={`
                              focus:ring-red-500 
                              focus:border-red-500 
                              flex-1 block w-full 
                              rounded-none rounded-r-md 
                              sm:text-sm
                              ${errors.memberId 
                                ? "focus:ring-red-500 focus:border-red-500 border-red-300" 
                                : "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                              }
                            `}
                            placeholder="Cari peminjam berdasarkan nama"
                            />
                        </div>
                      : <div 
                          onClick={handleChangeRemoveBorrower}
                          aria-haspopup="listbox" 
                          aria-expanded="true" 
                          aria-labelledby="listbox-label" 
                          className="
                            relative w-full bg-white 
                            border border-gray-300 
                            rounded-md shadow-sm 
                            pl-3 pr-10 py-2 text-left 
                            cursor-default focus:outline-none 
                            focus:ring-1 focus:ring-indigo-500 
                            focus:border-indigo-500 sm:text-sm">
                          <span className="flex items-center">
                            <span className="">
                              { selectedBorrowerName}
                            </span>
                          </span>
                          <div 
                            className="
                              ml-3 bg-yellow-300 pl-2 rounded absolute inset-y-0 right-0 
                              flex items-center pr-2 pointer-events-none">
                            ganti
                          </div>
                        </div>
                    }
                    {errors.memberId && (<p className="text-xs text-red-500">Peminjam belum dipilih.</p>)}
                    { !isBorrowerSelectHidden && <SelectBorrower 
                      borrowers={borrowers} 
                      handleChangePickBorrower={handleChangePickBorrower} 
                      selectedBorrowerId={selectedBorrowerId} />  }

                  </div>

                  <div>
                    <label id="listbox-label" className="z-0 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      Buku
                    </label>
                    <input type="hidden" name="bookId" ref={register({ required: true})}
                    />
                    { !watchBook 
                      ? <div className="mt-1 flex rounded-md shadow-sm">
                         <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          </span>
                          <input 
                            type="text" 
                            name="selectBook" 
                            autoComplete="off" 
                            onChange={handleChangeFindBook} 
                            value={findBook}
                            className={`
                              focus:ring-red-500 
                              focus:border-red-500 
                              flex-1 block w-full 
                              rounded-none rounded-r-md 
                              sm:text-sm
                              ${errors.bookId 
                                ? "focus:ring-red-500 focus:border-red-500 border-red-300" 
                                : "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                              }
                            `}
                            placeholder="Cari buku berdasarkan judul atau penulis."
                            />
                        </div>
                      : <div 
                          onClick={handleChangeRemoveBook}
                          aria-haspopup="listbox" 
                          aria-expanded="true" 
                          aria-labelledby="listbox-label" 
                          className="
                            relative w-full bg-white 
                            border border-gray-300 
                            rounded-md shadow-sm 
                            pl-3 pr-10 py-2 text-left 
                            cursor-default focus:outline-none 
                            focus:ring-1 focus:ring-indigo-500 
                            focus:border-indigo-500 sm:text-sm">
                          <span className="flex items-center">
                            <span className="">
                              { selectedBookTitle}
                            </span>
                          </span>
                          <div 
                            className="
                              ml-3 bg-yellow-300 pl-2 rounded absolute inset-y-0 right-0 
                              flex items-center pr-2 pointer-events-none">
                            ganti
                          </div>
                        </div>
                    }
                    {errors.bookId && (<p className="text-xs text-red-500">Buku belum dipilih.</p>)}

                    { !isBookSelectHidden && <SelectBook 
                      books={books} 
                      handleChangePickBook={handleChangePickBook} 
                      selectedBookId={selectedBookId} />  }

                  </div>

                  
                  <div>
                    <label id="listbox-label" className="z-0 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      Tanggal pinjam
                    </label>
                    <input 
                      type="date" 
                      ref={register({ required: true})} 
                      name="borrowDate" 
                      className={
                        `mt-1 block w-full shadow-sm sm:text-sm 
                          ${errors.borrowDate 
                            ? "focus:ring-red-500 focus:border-red-500 rounded-md border-red-300" 
                            : "focus:ring-indigo-500 focus:border-indigo-500 rounded-md border-gray-300"
                          }`
                      }/>
                    {errors.borrowDate && (<p className="text-xs text-red-500">Tanggal Pinjam wajib diisi</p>)}
                  </div>
                  <div className="flex items-center justify-end p-6 rounded-b z-0">
                    <button
                      className="
                        text-red-500 background-transparent 
                        font-bold uppercase px-6 py-2 text-sm 
                        outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={handleCloseModal}
                    >
                      Tutup
                    </button>
                    <input
                      className={
                        `inline-flex justify-center py-2 px-4 
                        border border-transparent shadow-sm 
                        text-sm font-medium rounded-md text-white 
                        focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-indigo-500
                        bg-indigo-600
                        `}
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                      value='Simpan'
                    />
                  </div>
                 
                </form>
              </div>
            </div>
          {/*footer*/}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    books: state.booksReducer.books,
    borrowers: state.membersReducer.members,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBooks: (params = {}) => {
      dispatch(fetchBooksRequest(params));
    },
    fetchBorrowers: (params = {}) => {
      dispatch(fetchMembersRequest(params))
    },
    saveBorrowing: (body) => {
      dispatch(saveBorrowingsRequest(body))
    },
    closeModal: () => {
      dispatch(modalBorrowingsClose())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BorrowingModal);