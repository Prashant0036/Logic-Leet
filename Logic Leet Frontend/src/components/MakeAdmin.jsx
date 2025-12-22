import { useState } from 'react';
import { User } from 'lucide-react';
import axiosClient from '../utils/axiosClient';

function MakeAdmin() {
  const [emailId, setEmailId] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleMakeAdmin = async () => {
    if (!emailId.trim()) {
      return alert('Please enter user email');
    }

    try {
      setLoading(true);

      const res = await axiosClient.patch(
        `/user/makeAdmin/${emailId}`
      );

      setAdminName(res.data.user.firstName);
      setShowModal(true);
      setEmailId('');
    } 
    catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="flex flex-col items-center card-body space-y-6">

          {/* TITLE */}
          <h2 className="text-3xl font-bold text-center">
            Appoint Admin
          </h2>

           {/* ICON */}
              <User
                size={100}
                // className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/60"
              />

          {/* INPUT */}
          <div className="form-control  flex gap-2 w-[95%]">
            <label className="label pb-1 ">
              <span className="label-text text-sm font-medium">
                User Email :
              </span>
            </label>

           
             

              <input
                type="email"
                placeholder="Enter user email"
                className="input input-bordered w-full "
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
           
          </div>

          {/* BUTTON */}
          <button
            className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
            onClick={handleMakeAdmin}
            disabled={loading}
          >
            Make Admin
          </button>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {/* For Pop Up */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-success">
              Success 🎉
            </h3>
            <p className="py-4">
              Now <span className="font-semibold">{adminName}</span> is also a admin.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-success"
                onClick={() => setShowModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default MakeAdmin;
