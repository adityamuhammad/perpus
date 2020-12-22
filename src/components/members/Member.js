import React from 'react';
import { connect } from 'react-redux';
import { confirmDeleteMembersOpen, fetchMembersRequest, modalMembersOpen } from '../../redux/members/membersAction';
import MemberModal from './_MemberModal';
import MemberConfirmDelete from './_MemberConfirmDelete';

function Member({memberReducer, fetchMembers, showModalAdd, showModalEdit, showConfirmDelete}){
  React.useEffect(() => {
    fetchMembers();
  }, [fetchMembers])

  const handleClickAddMember = () => {
    showModalAdd();
  }

  const handleClickEditMember = (id) => {
    showModalEdit(id);
  }

  const handleClickDeleteMember = (id) => {
    showConfirmDelete(id)
  }
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="h-96">
        <button
          className="
            inline-flex justify-center 
            py-2 px-8 border border-transparent 
            shadow-sm text-sm font-medium 
            rounded-md text-white bg-indigo-600 
            hover:bg-indigo-700 focus:outline-none 
            focus:ring-2 focus:ring-offset-2 
            focus:ring-indigo-500"
          type="button"
          style={{ transition: "all .15s ease" }}
          onClick={handleClickAddMember}
        >
        Tambah Anggota
        </button>
        { memberReducer.modalOpen && <MemberModal/> }
        { memberReducer.confirmDeleteOpen && <MemberConfirmDelete/>}
        {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div 
              className="
                py-6 align-middle inline-block 
                min-w-full sm:px-6 lg:px-8">
              <div 
                className="
                  shadow overflow-hidden border-b 
                  border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th 
                        scope="col" 
                        className="
                          px-6 py-3 text-left text-xs 
                          font-medium text-gray-500 
                          uppercase tracking-wider">
                        Nama
                      </th>
                      <th 
                        scope="col" 
                        className="
                          px-6 py-3 text-left text-xs 
                          font-medium text-gray-500 
                          uppercase tracking-wider">
                        Alamat
                      </th>
                      <th 
                        scope="col" 
                        className="
                          px-6 py-3 text-left text-xs 
                          font-medium text-gray-500 
                          uppercase tracking-wider">
                        Nomor Telepon
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    { memberReducer.loading 
                      ? (<tr><td colSpan="4" className="py-1 col-span-5 text-center">Loading..</td></tr>) 
                      : memberReducer.error
                        ? (<tr><td colSpan="4" className="py-1 text-center">{memberReducer.error}</td></tr>)
                        : memberReducer.members.length
                          ? memberReducer.members.map(member => {
                            return (
                              <tr key={member.id} className="hover:bg-gray-100">
                                <td className="px-6 py-1 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {member.name}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-1 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{member.address}</div>
                                </td>
                                <td className="px-6 py-1 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{member.phoneNumber}</div>
                                </td>
                                <td 
                                  className="
                                    px-6 py-1 whitespace-nowrap 
                                    text-right text-sm font-medium">
                                  <div className="inline-flex px-1">
                                    <button 
                                      onClick={() => handleClickEditMember(member.id)} 
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
                                    onClick={() => handleClickDeleteMember(member.id)} 
                                    className="
                                      inline-flex justify-center py-1 
                                      px-4 border border-red shadow-sm 
                                      text-sm font-medium rounded-md 
                                      text-red-500 bg-white focus:outline-none 
                                      focus:ring-2 focus:ring-offset-2 
                                      focus:ring-red-500">Hapus</button>
                                  </div>
                                </td>
                              </tr>
                            )
                          })
                          : (<tr><td colSpan="4" className="py-1 text-center">Data is empty.</td></tr>)
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
    memberReducer: state.membersReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMembers: (params= {}) => {
      dispatch(fetchMembersRequest(params));
    },
    showModalAdd: () => {
      dispatch(modalMembersOpen({modalType: 'new', modalFetchId: null}));
    },
    showModalEdit: (id) => {
      dispatch(modalMembersOpen({modalType: 'edit', modalFetchId: id}));
    },
    showConfirmDelete: (id) => {
      dispatch(confirmDeleteMembersOpen(id));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Member);